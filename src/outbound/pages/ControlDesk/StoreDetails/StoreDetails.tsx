/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, IconError, Link, Text, View, useDebounce } from '@az/starc-ui';
import { useInternationalDC } from '@shared/hooks/useInternationalDC';
import { useGetStoreById } from '@ofm/services/hooks/useGetStoreById';
import {
  addPadding,
  formatTableOrderType,
  splitBySeparator,
  statusToBadgeVariant,
} from '@ofm/utils/utils';
import { mapStoreDetailsTableRows } from '@ofm/utils/table/tableUtils';
import { useCreateStoreActivity } from '@ofm/services/hooks/useCreateStoreActivity';
import { ActivityType, OrderDetailsType, ScheduleItem, StoreDetailsType } from '@ofm/types/types';
import { useAtom } from 'jotai';
import s from './StoreDetails.module.scss';
import dayjs from 'dayjs';
import { orderDetailsAtom } from '@ofm/atoms/orderDetails/orderDetailsAtom';
import { warehouseAtom } from '@ofm/atoms/warehouse/warehouseAtom';
import { ScheduleSection } from '@ofm/components/ScheduleSection/ScheduleSection';
import { ScheduleWeek, ScheduleDay } from '@ofm/components/ScheduleSection/ScheduleSection.types';
import { StoreStatus, OrderStatus, OrderErrorStatus, OrderType } from '@ofm/constants/constants';
import { WEEK_DAYS_MAP } from '@ofm/constants/dataConstants';
import { CommentCardProps } from '@shared/components/CommentCard/CommentCard';
import { Comments } from '@shared/components/Comments/Comments';
import { DetailsSection } from '@shared/components/DetailsSection/DetailsSection';
import { DetailRow } from '@shared/components/DetailsSection/DetailsSection.types';
import { MasterTitle } from '@shared/components/MasterTitle/MasterTitle';
import { SearchInput } from '@shared/components/SearchInput/SearchInput';
import { Stat } from '@shared/components/Stat/Stat';
import { SortRowsParam } from '@shared/components/Table/Table.types';
import {
  STORE_DETAILS_TABLE_COLUMNS,
  TableStylingVariants,
} from '@shared/components/Table/tableConstants';
import {
  DEBOUNCE_TIMER,
  PAGE_SIZE,
  DEFAULT_PAGE,
  PAGE_ERRORS,
  ID_PADDINGS,
  NOTIFICATION_TYPES,
} from '@shared/constants/constants';
import { Table } from '@shared/components/Table/Table';
import { useGetOrderHistory } from '@ofm/services/hooks/useGetOrderHistory';
import { usePageErrorHandler } from '@shared/hooks/usePageErrorHandler';
import { EmptyPage } from '@shared/components/EmptyPage/EmptyPage';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { useTranslation } from 'react-i18next';
import { OrderDetailsDrawer } from '@outbound/components/OrderDetailsDrawer/OrderDetailsDrawer';
import { PAGE_URLS, ROUTES } from '@shared/constants/routes';

