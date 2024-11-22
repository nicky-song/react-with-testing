/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { View, FormControl, TextArea, Text } from '@az/starc-ui';
import { orderDetailsAtom } from '@ofm/atoms/orderDetails/orderDetailsAtom';
import { OrderStatus, DAYS, OrderType } from '@ofm/constants/constants';
import { EmptySchema, ReasonSchema } from '@ofm/schemas/confirmationModalSchema';
import { useCreateBillOrderProcesses } from '@ofm/services/hooks/useCreateBillOrderProcesses';
import { useCreateCreditOrder } from '@ofm/services/hooks/useCreateCreditOrder';
import { useCreateReplenishmentOrderProcesses } from '@ofm/services/hooks/useCreateReplenishmentOrderProcesses';
import { useDeleteOrder } from '@ofm/services/hooks/useDeleteOrder';
import { useDeleteOrderProducts } from '@ofm/services/hooks/useDeleteOrderItems';
import { useVerifyOrder } from '@ofm/services/hooks/useVerifyOrder';
import { ReasonType, DrawerArrayType } from '@ofm/types/types';
import {
  triggerEmail,
  generateDateString,
  getOrderDeleteModalTitle,
  getOrderDeleteModalDescription,
  getOrderDeleteModalButtonText,
  getFormInputError,
  isButtonDisabled,
} from '@ofm/utils/utils';
import { ConfirmationCommentModal } from '@shared/components/ConfirmationCommentModal/ConfirmationCommentModal';
import { CreditOrderModal } from '@ofm/components/CreditOrderModal/CreditOrderModal';
import { CreditOrderType } from '@ofm/components/CreditOrderTable/CreditOrderTable.types';
import { TextAreaCounter } from '@shared/components/TextAreaCounter/TextAreaCounter';
import { NOTIFICATION_TYPES, PAGE_SIZE } from '@shared/constants/constants';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import {
  OrderDetailsDrawerModalProps,
  OrderDetailsDrawerModalPropsVariant,
  ModalActions,
} from './OrderDetailsDrawer.types';
import { FormLabel } from '@shared/components/FormLabel/FormLabel';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';

type ModalData = {
  title: string;
  description: string;
  label: string;
  hasTextArea: boolean;
  placeholder: string;
  actionText: string;
  cancelText: string;
  hideCancel: boolean;
} | null;

type DataType = ReasonType | z.infer<typeof EmptySchema> | DrawerArrayType;

