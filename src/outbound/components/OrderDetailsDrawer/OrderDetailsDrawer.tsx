/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Button, Icon, Text, View, useDebounce, classNames, Link } from '@az/starc-ui';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OrderDetailsDrawerProps } from './OrderDetailsDrawer.types';
import styles from './OrderDetailsDrawer.module.scss';
import { Download } from '@shared/assets/icons';
import dayjs from 'dayjs';
import {
  ORDER_DETAILS_DRAWER_TABLE_COLUMNS,
  TableStylingVariants,
} from '@shared/components/Table/tableConstants';
import { useAtom } from 'jotai';

import { mapOrderDetailsDrawerTableRows } from '@ofm/utils/table/tableUtils';
import { useCreateOrderActivity } from '@ofm/services/hooks/useCreateOrderActivity';
import { MasterTitleSkeleton } from '@shared/components/Skeletons/MasterTitleSkeleton';
import { useExportOrderProducts } from '@ofm/services/hooks/useExportOrderProducts';
import { downloadGeneratedCSV } from '@ofm/utils/utils';
import { orderDetailsAtom } from '@ofm/atoms/orderDetails/orderDetailsAtom';
import { CommentCardProps } from '@shared/components/CommentCard/CommentCard';
import { Comments } from '@shared/components/Comments/Comments';
import { DetailsSection } from '@shared/components/DetailsSection/DetailsSection';

import { MasterTitle } from '@shared/components/MasterTitle/MasterTitle';
import { SearchInput } from '@shared/components/SearchInput/SearchInput';
import { Stat } from '@shared/components/Stat/Stat';

import {
  PAGE_SIZE,
  DEFAULT_PAGE,
  DEBOUNCE_TIMER,
  NOTIFICATION_TYPES,
} from '@shared/constants/constants';
import { useOrderDetailsDrawer } from '@ofm/components/OrderDetailsDrawer/useOrderDetailsDrawer';
import { Drawer } from '@shared/components/Drawer/Drawer';
import { Table } from '@shared/components/Table/Table';

import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { ORDER_DETAILS_DRAWER_ROWS, orders } from './data';

import { OrderReleaseStatus } from '@outbound/constants/constants';
import { StatusVariants } from '@shared/components/StatusBadge/StatusBadge.types';
import { Modal } from '../Modal/Modal';
import { LaneAssignment } from './LaneAssignment';
import { releaseOrders } from '@outbound/pages/ControlDesk/ReleaseOrders/OrderTabs/data';
import {
  inLaneConfirmationAtom,
  laneConfirmationItemAtom,
  selectedStoresAtom,
} from '@outbound/atoms/releaseOrder/releaseOrderAtom';
import { PAGE_URLS } from '@shared/constants/routes';
import { useNavigate, useParams } from 'react-router-dom';

