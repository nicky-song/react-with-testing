/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import {
  Button,
  ExclamationCircle,
  Icon,
  Text,
  View,
  IconError,
  useDebounce,
  classNames,
} from '@az/starc-ui';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalActionProp, ModalActions, OrderDetailsDrawerProps } from './OrderDetailsDrawer.types';
import styles from './OrderDetailsDrawer.module.scss';
import { Export } from '@shared/assets/icons';
import dayjs from 'dayjs';
import {
  ORDER_DETAILS_CREDITED_TABLE_COLUMNS,
  // This one is only used when the table has the Quantity Anomaly state. We use different
  // sets of columns because the quantity anomaly table has a stepper that needs more width.
  ORDER_DETAILS_QUANTITY_ANOMALY_TABLE_COLUMNS,
  ORDER_DETAILS_TABLE_COLUMNS,
  TableStylingVariants,
} from '@shared/components/Table/tableConstants';
import { OrderErrorStatus, OrderStatus, OrderType } from '@ofm/constants/constants';
import { useGetOrderProducts } from '@ofm/services/hooks/useGetOrderProducts';
import { useAtom } from 'jotai';
import { warehouseAtom } from '@ofm/atoms/warehouse/warehouseAtom';
import { getCurrentWarehouseFromList, mapOrderDetailsTableRows } from '@ofm/utils/table/tableUtils';
import { FlaggedItem, OrderProductsType } from '@ofm/types/types';
import { useCreateOrderActivity } from '@ofm/services/hooks/useCreateOrderActivity';
import { MasterTitleSkeleton } from '@shared/components/Skeletons/MasterTitleSkeleton';
import { DetailsSectionSkeleton } from '@shared/components/Skeletons/DetailsSectionSkeleton';
import { DetailsTableSkeleton } from '@shared/components/Skeletons/DetailsTableSkeleton';
import { useExportOrderProducts } from '@ofm/services/hooks/useExportOrderProducts';
import { downloadGeneratedCSV, orderHasQuantityAnomaly } from '@ofm/utils/utils';
import { orderDetailsAtom } from '@ofm/atoms/orderDetails/orderDetailsAtom';
import { CommentCardProps } from '@shared/components/CommentCard/CommentCard';
import { Comments } from '@shared/components/Comments/Comments';
import { DetailsSection } from '@shared/components/DetailsSection/DetailsSection';
import { EmptyState } from '@shared/components/EmptyState/EmptyState';
import { InlineNotification } from '@shared/components/InlineNotification/InlineNotification';
import { MasterTitle } from '@shared/components/MasterTitle/MasterTitle';
import { SearchInput } from '@shared/components/SearchInput/SearchInput';
import { Stat } from '@shared/components/Stat/Stat';
import { StatusBadge } from '@shared/components/StatusBadge/StatusBadge';
import {
  PAGE_SIZE,
  DEFAULT_PAGE,
  DEBOUNCE_TIMER,
  NOTIFICATION_TYPES,
} from '@shared/constants/constants';
import { OrderDetailsDrawerModal } from '@ofm/components/OrderDetailsDrawer/OrderDetailsDrawerModal';
import { useOrderDetailsDrawer } from '@ofm/components/OrderDetailsDrawer/useOrderDetailsDrawer';
import { Drawer } from '@shared/components/Drawer/Drawer';
import { Table } from '@shared/components/Table/Table';
import { EmptyPage } from '@shared/components/EmptyPage/EmptyPage';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';