export const OrderDetailsDrawerModal = ({
  order,
  orders,
  action,
  requestManyAction,
  handleClose,
  selectedRows,
  waveDueDate,
  flaggedItems,
  refetchOnSucess,
}: OrderDetailsDrawerModalProps | OrderDetailsDrawerModalPropsVariant) => {
  const { t } = useTranslation();

  /* Atoms */
  const [, setOrderDetail] = useAtom(orderDetailsAtom);

  /* State variables */
  const [data, setData] = useState<ModalData>(null);

  /* Constants */
  const { handleNotification } = useNotificationHandler();

  /* Queries */
  const { mutateCreateReplenishmentOrder } = useCreateReplenishmentOrderProcesses();
  const { mutateCreateBillOrder } = useCreateBillOrderProcesses();
  const { mutateVerifyOrder } = useVerifyOrder();
  const { mutateDeleteOrder } = useDeleteOrder();
  const { mutateDeleteOrderProducts } = useDeleteOrderProducts();
  const { mutateCreateCreditOrder } = useCreateCreditOrder();

  /* Functions */
  const isEmptySchema = useCallback(() => {
    if (action === ModalActions.DELETE || action === ModalActions.DELETE_ALL) {
      if (
        order?.status === OrderStatus.SENT_TO_OUTBOUND ||
        order?.status === OrderStatus.ERROR ||
        order?.status === OrderStatus.CANCELLED
      ) {
        return true;
      }
    }
    return false;
  }, [action, order]);

  const isEmptyMemo = useMemo(() => isEmptySchema(), [isEmptySchema]);

  /**
   * Based on the order modal's data, trigger the respective action. Notice that in case
   * we have a credit order, the modal action will be unique.
   */
  const triggerAction = useCallback(
    (data: DataType) => {
      const parsedData = ReasonSchema.safeParse(data);
      const reasonMessage = parsedData.success ? parsedData.data.reason : '';
      const creditOrderData = z.custom<CreditOrderType[]>().safeParse(data);

      if (orders?.length) {
        requestManyAction(reasonMessage);
      }

      switch (action) {
        case ModalActions.REQUEST: {
          order &&
            mutateCreateReplenishmentOrder({
              stores: [order.storeNumber],
              waveId: order.wave,
            });
          break;
        }
        case ModalActions.REQUEST_AHEAD: {
          order &&
            mutateCreateReplenishmentOrder({
              stores: [order.storeNumber],
              comment: {
                message: reasonMessage,
              },
              waveId: order.wave,
            });
          break;
        }
        case ModalActions.DELETE:
          !isEmptyMemo &&
            order?.id &&
            mutateDeleteOrder({ orderId: order.id, message: reasonMessage });
          break;
        case ModalActions.DELETE_ALL:
          !isEmptyMemo &&
            order?.id &&
            selectedRows &&
            mutateDeleteOrderProducts(
              {
                orderId: order.id,
                message: reasonMessage,
                productIds: selectedRows.map((product) => product.id),
              },
              {
                onSuccess: () => {
                  refetchOnSucess ? refetchOnSucess() : '';
                },
              }
            );
          break;
        case ModalActions.BILL: {
          order?.id && mutateCreateBillOrder([order.id]);
          break;
        }
        case ModalActions.EMAIL: {
          const subject = t('OrderDetails.ContactSSCForReview', {
            storeId: order?.storeNumber,
          });
          // TODO: Change this email to the final one, provided by the client
          triggerEmail('example@autozone.com', subject);
          break;
        }
        case ModalActions.CREDIT:
          if (order && creditOrderData.success) {
            mutateCreateCreditOrder(
              {
                orderId: order.id,
                creditOrderRequest: {
                  items: creditOrderData.data.map((data) => ({
                    itemId: data.id,
                    packsQuantity: data.packReceivedCurrent,
                    quantityReceived: data.quantityReceivedCurrent,
                  })),
                },
              },
              {
                onSuccess: (data) => {
                  if (data) {
                    handleNotification(
                      NOTIFICATION_TYPES.SUCCESS,
                      t('Success.Action.Credit.Credited', {
                        count: creditOrderData.data.length,
                      }),
                      undefined,
                      'button',
                      t('Success.Action.Credit.SeeInvoice'),
                      () => {
                        setOrderDetail({ orderType: OrderType.CREDITED, orderId: data });
                      }
                    );
                  }
                },
              }
            );
          }
          break;
        case ModalActions.VERIFY:
          if (flaggedItems.filter((item) => item.hasError).length > 0) {
            const id = flaggedItems.filter((item) => item.hasError).at(0)?.id;
            (
              document.querySelector(`[id="quantitystepper-${id}-error"]`) as
                | HTMLInputElement
                | undefined
            )?.focus();
          } else {
            order?.id &&
              mutateVerifyOrder({
                orderId: order.id,
                verifiedProducts: flaggedItems.map((item) => ({
                  id: item.id,
                  quantity: item.quantity,
                })),
              });
          }
          break;
      }
      handleClose();
    },
    [
      action,
      order,
      handleClose,
      isEmptyMemo,
      mutateCreateBillOrder,
      mutateCreateReplenishmentOrder,
      mutateVerifyOrder,
      mutateDeleteOrder,
      setOrderDetail,
      mutateCreateCreditOrder,
      mutateDeleteOrderProducts,
      handleNotification,
      selectedRows,
      orders?.length,
      flaggedItems,
      requestManyAction,
      t,
      refetchOnSucess,
    ]
  );

  /* Hooks */
  // Sets the necessary order information inside the modal
  useEffect(() => {
    const getModalData = (): ModalData => {
      const today = dayjs(new Date());

      if (orders?.length && action === ModalActions.REQUEST_MANY && waveDueDate) {
        const requestByDate = waveDueDate;
        const formattedRequestByDate = dayjs(requestByDate);
        return {
          title: t('ConfirmationComment.RequestTitle'),
          description: t('ConfirmationComment.RequestManyDate', {
            day: generateDateString(requestByDate, t('DateFormat.WeekdayLongTextWithTime')),
            time: generateDateString(requestByDate, t('DateFormat.Time12HourMinutes')),
            dayCount: formattedRequestByDate.diff(today, DAYS),
          }),
          label: t('ConfirmationComment.ReasonRequest'),
          hasTextArea: true,
          placeholder: t('ConfirmationComment.Placeholder'),
          actionText: t('RequestStores', { count: orders.length }),
          cancelText: t('ConfirmationComment.Cancel'),
          hideCancel: false,
        };
      }

      if (!order) {
        return null;
      }

      const dueDate = dayjs(order.dueDate);
      const items = selectedRows ? selectedRows.length : 1;
      const canDelete = !isEmptyMemo;

      switch (action) {
        case ModalActions.REQUEST_AHEAD:
          return {
            title: t('ConfirmationComment.RequestTitle'),
            description: t('ConfirmationComment.RequestDate', {
              day: generateDateString(order.dueDate, t('DateFormat.WeekdayLongTextWithTime')),
              dayCount: today.diff(dueDate, DAYS),
            }),
            label: t('ConfirmationComment.ReasonRequest'),
            hasTextArea: true,
            placeholder: t('ConfirmationComment.Placeholder'),
            actionText: t('ConfirmationComment.Request'),
            cancelText: t('ConfirmationComment.Cancel'),
            hideCancel: false,
          };
        case ModalActions.DELETE:
        case ModalActions.DELETE_ALL:
          return {
            title: getOrderDeleteModalTitle(order?.status, items, action),
            description: getOrderDeleteModalDescription(order?.status, action),
            label: t('ConfirmationComment.DeleteReason'),
            hasTextArea: canDelete,
            placeholder: t('ConfirmationComment.Placeholder'),
            actionText: getOrderDeleteModalButtonText(order?.status, items, action),
            cancelText: t('ConfirmationComment.Cancel'),
            hideCancel: !canDelete,
          };
        case ModalActions.BILL:
        case ModalActions.EMAIL:
        case ModalActions.VERIFY:
        case ModalActions.REQUEST:
          triggerAction({});
          break;
      }

      return null;
    };

    setData(getModalData());
  }, [
    action,
    order,
    orders,
    waveDueDate,
    t,
    selectedRows,
    triggerAction,
    handleClose,
    isEmptyMemo,
  ]);

  const formatRows = (rows: OrderDetailsDrawerModalProps['selectedRows']) => {
    return rows?.map((row, index) => ({
      id: index.toString(),
      sku: row?.sku,
      partNumber: row.partNumber,
      description: row.description,
      pack: row.pack,
      packReceivedCurrent: 0,
      packReceivedMax: row.quantity / row.pack,
      quantityReceivedCurrent: 0,
      quantityReceivedMax: row.pack * (row.quantity / row.pack),
    }));
  };

  return action !== ModalActions.CREDIT ? (
    <ConfirmationCommentModal
      isOpen={!!action}
      schema={isEmptyMemo ? EmptySchema : ReasonSchema}
      onClose={handleClose}
      onAction={(data) => triggerAction(data as DataType)}
    >
      {({ register, formState: { errors }, watch, errorClassName }) => (
        <>
          <ConfirmationCommentModal.Header>
            <Text as="h2" size="175" weight="bold" color="primary">
              {data?.title}
            </Text>
            {data?.description && (
              <View padding={[order?.status !== OrderStatus.READY_TO_BILL ? 2 : 0, 0, 0, 0]}>
                <Text>{data?.description}</Text>
              </View>
            )}
          </ConfirmationCommentModal.Header>
          {data?.hasTextArea && (
            <ConfirmationCommentModal.Body>
              <View padding={[6, 0, 0, 0]}>
                <FormLabel text={data?.label} isRequired />
              </View>
              <View textAlign="end">
                <FormControl hasError={errors.reason}>
                  <TextArea
                    variant="alt"
                    resize="vertical"
                    id="order-reason"
                    label={data.placeholder}
                    defaultValue=""
                    inputAttributes={register('reason')}
                  />
                  <View direction="row" justify={errors.reason ? 'space-between' : 'end'}>
                    <FormControl.Error className={errorClassName}>
                      {getFormInputError(errors.reason?.type)}
                    </FormControl.Error>
                    <TextAreaCounter count={watch('reason')?.length} />
                  </View>
                </FormControl>
              </View>
            </ConfirmationCommentModal.Body>
          )}
          <ConfirmationCommentModal.Actions
            cancelText={data?.cancelText}
            actionText={data?.actionText || ''}
            hideCancel={data?.hideCancel}
            disabled={isButtonDisabled(watch('reason'))}
          />
        </>
      )}
    </ConfirmationCommentModal>
  ) : (
    <CreditOrderModal
      isOpen={!!action}
      onClose={handleClose}
      creditOrders={formatRows(selectedRows) || []}
      pageSize={PAGE_SIZE}
      onCreditItems={triggerAction}
    />
  );
};