export const StoreDetails = () => {
  /* Atoms */
  const [, setOrderDetails] = useAtom(orderDetailsAtom);
  const [warehouse] = useAtom(warehouseAtom);

  /* State variables */
  const [invoiceId, setInvoiceId] = useState<string>('');
  const [, setOnHoldEndDate] = useState<string | null>('');
  const [enableOrderRequest, setEnableOrderRequest] = useState<boolean>(true);
  const [isOnHold, setIsOnHold] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentCardProps[]>([]);
  const [orderList, setOrderList] = useState<OrderDetailsType[]>([]);
  const [storeData, setStoreData] = useState<StoreDetailsType>();
  const [showOrderDetailsDrawer, setShowOrderDetailsDrawer] = useState<boolean>(false);

  /* Constants */
  const { t } = useTranslation();
  const navigate = useNavigate();
  const debouncedValue = useDebounce(invoiceId, DEBOUNCE_TIMER);
  const { storeId, orderId, orderType } = useParams();
  const { isInternational, key } = useInternationalDC({ warehouse });
  /* Queries */
  const {
    storeData: store,
    isLoading: isStoreLoading,
    isError: isStoreError,
  } = useGetStoreById(storeId || '', !!storeId);

  // This constant is used to control the order history endpoint calls based on the debounced value
  const shouldEnableOrderRequest = !!storeId && enableOrderRequest;

  const {
    orderHistoryData,
    isError: isOrderHistoryError,
    refetch,
  } = useGetOrderHistory(
    {
      warehouseId: warehouse.id,
      storeId: storeId || '',
      searchTerms: debouncedValue,
    },
    shouldEnableOrderRequest
  );

  const { mutateCreateStoreActivity } = useCreateStoreActivity();
  const { handleNotification } = useNotificationHandler();

  /* Functions */
  const getStoreInformation = (storeData: StoreDetailsType): DetailRow[] => {
    return [
      { label: t('DetailsSection.Warehouse'), text: storeData.primaryDc },
      { label: t('DetailsSection.Heading'), text: t('DetailsSection.Credited') },
      {
        label: t('DetailsSection.StoreNumber'),
        text: addPadding(storeData.storeId, ID_PADDINGS.STORE),
      },
      { label: t('DetailsSection.StoreType'), text: storeData.storeType },
      { label: t('DetailsSection.ShipCD'), text: '02' },
      { label: t('DetailsSection.CustomerNumber'), text: storeData.customerNumber },
      { label: t('DetailsSection.PhoneNumber'), text: storeData.phoneNumber },
      {
        label: t('DetailsSection.Address'),
        text: splitBySeparator(
          `${storeData.addressLine1}\n${storeData.addressLine2}\n${storeData.city}, ${storeData.state} ${storeData.postalCode}`,
          '\n'
        ),
      },
    ];
  };

  const getWeekSchedule = (schedule: ScheduleItem[]) => {
    const scheduleWeek: ScheduleWeek = {};

    schedule.forEach((weekDay) => {
      const dayOfWeek = WEEK_DAYS_MAP[weekDay.day];

      if (dayOfWeek) {
        const scheduleDay: ScheduleDay = {
          time: dayjs(weekDay.time).toDate(),
          wave: weekDay.wave,
        };
        scheduleWeek[dayOfWeek] = scheduleDay;
      }
    });

    return scheduleWeek;
  };

  const addActivityComment = (newComment: CommentCardProps) => {
    if (storeData) {
      mutateCreateStoreActivity({
        storeId: storeData.storeId,
        activity: {
          message: newComment.comment,
        },
      });
    }
  };

  const onSearchClear = () => {
    setInvoiceId('');
  };

  const handleTableRowClick = (clickedRow: SortRowsParam) => {
    const order = orderList.find((order) => order.id === clickedRow.id);
    if (order?.status == OrderStatus.NOT_STARTED || order?.status == OrderStatus.SENT_TO_OUTBOUND) {
      setOrderDetails({ orderId: order.id, orderType: order.type });
      setShowOrderDetailsDrawer(true);
      navigate(
        `${PAGE_URLS.STORE_ORDER_DETAILS(storeId ? storeId : '0')}/${ROUTES.ORDERS}/${order.id}/${
          order.type
        }`
      );
    }
  };

  const mapAndSetComments = (data: ActivityType[]) => {
    const mappedComments = data.map((item) => ({
      comment: item.message,
      username: `${item.user.toLowerCase()}`,
      timestamp: dayjs(item.activityDate).toDate(),
    }));
    setComments(mappedComments);
  };

  /* Hooks */
  const { errorMessage } = usePageErrorHandler([{ name: PAGE_ERRORS.STORE, value: isStoreError }]);

  // Sets the store data when retrieving by store id
  useEffect(() => {
    if (store) {
      setStoreData(store);

      if (store?.status === StoreStatus.ON_HOLD) {
        setIsOnHold(true);
        setOnHoldEndDate(store.onHoldEndDate);

        // In case the on hold date is today, show snack notification
        if (dayjs(store.onHoldEndDate).startOf('day').isSame(dayjs().startOf('day'))) {
          handleNotification(
            NOTIFICATION_TYPES.SNACK,
            t('StoreStatusTitle'),
            t('StoreStatusDescription')
          );
        }
      }

      if (store?.activity) {
        mapAndSetComments(store.activity);
      }
    }
  }, [store, handleNotification, t]);

  // Triggers when the on hold status changes
  useEffect(() => {
    if (storeData) {
      setOnHoldEndDate(storeData?.onHoldEndDate);
      if (storeData?.activity) mapAndSetComments(storeData.activity);
    }
  }, [storeData]);

  useEffect(() => {
    if (orderHistoryData) {
      setOrderList(orderHistoryData.results);
      // Once the component renders, disable the useQuery hook so the debounce works as intended
      setEnableOrderRequest(false);
    }
  }, [orderHistoryData]);
  // Calls the refetch in case the search input has a valid value
  useEffect(() => {
    if (debouncedValue !== undefined && !isOrderHistoryError) {
      refetch();
    }
  }, [debouncedValue, isOrderHistoryError, refetch]);

  useEffect(() => {
    if (orderId && orderType) {
      setOrderDetails({
        orderId: orderId.toString(),
        orderType: OrderType[orderType as keyof typeof OrderType],
      });
      setShowOrderDetailsDrawer(true);
    } else {
      setShowOrderDetailsDrawer(false);
    }
  }, [orderId, orderType, setOrderDetails]);

  if (isStoreLoading) {
    return null;
  } else if (isStoreError) {
    return (
      <EmptyPage
        title={t('Errors.Page.Title')}
        description={t('Errors.Page.Description', {
          service: errorMessage,
        })}
        buttonText={t('Errors.Page.ButtonText')}
        onClick={() => navigate(0)}
        icon={IconError}
      />
    );
  } else if (storeData) {
    return (
      <View height="100%" className={s['store-details__container']}>
        <MasterTitle
          title={t('DetailsSection.StoreName', {
            store: addPadding(storeData.storeId, ID_PADDINGS.STORE),
          })}
          subtitle={
            <Link variant="underline">
              <Text fontFamily="body" size="087" weight="medium" color="500">
                {t('MasterTitle.ViewControlDesk')}
              </Text>
            </Link>
          }
          titleClassName={s['store-details__master-title__subtitle ']}
        >
          <View direction="row" justify="end" align="center">
            <Button variant="secondary" attributes={{ style: { width: 'fit-content' } }}>
              <Text>{t('DetailsSection.PutStoreOnHold')}</Text>
            </Button>
          </View>
        </MasterTitle>

        <View direction="row" className={s['store-details__details-container']}>
          <View.Item columns={{ l: 4, xl: 3 }} className={s['store-details__information']}>
            <View className={s['store-details__details']}>
              <DetailsSection
                header={t('DetailsSection.StoreHeader')}
                rows={getStoreInformation(storeData)}
              />
            </View>
            {storeData?.orderSchedule && (
              <ScheduleSection
                title={t('Schedule.Order')}
                tooltipProps={{
                  bodyText: t('Schedule.Tooltip.OrderBody'),
                  placement: 'right',
                }}
                tooltipClassName={s['store-details__tooltip']}
                schedule={getWeekSchedule(storeData.orderSchedule)}
              />
            )}
            {storeData?.deliverySchedule && (
              <ScheduleSection
                title={t('Schedule.Delivery')}
                tooltipProps={{
                  bodyText: t('Schedule.Tooltip.DeliveryBody'),
                  placement: 'right',
                }}
                tooltipClassName={s['store-details__tooltip']}
                schedule={getWeekSchedule(storeData.deliverySchedule)}
              />
            )}
            <Comments
              isOpen={false}
              comments={comments}
              className={s['store-details__comments']}
              handleCommentSubmit={addActivityComment}
            />
          </View.Item>
          <View.Item grow className={s['store-details__invoice-history']}>
            <View gap={8} padding={6} className={s['store-details__invoice-history-header']}>
              <View direction="row" justify="start" gap={4}>
                <View direction="row" backgroundColor="secondary">
                  {storeData?.averagePieces && (
                    <Stat
                      title={t('DetailsSection.AveragePieces')}
                      primaryText={storeData.averagePieces.toString()}
                      type="default"
                    />
                  )}
                </View>
                <View direction="row" backgroundColor="secondary">
                  {storeData?.averageLinesNumber && (
                    <Stat
                      title={t('DetailsSection.AverageLines')}
                      primaryText={storeData.averageLinesNumber.toString()}
                      type="default"
                    />
                  )}
                </View>
              </View>
            </View>
            <View padding={6} gap={4}>
              <Text weight="bold" color="primary">
                {t('DetailsSection.OrderHistory')}
              </Text>

              <View direction="row">
                <View.Item>
                  <SearchInput
                    label={t('Search.InvoiceNumber')}
                    value={invoiceId}
                    onValueChange={setInvoiceId}
                    onValueClear={onSearchClear}
                    className={s['store-details__search-bar']}
                  />
                </View.Item>
              </View>
            </View>
            <View padding={[2, 6]} className={s['store-details__invoice-history-details']}>
              <Table
                columns={STORE_DETAILS_TABLE_COLUMNS}
                rows={mapStoreDetailsTableRows(
                  orderList.map((order) => {
                    const isOrderActive =
                      order.status !== OrderStatus.CANCELLED &&
                      order.status !== OrderStatus.SENT_TO_OUTBOUND;

                    return {
                      orderId: order.id,
                      invoiceId: order.invoiceNumber ?? '',
                      requestBy: order.dueDate,
                      orderType: formatTableOrderType(order.type),
                      badgeText: formatTableOrderType(
                        isOrderActive && isOnHold ? OrderErrorStatus.ON_HOLD : order.status
                      ),
                      badgeVariant: statusToBadgeVariant(
                        isOrderActive && isOnHold ? OrderErrorStatus.ON_HOLD : order.status
                      ),
                      requestedAt: order.creationDate,
                      billedAt: order.billedDate ?? undefined,
                      lines: order.linesCount,
                      pieces: order.piecesCount,
                      hasComments: order.error.length > 0,
                    };
                  })
                )}
                isPaginated={true}
                isCheckboxDisabled={false}
                pageSize={PAGE_SIZE}
                defaultPage={DEFAULT_PAGE}
                isCreditItem={false}
                isCheckboxTable={false}
                styleVariant={TableStylingVariants.DETAILS}
                totalPages={Math.ceil(orderList.length / PAGE_SIZE)}
                // TODO: implement sorting from the BFF
                onSort={(_sorting) => {
                  return;
                }}
                onRowAction={(clickedRow) => handleTableRowClick(clickedRow)}
              />
              <OrderDetailsDrawer
                drawerProps={{
                  show: showOrderDetailsDrawer,
                  handleClose: () => {
                    setShowOrderDetailsDrawer(false);
                    navigate(PAGE_URLS.STORE_ORDER_DETAILS(storeId ? storeId : '0'));
                  },
                }}
                isInternational={isInternational}
                key={key}
              />
            </View>
          </View.Item>
        </View>
      </View>
    );
  }
};