export const OrderDetailsDrawer = ({
  drawerProps,
  isInternational = false,
}: OrderDetailsDrawerProps) => {
  /* Atoms */
  const [warehouse] = useAtom(warehouseAtom);
  const [orderDetails] = useAtom(orderDetailsAtom);

  /* State variables */
  const [comments, setComments] = useState<CommentCardProps[]>([]);
  const [searchTerms, setSearchTerms] = useState<string>('');
  const [modalData, setModalData] = useState<ModalActionProp>(undefined);
  const [selectedRows, setSelectedRows] = useState<OrderProductsType[] | undefined>(undefined);
  const [flaggedItems, setFlaggedItems] = useState<FlaggedItem[]>([]);
  const [enableProductRequest, setEnableProductRequest] = useState<boolean>(true);
  const [productList, setProductList] = useState<OrderProductsType[]>([]);

  /* Constants */
  const { t } = useTranslation();
  const debouncedValue = useDebounce(searchTerms, DEBOUNCE_TIMER);
  const shouldExportCSVRef = useRef(false);

  // This constant is used to control the order product search endpoint calls based on the debounced value
  const shouldEnableProductRequest =
    !!orderDetails.orderId && enableProductRequest && drawerProps.show;

  const { handleNotification } = useNotificationHandler();

  /* Queries */
  /**
   * The useOrderDetailsDrawer hook calls the BFF order endpoints and returns an order with unique
   * OrderSchema or CreditOrderSchema information. Also we get the component top cards, delivery,
   * general details and status data.
   */
  const {
    orderDetailsData,
    isLoading: isOrderLoading,
    isError: isOrderError,
  } = useOrderDetailsDrawer(orderDetails, isInternational, drawerProps.hasNoItems);

  const {
    orderProductsData,
    isError: isProductsError,
    refetch,
  } = useGetOrderProducts(
    {
      orderId: orderDetails.orderId,
      searchTerms: debouncedValue,
    },
    shouldEnableProductRequest
  );

  const {
    orderProductsCsvData,
    isError: isCsvError,
    isLoading: isCsvLoading,
    refetch: refetchOrderProductsCsv,
  } = useExportOrderProducts({
    orderId: orderDetails.orderId,
    searchTerms: debouncedValue,
  });

  const { mutateCreateOrderActivity } = useCreateOrderActivity();

  /* Functions */
  const addActivityComment = (newComment: CommentCardProps) => {
    mutateCreateOrderActivity({
      orderId: orderDetails.orderId,
      activity: {
        message: newComment.comment,
      },
    });
  };

  const openModal = (action: ModalActionProp, selected?: string[]) => {
    if (orderProductsData) {
      selected && setSelectedRows(selected.map((index) => orderProductsData.results[+index]));
    }
    setModalData(action);
  };

  const closeModal = () => {
    setModalData(undefined);
    setSelectedRows(undefined);
  };

  const exportCSVHandler = () => {
    if (orderDetails.orderId) {
      refetchOrderProductsCsv();
      shouldExportCSVRef.current = true;
    }
  };

  const Badge = orderDetailsData?.statusData?.badge && (
    <StatusBadge {...orderDetailsData?.statusData?.badge} />
  );

  const CustomHeader = (
    <MasterTitle
      title={t('OrderDetails.Title')}
      subtitle={Badge}
      className={classNames(
        styles['order-details-drawer__master-header'],
        `${styles['order-details-drawer__master-header']} ${styles['no-border']}`
      )}
    >
      <View
        direction="row"
        justify="start"
        gap={4}
        attributes={{
          'data-testid': 'order-details-cards',
        }}
      >
        {orderDetailsData?.cards?.map((stat, index) => (
          <Stat key={`order-details-stat-${index}`} {...stat} />
        ))}
      </View>
    </MasterTitle>
  );

  const OrderNotification = () => {
    const error = orderDetailsData?.order?.error[0];
    switch (error?.status) {
      case OrderErrorStatus.ON_HOLD:
        return <InlineNotification variant="hold-order" />;
      case OrderErrorStatus.STORE_CONNECT_FAILED:
        return (
          <InlineNotification
            variant="store-error"
            timesTried={error.attemptsCount}
            date={error.lastAttemptedAt}
          />
        );
      case OrderErrorStatus.CSR_STORE_NOT_CREATED:
        return (
          <InlineNotification
            variant="csr-error"
            timesTried={error.attemptsCount}
            date={error.lastAttemptedAt}
          />
        );
      case OrderErrorStatus.QUANTITY_ANOMALY:
        return (
          orderDetailsData?.order?.piecesCount && (
            <InlineNotification
              variant="quantity-anomaly"
              requestedPieces={orderDetailsData.order.piecesCount}
              averageRequestedPieces={800}
              part="000991132"
            />
          )
        );
      default:
        break;
    }
  };

  const triggerTableButton = (selectedRows: string[]) => {
    openModal(
      orderDetailsData?.order?.status === OrderStatus.SENT_TO_OUTBOUND
        ? ModalActions.CREDIT
        : ModalActions.DELETE_ALL,
      selectedRows
    );
  };

  // Gets the correct table columns based on the order type and status
  const getColumns = useCallback(() => {
    if (
      orderDetailsData?.order?.status === OrderStatus.ERROR &&
      orderHasQuantityAnomaly(orderDetailsData.order)
    ) {
      return ORDER_DETAILS_QUANTITY_ANOMALY_TABLE_COLUMNS;
    } else if (orderDetailsData?.order?.type === OrderType.CREDITED) {
      return ORDER_DETAILS_CREDITED_TABLE_COLUMNS;
    } else {
      return ORDER_DETAILS_TABLE_COLUMNS;
    }
  }, [orderDetailsData]);

  const columnMemo = useMemo(() => getColumns(), [getColumns]);

  const updateFlaggedItem = (item: FlaggedItem) => {
    setFlaggedItems((prev) => prev.map((oldItem) => (oldItem.id === item.id ? item : oldItem)));
  };

  /* Hooks */
  // Sets the activity comments from the specific order
  useEffect(() => {
    if (orderDetailsData?.order?.activity && orderDetailsData?.order?.activity?.length > 0) {
      setComments(
        orderDetailsData.order.activity.map((activity) => {
          return {
            comment: activity.message,
            username: activity.user,
            timestamp: dayjs(activity.activityDate).toDate(),
          };
        })
      );
    }
  }, [orderDetailsData]);

  // Sets the flagged items from the order results
  useEffect(() => {
    if (orderProductsData) {
      const flag = orderProductsData?.results.filter((product) => {
        const warehouseObj = getCurrentWarehouseFromList(product.warehouseDetails, warehouse.id);
        const qoh = warehouseObj?.quantityOnHand;

        return qoh && qoh < product.quantity;
      });

      setFlaggedItems(
        flag.map((item) => ({ id: item.id, quantity: item.quantity, hasError: true }))
      );
    }
  }, [orderProductsData, warehouse]);

  // Validates if the data can be exported
  useEffect(() => {
    if (orderProductsCsvData && !isCsvError && !isCsvLoading && shouldExportCSVRef.current) {
      downloadGeneratedCSV(orderProductsCsvData, 'export-order-products');
      handleNotification(NOTIFICATION_TYPES.SUCCESS, t('Success.Action.Export'));
    }
    shouldExportCSVRef.current = false;
  }, [orderProductsCsvData, isCsvError, isCsvLoading, handleNotification, t]);

  // Calls the refetch in case the search input has a valid value
  useEffect(() => {
    if (debouncedValue !== undefined && shouldEnableProductRequest && !isProductsError) {
      refetch();
    }
  }, [debouncedValue, shouldEnableProductRequest, isProductsError, refetch]);

  // Sets the products for the details table
  useEffect(() => {
    if (orderProductsData) {
      setProductList(orderProductsData?.results);
      // Once the component renders, disable the useQuery hook so the debounce works as intended
      setEnableProductRequest(false);
    } else {
      setEnableProductRequest(true);
    }
  }, [orderProductsData]);

  if (isOrderError) {
    return (
      <Drawer {...drawerProps} size="custom" position="right" removeInnerPadding>
        <EmptyPage
          title={t('Errors.Page.Title')}
          description={t('Errors.Drawer.Description', { service: t('Services.Order') })}
          buttonText={t('Errors.Drawer.ButtonText')}
          onClick={drawerProps.handleClose}
          icon={IconError}
        />
      </Drawer>
    );
  } else {
    return (
      <>
        <Drawer
          {...drawerProps}
          size="custom"
          position="right"
          removeInnerPadding
          isLoading={isOrderLoading}
          CustomHeader={isOrderLoading ? <MasterTitleSkeleton /> : CustomHeader}
          primaryButtonText={orderDetailsData?.statusData?.primaryButtonText}
          primaryButtonHandler={() => openModal(orderDetailsData?.statusData?.primaryButtonAction)}
          isPrimaryButtonDisabled={orderDetailsData?.statusData?.isPrimaryButtonDisabled}
          secondaryButtonText={orderDetailsData?.statusData?.secondaryButtonText}
          secondaryButtonHandler={() =>
            openModal(orderDetailsData?.statusData?.secondaryButtonAction)
          }
          isSecondaryButtonDisabled={orderDetailsData?.statusData?.isSecondaryButtonDisabled}
          contentClassName={styles['order-details-drawer__content']}
        >
          <View direction="row" width="100%" height="100%" wrap={false}>
            <View.Item
              columns={{ s: 4, m: 4, l: 4, xl: 3 }}
              className={styles['order-details-drawer__left-column']}
              attributes={{
                'data-testid': 'order-details-left-column',
              }}
            >
              <View
                className={styles['order-details-drawer__details']}
                attributes={{
                  'data-testid': 'order-details-title',
                }}
              >
                {isOrderLoading ? (
                  <DetailsSectionSkeleton items={3} />
                ) : (
                  <>
                    {orderDetailsData?.details && (
                      <DetailsSection
                        header={t('OrderDetails.Title')}
                        rows={orderDetailsData?.details}
                      />
                    )}
                  </>
                )}
              </View>
              {orderDetailsData?.delivery && (
                <View className={styles['order-details-drawer__details']}>
                  {isOrderLoading ? (
                    <DetailsSectionSkeleton items={2} />
                  ) : (
                    <DetailsSection
                      header={t('OrderDetails.Delivery')}
                      rows={orderDetailsData?.delivery}
                    />
                  )}
                </View>
              )}
              <Comments
                comments={comments}
                isOpen={false}
                handleCommentSubmit={addActivityComment}
                className={styles['order-details-drawer__comments']}
                isLoading={isOrderLoading}
              />
            </View.Item>
            <View.Item
              grow
              className={styles['order-details-drawer__right-column']}
              attributes={{
                'data-testid': 'order-details-right-column',
              }}
            >
              <View
                direction="column"
                className={styles['order-details-drawer__right-column-details']}
              >
                {isOrderLoading ? (
                  <DetailsTableSkeleton
                    hasTitle
                    hasSearchSection
                    hasSearchComponents
                    hasExportBtn
                    searchPlaceholder={t('OrderDetails.SearchPlaceholder')}
                  />
                ) : (
                  <>
                    <View padding={[6, 6, 0, 6]}>
                      {orderDetailsData?.order?.error &&
                        orderDetailsData?.order?.error.length > 0 && (
                          <View padding={[0, 0, 8, 0]}>
                            <OrderNotification />
                          </View>
                        )}
                      <View padding={[0, 0, 4, 0]}>
                        <Text
                          weight="bold"
                          color="primary"
                          className={styles['order-details-drawer__invoice-title']}
                        >
                          {t('OrderDetails.Items')}
                        </Text>
                      </View>
                      <View direction="row" justify="end" gap={4}>
                        <View.Item grow>
                          <SearchInput
                            label={t('OrderDetails.SearchPlaceholder')}
                            value={searchTerms}
                            onValueChange={setSearchTerms}
                            onValueClear={() => setSearchTerms('')}
                            className={styles['order-details-drawer__search-bar']}
                          />
                        </View.Item>
                        <View.Item>
                          <Button
                            size="large"
                            variant="ghost"
                            className={styles['order-details-drawer__export']}
                            onClick={exportCSVHandler}
                          >
                            <View direction="row" align="center" justify="center" gap={2}>
                              <Text>{t('OrderDetails.Export')}</Text>
                              <Icon svg={Export} color="on-primary" />
                            </View>
                          </Button>
                        </View.Item>
                      </View>
                    </View>
                    <>
                      {isProductsError ? (
                        <View padding={{ s: [30, 0], m: [40, 0], l: [45, 0], xl: [55, 0] }}>
                          <View.Item grow>
                            <EmptyState
                              svg={ExclamationCircle}
                              subtitle={t('Errors.Page.Title')}
                              text={t('Errors.Search.Description', {
                                items: t('Services.Products'),
                              })}
                            />
                          </View.Item>
                        </View>
                      ) : (
                        <>
                          {drawerProps.hasNoItems || productList?.length === 0 ? (
                            <View padding={{ s: [30, 0], m: [40, 0], l: [45, 0], xl: [55, 0] }}>
                              <View.Item grow>
                                <EmptyState
                                  svg={ExclamationCircle}
                                  subtitle={t('OrderDetails.NoItems')}
                                  text={t('OrderDetails.NoItemsText')}
                                />
                              </View.Item>
                            </View>
                          ) : (
                            <View
                              padding={[8, 6, 6, 6]}
                              className="order-details-drawer__table-wrapper"
                              overflow="hidden"
                            >
                              <Table
                                styleVariant={TableStylingVariants.DETAILS}
                                columns={columnMemo}
                                rows={mapOrderDetailsTableRows(
                                  productList,
                                  warehouse.id,
                                  flaggedItems,
                                  updateFlaggedItem,
                                  orderHasQuantityAnomaly(orderDetailsData?.order)
                                )}
                                isPaginated={true}
                                pageSize={PAGE_SIZE}
                                defaultPage={DEFAULT_PAGE}
                                isCheckboxDisabled={false}
                                isCreditItem={
                                  orderDetailsData?.order?.status === OrderStatus.SENT_TO_OUTBOUND
                                }
                                isCheckboxTable={
                                  orderDetailsData?.order?.type === OrderType.CREDITED
                                    ? false
                                    : true
                                }
                                totalPages={Math.ceil(productList.length / PAGE_SIZE)}
                                onSort={(_sorting) => {
                                  return;
                                }}
                                onClick={triggerTableButton}
                              />
                            </View>
                          )}
                        </>
                      )}
                    </>
                  </>
                )}
              </View>
            </View.Item>
          </View>
        </Drawer>
        <OrderDetailsDrawerModal
          action={modalData}
          handleClose={closeModal}
          order={orderDetailsData?.order}
          selectedRows={selectedRows}
          flaggedItems={flaggedItems}
          refetchOnSucess={refetch}
        />
        <a id="export-order-products" style={{ display: 'none' }} />
      </>
    );
  }
};