export const OrderDetailsDrawer = ({
  drawerProps,
  isInternational = false,
}: OrderDetailsDrawerProps) => {
  const [orderStatus, setOrderStatus] = useState(OrderReleaseStatus.RPLENISHMENT_NOT_RUN);
  /* Atoms */
  const [orderDetails] = useAtom(orderDetailsAtom);
  const [, setLaneConfirmationItem] = useAtom(laneConfirmationItemAtom);
  const [, setSelectedStores] = useAtom(selectedStoresAtom);
  const [, setInLaneConfirmation] = useAtom(inLaneConfirmationAtom);

  /* State variables */
  const [comments, setComments] = useState<CommentCardProps[]>([]);
  const [searchTerms, setSearchTerms] = useState<string>('');
  const [laneAssignmentModal, setLaneAssignmentModal] = useState<boolean>(false);

  /* Constants */
  const { t } = useTranslation();
  const debouncedValue = useDebounce(searchTerms, DEBOUNCE_TIMER);
  const shouldExportCSVRef = useRef(false);
  const navigate = useNavigate();
  const { handleNotification } = useNotificationHandler();
  const { storeId } = useParams();

  /* Queries */
  /**
   * The useOrderDetailsDrawer hook calls the BFF order endpoints and returns an order with unique
   * OrderSchema or CreditOrderSchema information. Also we get the component top cards, delivery,
   * general details and status data.
   */
  const { orderDetailsData, isLoading: isOrderLoading } = useOrderDetailsDrawer(
    orderDetails,
    isInternational,
    drawerProps.hasNoItems
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

  const exportCSVHandler = () => {
    if (orderDetails.orderId) {
      refetchOrderProductsCsv();
      shouldExportCSVRef.current = true;
    }
  };

  const onProceedToLaneConfirmation = () => {
    setLaneAssignmentModal(true);
    setInLaneConfirmation(true);
    setLaneConfirmationItem(orders);
    setSelectedStores([orders.stores[0].storeNumber]);
  };
  const onRelease = () => {
    handleNotification(
      NOTIFICATION_TYPES.SUCCESS,
      t('OutboundMatrix.OrderDetailsDrawer.WaveReleasedText', {
        number: storeId,
        id: '20181194',
      })
    );
    navigate(PAGE_URLS.OUTBOUND_CONTROL_DESK);
  };

  const CustomHeader = (
    <MasterTitle
      title={t('OrderDetails.Title')}
      subtitle={
        <View direction="row" gap={4}>
          <View.Item>
            <Text>
              {t('OutboundMatrix.OrderRelease.Store')} {storeId}
            </Text>
          </View.Item>
          <View.Item>
            <Link
              variant="underline"
              onClick={() => {
                navigate(PAGE_URLS.OUTBOUND_CONTROL_DESK);
              }}
            >
              <Text fontFamily="body" size="087" weight="medium" color="500">
                {t('MasterTitle.ViewControlDesk')}
              </Text>
            </Link>
          </View.Item>
        </View>
      }
      className={classNames(
        styles['order-details-drawer__master-header'],
        `${styles['order-details-drawer__master-header']} ${styles['no-border']}`
      )}
      {...(orderStatus === OrderReleaseStatus.READY_FOR_RELEASE
        ? {
            statusBadgeProps: {
              variant: StatusVariants.READY_FOR_ACTION,
              text: t('OrderType.ReadyForRelease'),
            },
          }
        : {})}
    >
      <View direction="row" justify="end" align="center" padding={4}>
        {orderStatus === OrderReleaseStatus.RPLENISHMENT_NOT_RUN ? (
          <Button
            variant="primary"
            onClick={() => {
              setOrderStatus(OrderReleaseStatus.READY_FOR_RELEASE);
              handleNotification(
                NOTIFICATION_TYPES.SUCCESS,
                t('OutboundMatrix.OrderDetailsDrawer.ReplenishmentRunText', {
                  item: t('OutboundMatrix.OrderRelease.Store'),
                  id: storeId,
                })
              );
            }}
          >
            <Text>{t('OutboundMatrix.OrderDetailsDrawer.RunReplenishmentDrawer')}</Text>
          </Button>
        ) : (
          <Button variant="primary" onClick={onProceedToLaneConfirmation}>
            <Text>{t('OutboundMatrix.OrderRelease.ProceedToLaneConfirmation')}</Text>
          </Button>
        )}
      </View>
    </MasterTitle>
  );

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

  // Validates if the data can be exported
  useEffect(() => {
    if (orderProductsCsvData && !isCsvError && !isCsvLoading && shouldExportCSVRef.current) {
      downloadGeneratedCSV(orderProductsCsvData, 'export-order-products');
      handleNotification(NOTIFICATION_TYPES.SUCCESS, t('Success.Action.Export'));
    }
    shouldExportCSVRef.current = false;
  }, [orderProductsCsvData, isCsvError, isCsvLoading, handleNotification, t]);

  const getStoreInformation = () => {
    return [
      { label: t('DetailsSection.Type'), text: t('OrderType.Replenishment') },
      {
        label: t('DetailsSection.Lines'),
        text: '500',
      },
      { label: t('DetailsSection.Pieces'), text: '600' },
    ];
  };

  return (
    <>
      <Drawer
        {...drawerProps}
        size="custom"
        position="right"
        removeInnerPadding
        isLoading={isOrderLoading}
        CustomHeader={isOrderLoading ? <MasterTitleSkeleton /> : CustomHeader}
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
              <>
                <DetailsSection header={t('OrderDetails.Title')} rows={getStoreInformation()} />
              </>
            </View>
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
              <>
                <View padding={[6, 6, 0, 6]} gap={4}>
                  <View direction="row" gap={2}>
                    <View backgroundColor="secondary">
                      <Stat
                        type="default"
                        width="232px"
                        title={t('OutboundMatrix.OrderDetailsDrawer.Stats.RoNumber')}
                        size="medium"
                        primaryText="000090111834186"
                      />
                    </View>
                    <View backgroundColor="secondary">
                      <Stat
                        width="232px"
                        size="medium"
                        title={t('OutboundMatrix.OrderDetailsDrawer.Stats.InvoiceNumber')}
                        primaryText="923060"
                      />
                    </View>
                    <View backgroundColor="secondary">
                      <Stat
                        size="medium"
                        width="232px"
                        title={t('OutboundMatrix.OrderDetailsDrawer.Stats.StoreNumber')}
                        primaryText={String(storeId)}
                        secondaryTextProps={{
                          secondaryText: t('OrderDetails.Stats.StoreNumber.LinkText'),
                          url: PAGE_URLS.STORE_ORDER_DETAILS(String(storeId)),
                        }}
                      />
                    </View>
                    <View backgroundColor="secondary">
                      <Stat
                        size="medium"
                        width="186px"
                        title={t('OutboundMatrix.OrderDetailsDrawer.Stats.DispatchTime')}
                        primaryText="Today 13:00(LN05)"
                      />
                    </View>
                    <View backgroundColor="secondary">
                      <Stat
                        size="medium"
                        width="186px"
                        title={t('OutboundMatrix.OrderDetailsDrawer.Stats.DeliveryTime')}
                        primaryText="09/10/23 04:00"
                      />
                    </View>
                  </View>

                  <View padding={[0, 0, 4, 0]} gap={4}>
                    <Text
                      weight="bold"
                      color="primary"
                      className={styles['order-details-drawer__invoice-title']}
                    >
                      {t('OrderDetails.Items')}
                    </Text>
                    <View direction="row">
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
                            <Text>{t('OutboundMatrix.OrderDetailsDrawer.DOWNLOAD')}</Text>
                            <Icon svg={Download} color="on-primary" />
                          </View>
                        </Button>
                      </View.Item>
                    </View>
                  </View>
                </View>
                <>
                  <View padding={[2, 6]} className="order-details-drawer__table-wrapper">
                    <Table
                      styleVariant={TableStylingVariants.DETAILS}
                      columns={ORDER_DETAILS_DRAWER_TABLE_COLUMNS}
                      rows={mapOrderDetailsDrawerTableRows(ORDER_DETAILS_DRAWER_ROWS)}
                      isPaginated={true}
                      pageSize={PAGE_SIZE}
                      defaultPage={DEFAULT_PAGE}
                      isCheckboxDisabled={false}
                      isCheckboxTable={false}
                      totalPages={Math.ceil(ORDER_DETAILS_DRAWER_ROWS.length / PAGE_SIZE)}
                      onSort={(_sorting) => {
                        return;
                      }}
                      isCreditItem={false}
                    />
                  </View>
                </>
              </>
            </View>
          </View.Item>
        </View>
      </Drawer>
      <Modal
        open={laneAssignmentModal}
        onClose={() => setLaneAssignmentModal(false)}
        title={t('OutboundMatrix.OrderRelease.LaneConfirmation')}
        size="large"
        subTitle={t('OutboundMatrix.OrderRelease.StoresReleased', { count: 15, max: 80 })}
        primaryBtnText={t('OutboundMatrix.OrderRelease.Release')}
        onSuccess={() => onRelease()}
        children={
          <View direction="column" width="100%">
            <LaneAssignment
              item={{
                ...orders,
                stores: [{ ...orders.stores[0], storeNumber: String(storeId) }],
              }}
              order={releaseOrders.releaseByMatrix}
            />
          </View>
        }
      />
    </>
  );
};
