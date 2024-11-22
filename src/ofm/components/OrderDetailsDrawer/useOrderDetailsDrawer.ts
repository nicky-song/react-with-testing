/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { orderDetailsAtom } from '@ofm/atoms/orderDetails/orderDetailsAtom';
import { OrderDetailsAtomType } from '@ofm/atoms/orderDetails/orderDetailsAtom.types';
import { OrderType, OrderStatus, OrderErrorStatus } from '@ofm/constants/constants';
import { CreditOrderSchema } from '@ofm/schemas/creditOrderSchema';
import { OrderSchema } from '@ofm/schemas/orderSchema';
import { useGetCreditOrder } from '@ofm/services/hooks/useGetCreditOrder';
import { useGetOrderById } from '@ofm/services/hooks/useGetOrderById';
import { OrderDetailsType, CreditOrderDetailsType } from '@ofm/types/types';
import { handleIsToday, generateDateString, addPadding } from '@ofm/utils/utils';
import { DetailRow } from '@shared/components/DetailsSection/DetailsSection.types';
import { EMPTY_VALUE, ID_PADDINGS } from '@shared/constants/constants';
import { PAGE_URLS, ROUTES } from '@shared/constants/routes';
import { useAtom } from 'jotai';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { OrderProp, ModalActions } from './OrderDetailsDrawer.types';
import {
  Props as StatusBadgeProps,
  StatusVariants,
} from '@shared/components/StatusBadge/StatusBadge.types';
import { Props as StatProps } from '@shared/components/Stat/Stat.types';
import { z } from 'zod';
import dayjs from 'dayjs';

type OrderDetailsDataProps = {
  order: OrderProp;
  cards: Array<StatProps>;
  details: Array<DetailRow> | null;
  delivery: Array<DetailRow> | null;
  statusData: StatusDataProps | null;
} | null;

type StatusDataProps = {
  badge: StatusBadgeProps;
  primaryButtonText?: string;
  primaryButtonAction?: ModalActions;
  isPrimaryButtonDisabled?: boolean;
  secondaryButtonText?: string;
  secondaryButtonAction?: ModalActions;
  isSecondaryButtonDisabled?: boolean;
};

const ORDER_TYPE_LABEL = {
  REPLENISHMENT: 'OrderType.Replenishment',
  OPENING: 'OrderType.Opening',
  BACKUP: 'OrderType.Backup',
  CREDITED: 'OrderType.Credited',
  CROSS_DOCK: 'OrderType.CrossDock',
  WILL_CALL: 'OrderType.WillCall',
};

export const useOrderDetailsDrawer = (
  orderDetails: OrderDetailsAtomType,
  isInternational: boolean,
  hasNoItems?: boolean
) => {
  const { orderId, orderType } = orderDetails;

  /* Atoms */
  const [, setOrderDetails] = useAtom(orderDetailsAtom);

  /* Constants */
  const { t } = useTranslation();
  const CombinedSchema = OrderSchema.or(CreditOrderSchema);

  const navigate = useNavigate();

  /* State variables */
  const [currentOrder, setCurrentOrder] = useState<z.infer<typeof CombinedSchema>>();
  const [orderDetailsData, setOrderDetailsData] = useState<OrderDetailsDataProps>(null);

  /* Queries */
  const {
    orderData: baseOrderData,
    isLoading,
    isError,
  } = useGetOrderById({ orderId, orderType }, !(orderType === OrderType.CREDITED) && !!orderId);

  const {
    creditOrderData,
    isLoading: isCreditLoading,
    isError: isCreditError,
  } = useGetCreditOrder(orderId, orderType === OrderType.CREDITED && !!orderId);

  const orderData = orderType === OrderType.CREDITED ? creditOrderData : baseOrderData;

  /* Functions */
  const getStatsCardsData = useCallback(
    (order: z.infer<typeof CombinedSchema>): Array<StatProps> => {
      const cards: Array<StatProps> = [];

      //This logic will ensure the order or placement of the header cards
      if (order.type === OrderType.CREDITED && 'amountCredited' in order) {
        cards.push({
          title: t('OrderDetails.Stats.AmountCredited'),
          primaryText: `$${order.amountCredited?.toLocaleString(undefined, {
            minimumIntegerDigits: 2,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
        });
      }

      if (order.type === OrderType.REPLENISHMENT) {
        const value =
          order.status === OrderStatus.READY_TO_REQUEST
            ? EMPTY_VALUE
            : addPadding(orderId, ID_PADDINGS.ORDER);
        cards.push({
          title: t('OrderDetails.Stats.RONumber.Title'),
          primaryText: value,
        });
      }

      order.type === OrderType.OPENING &&
        cards.push({
          title: t('OrderDetails.Stats.OpeningOrderNumber'),
          primaryText: addPadding(orderId, ID_PADDINGS.ORDER),
        });

      order.type === OrderType.BACKUP &&
        cards.push({
          title: t('OrderDetails.Stats.BackupOrderNumber'),
          primaryText: addPadding(orderId, ID_PADDINGS.ORDER),
        });

      (order.type === OrderType.REPLENISHMENT ||
        order.type === OrderType.OPENING ||
        order.type === OrderType.BACKUP ||
        order.type === OrderType.CROSS_DOCK ||
        order.type === OrderType.CREDITED) &&
        cards.push({
          title: t('OrderDetails.Stats.InvoiceNumber.Title'),
          primaryText: hasNoItems ? EMPTY_VALUE : order.invoiceNumber || EMPTY_VALUE,
          secondaryTextProps: !order.invoiceNumber
            ? {
                secondaryText: t('OrderDetails.Stats.InvoiceNumber.NotAvailable'),
              }
            : undefined,
        });

      order.type === OrderType.WILL_CALL &&
        order.invoiceNumber &&
        cards.push({
          title: t('OrderDetails.Stats.InvoiceNumber.Title'),
          primaryText: order.invoiceNumber.toString(),
        });

      (order.type === OrderType.REPLENISHMENT ||
        order.type === OrderType.OPENING ||
        order.type === OrderType.BACKUP ||
        order.type === OrderType.CROSS_DOCK ||
        order.type === OrderType.WILL_CALL ||
        order.type === OrderType.CREDITED) &&
        cards.push({
          title: t('OrderDetails.Stats.StoreNumber.Title'),
          primaryText: addPadding(order.storeNumber, ID_PADDINGS.STORE),
          secondaryTextProps: {
            secondaryText: t('OrderDetails.Stats.StoreNumber.LinkText'),
            url: PAGE_URLS.GENERAL_PAGE(
              ROUTES.OUTBOUND,
              ROUTES.ORDER_REQUEST_BILLING,
              ROUTES.STORES,
              order.storeNumber
            ),
          },
        });

      order.type === OrderType.REPLENISHMENT &&
        cards.push({
          title: t(`OrderDetails.Stats.Wave.${isInternational ? 'International' : ''}Title`),
          primaryText: order.waveName || '',
        });

      if (
        (order.type === OrderType.REPLENISHMENT ||
          order.type === OrderType.OPENING ||
          order.type === OrderType.BACKUP ||
          order.type === OrderType.CROSS_DOCK) &&
        order.status !== OrderStatus.SENT_TO_OUTBOUND
      ) {
        const requestedDate = dayjs(order.dueDate).toDate();
        const isToday = handleIsToday(requestedDate);
        const dateFormat = isToday
          ? t('OrderDetails.TodayAt', {
              date: generateDateString(requestedDate, t('DateFormat.TimeHoursMinutes')),
            })
          : generateDateString(requestedDate);
        const value = order.status === OrderStatus.CANCELLED ? EMPTY_VALUE : dateFormat;

        cards.push({
          title: t('OrderDetails.Stats.RequestDate.Title'),
          primaryText: hasNoItems ? EMPTY_VALUE : value,
        });
      }

      order.type === OrderType.WILL_CALL &&
        cards.push({
          title: t('OrderDetails.Stats.DCSource'),
          primaryText: t('OrderDetails.DCSource', { number: order.delivery?.dcSource }),
        });
      return cards;
    },
    [t, orderId, hasNoItems, isInternational]
  );

  const getDetailsSectionData = useCallback(
    (order: OrderDetailsType | CreditOrderDetailsType): Array<DetailRow> => {
      const showDashes = order.status === OrderStatus.READY_TO_REQUEST;
      const details: Array<DetailRow> = [
        {
          label: t('OrderDetails.Type'),
          text: t(ORDER_TYPE_LABEL[order.type as keyof typeof ORDER_TYPE_LABEL]),
        },
      ];

      if (order.type === OrderType.CREDITED && 'originalOrderId' in order) {
        details.push({
          label: t('OrderDetails.OriginalOrder'),
          text: order.originalOrderTitle,
          buttonText: t('OrderDetails.View'),
          onClick: () => {
            setOrderDetails({ orderId: order.originalOrderId, orderType: order.type });
            navigate(
              `${PAGE_URLS.STORE_DETAILS(order.storeNumber ? Number(order.storeNumber) : 0)}/${
                ROUTES.ORDERS
              }/${order.originalOrderId}/${order.type}`
            );
          },
        });
      }

      // TODO: Verify what the Caller Name is and add correct value, currently not contemplated in the BS
      if (order.type === OrderType.WILL_CALL) {
        details.push({
          label: t('WillCallDrawer.CallerName'),
          text: '', // The caller name will be empty for now
        });
      }
      details.push({
        label: t('OrderDetails.Lines'),
        text: showDashes ? EMPTY_VALUE : order.linesCount?.toString(),
      });
      details.push({
        label: t('OrderDetails.Pieces'),
        text: showDashes ? EMPTY_VALUE : order.piecesCount?.toString(),
      });
      return details;
    },
    [navigate, setOrderDetails, t]
  );

  const getDeliverySectionData = useCallback(
    (order: OrderDetailsType | CreditOrderDetailsType): Array<DetailRow> | null => {
      if (order.type === OrderType.WILL_CALL) {
        const arrivesBy = order.delivery?.arrivesBy
          ? t('OrderDetails.DayAtTime', {
              date: generateDateString(order.delivery?.arrivesBy, t('DateFormat.SortedTitle')),
              time: generateDateString(order.delivery?.arrivesBy, t('DateFormat.TimeHoursMinutes')),
            })
          : '';
        return [
          { label: t('OrderDetails.Option'), text: order.delivery?.option || '' },
          { label: t('OrderDetails.ArrivesBy'), text: arrivesBy },
        ];
      }
      return null;
    },
    [t]
  );

  const getBadgeAndButtonsData = useCallback(
    (order: OrderDetailsType | CreditOrderDetailsType): StatusDataProps | null => {
      let statusData: StatusDataProps | null = null;
      const currentDate = dayjs(new Date());
      const dueDate = dayjs(order.dueDate);
      const isAfter = dayjs(dueDate).isAfter(currentDate);

      switch (order.status) {
        case OrderStatus.NOT_STARTED:
          statusData = {
            badge: { variant: StatusVariants.IN_PROGRESS, text: t('OrderStatus.NotStarted') },
            primaryButtonText: t('OrderDetails.RequestOrder'),
            primaryButtonAction: isAfter ? ModalActions.REQUEST_AHEAD : ModalActions.REQUEST,
            isPrimaryButtonDisabled: false,
            secondaryButtonText: t('OrderDetails.DeleteOrder'),
            secondaryButtonAction: ModalActions.DELETE,
            isSecondaryButtonDisabled: false,
          };
          break;
        case OrderStatus.READY_TO_REQUEST:
          statusData = {
            badge: { variant: StatusVariants.IN_PROGRESS, text: t('OrderStatus.ReadyToRequest') },
            primaryButtonText: t('OrderDetails.RequestOrder'),
            primaryButtonAction: isAfter ? ModalActions.REQUEST_AHEAD : ModalActions.REQUEST,
            isPrimaryButtonDisabled: false,
            secondaryButtonText: t('OrderDetails.DeleteOrder'),
            secondaryButtonAction: ModalActions.DELETE,
            isSecondaryButtonDisabled: false,
          };
          break;
        case OrderStatus.READY_TO_BILL:
          statusData = {
            badge: { variant: StatusVariants.IN_PROGRESS, text: t('OrderStatus.ReadyToBill') },
            primaryButtonText: t('OrderDetails.BillOrder'),
            primaryButtonAction: ModalActions.BILL,
            isPrimaryButtonDisabled: false,
            secondaryButtonText: t('OrderDetails.DeleteOrder'),
            secondaryButtonAction: ModalActions.DELETE,
            isSecondaryButtonDisabled: false,
          };
          break;
        case OrderStatus.SENT_TO_OUTBOUND:
        case OrderStatus.SENT_TO_OUTBOUND_UNRELEASED:
          statusData = {
            badge: { variant: StatusVariants.COMPLETED, text: t('OrderStatus.SentToOutbound') },
            secondaryButtonText: t('OrderDetails.DeleteOrder'),
            secondaryButtonAction: ModalActions.DELETE,
            isSecondaryButtonDisabled: false,
          };
          break;
        case OrderStatus.CREDITED:
          statusData = {
            badge: { variant: StatusVariants.COMPLETED, text: t('OrderStatus.Credited') },
          };
          break;
        case OrderStatus.CANCELLED:
          statusData = {
            badge: { variant: StatusVariants.CANCELLED, text: t('OrderStatus.Cancelled') },
          };
          break;
        case OrderStatus.ERROR:
        default: {
          const defaultError = {
            badge: { variant: StatusVariants.CANCELLED, text: t('OrderDetails.Error') },
            primaryButtonText: t('OrderDetails.BillOrder'),
            isPrimaryButtonDisabled: true,
            secondaryButtonText: t('OrderDetails.DeleteOrder'),
            isSecondaryButtonDisabled: true,
          };
          if (order.error && order.error.length > 0) {
            switch (order.error[0].status) {
              case OrderErrorStatus.QUANTITY_ANOMALY: {
                const badgeText =
                  order.type === OrderType.OPENING
                    ? t('OrderDetails.ContactSSC')
                    : t('OrderDetails.VerifyFlaggedOrder');
                const btnAction =
                  order.type === OrderType.OPENING ? ModalActions.EMAIL : ModalActions.VERIFY;
                statusData = {
                  badge: {
                    variant: StatusVariants.IN_PROGRESS,
                    text: t('OrderStatus.QuantityAnomaly'),
                  },
                  primaryButtonText: badgeText,
                  primaryButtonAction: btnAction,
                  isPrimaryButtonDisabled: false,
                  secondaryButtonText: t('OrderDetails.DeleteOrder'),
                  secondaryButtonAction: ModalActions.DELETE,
                  isSecondaryButtonDisabled: false,
                };
                break;
              }
              case OrderErrorStatus.STORE_CONNECT_FAILED:
                statusData = {
                  ...defaultError,
                  badge: { variant: StatusVariants.CANCELLED, text: t('OrderStatus.ErrorStore') },
                };
                break;
              case OrderErrorStatus.CSR_STORE_NOT_CREATED:
                statusData = {
                  ...defaultError,
                  badge: { variant: StatusVariants.CANCELLED, text: t('OrderStatus.ErrorCsr') },
                };
                break;
              case OrderErrorStatus.ON_HOLD:
                statusData = {
                  ...defaultError,
                  badge: {
                    variant: StatusVariants.READY_FOR_ACTION,
                    text: t('OrderStatus.OnHold'),
                  },
                };
                break;
              default:
                break;
            }
          } else {
            statusData = defaultError;
          }
          break;
        }
      }
      return statusData;
    },
    [t]
  );

  /* Hooks */
  /**
   * Sets the current order or credited order. Credited orders are currently not implemented
   * in the BS, so the logic for handling them might change in the future
   */
  useEffect(() => {
    setCurrentOrder(undefined);
    if (orderType === OrderType.CREDITED) {
      if (creditOrderData) {
        setCurrentOrder(creditOrderData);
      }
    } else {
      if (orderData) {
        setCurrentOrder(orderData);
      }
    }
    setOrderDetailsData(null);
  }, [creditOrderData, orderData, orderType, orderId]);

  // Based on all the previous order information, sets the order details data
  useEffect(() => {
    if (currentOrder) {
      const cards = getStatsCardsData(currentOrder); //Stats section
      const details = getDetailsSectionData(currentOrder); //Details section
      const delivery = getDeliverySectionData(currentOrder); //Delivery section
      const statusData = getBadgeAndButtonsData(currentOrder); //Badge and Buttons data section

      !orderDetailsData &&
        setOrderDetailsData({ order: currentOrder, cards, details, delivery, statusData });
    }
  }, [
    orderDetailsData,
    orderId,
    isInternational,
    getStatsCardsData,
    getDetailsSectionData,
    getDeliverySectionData,
    getBadgeAndButtonsData,
    currentOrder,
  ]);

  return orderType === OrderType.CREDITED
    ? { orderDetailsData, isError: isCreditError, isLoading: isCreditLoading }
    : { orderDetailsData, isError, isLoading };
};
