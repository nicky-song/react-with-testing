/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { View, Text, Button, Pagination, Store } from '@az/starc-ui';
import { useTranslation } from 'react-i18next';
import { CheckBoxCard } from '@shared/components/CheckBoxCard/CheckBoxCard';
import { Props as TCheckBoxCardProps } from '@shared/components/CheckBoxCard/CheckBoxCard.types';
import { Footer } from '@shared/components/Footer/Footer';
import { useCallback, useEffect, useState } from 'react';
import { StatusVariants } from '@shared/components/StatusBadge/StatusBadge.types';
import { useGetOrders } from '@ofm/services/hooks/useGetOrders';
import { OrderErrorStatus, OrderStatus, OrderType } from '@ofm/constants/constants';
import { generateDateString, mapRequestToProgressBar } from '@ofm/utils/utils';
import { EmptyState } from '@shared/components/EmptyState/EmptyState';
import { useAtom } from 'jotai';
import { warehouseAtom } from '@ofm/atoms/warehouse/warehouseAtom';
import { OrderDetailsType, SetChildErrorType } from '@ofm/types/types';
import { OpeningAndBackupSkeleton } from './OpeningAndBackupSkeleton';
import { useCreateBillOrderProcesses } from '@ofm/services/hooks/useCreateBillOrderProcesses';
import { OrderDetailsDrawer } from '@ofm/components/OrderDetailsDrawer/OrderDetailsDrawer';
import { useGetBillOrderProcesses } from '@ofm/services/hooks/useGetBillOrderProcesses';
import { ProgressBar } from '@ofm/components/ProgressBar/ProgressBar';
import { orderDetailsAtom } from '@ofm/atoms/orderDetails/orderDetailsAtom';
import { useInternationalDC } from '@shared/hooks/useInternationalDC';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { FULL_PAGE_SIZE, PAGE_ERRORS } from '@shared/constants/constants';
import { usePageErrorHandler } from '@shared/hooks/usePageErrorHandler';
import { PAGE_URLS } from '@shared/constants/routes';
import s from './OpeningAndBackup.module.scss';
import dayjs from 'dayjs';

export const OpeningAndBackup = () => {
  const { waveId, setChildError } = useOutletContext<{
    waveId?: string;
    setChildError?: SetChildErrorType;
  }>();

  /* Atoms */
  const [warehouse] = useAtom(warehouseAtom);
  const [, setOrderDetails] = useAtom(orderDetailsAtom);

  /* State variables */
  const [openingOrders, setOpeningOrders] = useState<TCheckBoxCardProps[]>([]);
  const [backupOrders, setBackupOrders] = useState<TCheckBoxCardProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [ordersInProgress, setOrdersInProgress] = useState<string[]>([]);
  const [showOrderDetailsDrawer, setShowOrderDetailsDrawer] = useState<boolean>(false);

  /* Constants */
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const numberOfSelectedOrders = selectedOrders.length;
  const orderQueryOptions = {
    warehouseId: warehouse.id,
    currentPage: currentPage - 1,
    pageSize: FULL_PAGE_SIZE,
    status: [OrderStatus.READY_TO_BILL, OrderStatus.ERROR],
  };

  const { isInternational, key } = useInternationalDC({ warehouse });

  const { orderId } = useParams();
  const navigate = useNavigate();

  /* Queries */
  const {
    ordersData: openingOrdersData,
    isLoading: isOpeningLoading,
    isError: isOpeningError,
  } = useGetOrders({ ...orderQueryOptions, type: OrderType.OPENING }, !!warehouse.id);

  const {
    ordersData: backupOrdersData,
    isLoading: isBackupLoading,
    isError: isBackupError,
  } = useGetOrders({ ...orderQueryOptions, type: OrderType.BACKUP }, !!warehouse.id);

  const isOrderError = isOpeningError || isBackupError;
  const isOrderLoading = isOpeningLoading || isBackupLoading;

  const { billsData, isError: isBillError } = useGetBillOrderProcesses(waveId || '', !!waveId);

  const { mutateCreateBillOrder, isLoading: isBilling } = useCreateBillOrderProcesses();

  /* Functions */
  const onCheckboxToggle = (title: string) => {
    const newSelectedOrders = selectedOrders.includes(title)
      ? selectedOrders.filter((id) => id !== title)
      : [...selectedOrders, title];
    setSelectedOrders(newSelectedOrders);
  };

  // Sets the status label to each order
  const generateOrderStatus = useCallback(
    (order: OrderDetailsType): TCheckBoxCardProps['statusBadge'] => {
      const errorStatuses = order.error.map((error) => error.status);
      if (
        order.status === OrderStatus.ERROR &&
        !errorStatuses.includes(OrderErrorStatus.CSR_STORE_NOT_CREATED) &&
        !errorStatuses.includes(OrderErrorStatus.STORE_CONNECT_FAILED)
      ) {
        if (errorStatuses.includes(OrderErrorStatus.QUANTITY_ANOMALY)) {
          return { variant: StatusVariants.IN_PROGRESS, text: t('OrderStatus.QuantityAnomaly') };
        } else if (errorStatuses.includes(OrderErrorStatus.ON_HOLD)) {
          return { variant: StatusVariants.READY_FOR_ACTION, text: t('OrderStatus.OnHold') };
        }
      } else if (order.isInProgress || ordersInProgress.includes(order.id)) {
        return { variant: StatusVariants.IN_PROGRESS, text: t('WaveStatus.InProgress') };
      }
    },

    [ordersInProgress, t]
  );

  const mapOrderToItem = useCallback(
    (order: OrderDetailsType): TCheckBoxCardProps => {
      const date = order.dueDate ? dayjs(order.dueDate) : undefined;
      const isError = date ? date.isBefore(dayjs().startOf('day')) : false;
      const orderStatus = generateOrderStatus(order);
      return {
        title: order.id,
        displayValue: order.storeNumber,
        label: date
          ? `${t('CloseBy')} ${generateDateString(order.dueDate, t('DateFormat.Short'))}`
          : '',
        onChangeHandler: () => null,
        isInErrorState: isError,
        statusBadge: orderStatus,
        isCheckboxDisabled: !!orderStatus,
        isChecked: false,
      };
    },
    [generateOrderStatus, t]
  );

  const handleBill = async () => {
    mutateCreateBillOrder(selectedOrders, {
      onSuccess: () => {
        queryClient.invalidateQueries(['orders', orderQueryOptions]);
        setOrdersInProgress((prev) => [...prev, ...selectedOrders]);
        setSelectedOrders([]);
      },
    });
  };

  const handleOrderClick = (orderId: string) => {
    setOrderDetails({ orderId, orderType: OrderType.OPENING });
    setShowOrderDetailsDrawer(true);
    navigate(`${PAGE_URLS.OPENING_AND_BACKUP}${PAGE_URLS.ORDERS}/${orderId}`);
  };

  useEffect(() => {
    if (orderId) {
      setOrderDetails({ orderId, orderType: OrderType.OPENING });
      setShowOrderDetailsDrawer(true);
    }
  }, [orderId, setOrderDetails]);

  /* Hooks */
  usePageErrorHandler(
    [{ name: PAGE_ERRORS.ORDERS, value: isOrderError || isBillError }],
    setChildError
  );

  // Adds the orders into the opening or backup array based on type
  useEffect(() => {
    if (!isOrderLoading && !isOrderError && openingOrdersData && backupOrdersData) {
      setOpeningOrders(openingOrdersData.results.map((order) => mapOrderToItem(order)));
      setBackupOrders(backupOrdersData.results.map((order) => mapOrderToItem(order)));
      setTotalResults(
        openingOrdersData.metadata.totalResults + backupOrdersData.metadata.totalResults
      );
    }
  }, [openingOrdersData, backupOrdersData, isOrderLoading, isOrderError, mapOrderToItem]);

  // TODO: Need to figure out a way to show notification to user after all order completed may be local storage can be used.
  // Notifies the user once the progress bar is complete
  // useEffect(() => {
  //   if (!isBillError && !isBillError && billsData && billsData.length > 0) {
  //     const request = billsData.at(0);

  //     // Check if the request exists and the user has not been notified yet
  //     if (
  //       request &&
  //       request.id &&
  //       !request.userNotified &&
  //       request.status === RequestStatus.COMPLETED
  //     ) {
  //       mutatePatchBillRequest(request.id, {
  //         onSuccess: () => {
  //           const { completedOrdersCount, flaggedOrdersCount } = request.summary;
  //           handleNotification(
  //             NOTIFICATION_TYPES.SNACK,
  //             t('OrdersBilled', { count: completedOrdersCount }),
  //             t('OrdersBilledSummary', {
  //               orders: completedOrdersCount,
  //               flagged: flaggedOrdersCount,
  //             })
  //           );
  //         },
  //       });
  //     }
  //   }
  // }, [
  //   billsData,
  //   isBillError,
  //   isBillLoading,
  //   numberOfSelectedOrders,
  //   mutatePatchBillRequest,
  //   handleNotification,
  //   t,
  // ]);

  const StickyFooter = () => (
    <Footer>
      <Button
        loading={isBilling}
        attributes={{ style: { width: 'fit-content' } }}
        onClick={handleBill}
        aria-disabled={!!numberOfSelectedOrders}
        disabled={!numberOfSelectedOrders && !isBilling}
      >
        {t('BillOrders', { count: numberOfSelectedOrders })}
      </Button>
    </Footer>
  );

  if (isOrderLoading) {
    return (
      <View height="100%" padding={6} className={s['wrapper']}>
        <OpeningAndBackupSkeleton />
      </View>
    );
  } else if (openingOrders?.length === 0 && backupOrders?.length === 0) {
    return (
      <EmptyState
        svg={Store}
        subtitle={t('Empty.Store.Subtitle')}
        text={t('Empty.Store.Orders', { orderType: t('CombinedTabs.Orders.OpeningAndBackup') })}
      />
    );
  } else {
    return (
      <>
        <View padding={6} height="100%" className="scrollable-section">
          {billsData && (
            <View padding={[0, 0, 8, 0]}>
              <ProgressBar {...mapRequestToProgressBar(billsData)} />
            </View>
          )}
          {openingOrders && openingOrders.length > 0 && (
            <>
              <Text weight="bold" color="primary" className={s['heading']}>
                {t('OpeningOrders')}
              </Text>
              <View as="ul" gap={4} className={s['orders-list']}>
                {openingOrders?.map((order) => (
                  <View.Item as="li" key={order.title} className={s['orders-list__item']}>
                    <CheckBoxCard
                      title={order.displayValue || ''}
                      label={order.label}
                      statusBadge={order.statusBadge || undefined}
                      isInErrorState={order.isInErrorState}
                      isCheckboxDisabled={order.isCheckboxDisabled}
                      isChecked={selectedOrders.includes(order.title)}
                      onChangeHandler={onCheckboxToggle}
                      onClick={() => handleOrderClick(order.title)}
                    />
                  </View.Item>
                ))}
              </View>
            </>
          )}
          {backupOrders && backupOrders.length > 0 && (
            <>
              <Text weight="bold" color="primary" className={s['heading']}>
                {t('BackupOrders')}
              </Text>
              <View as="ul" gap={4} className={s['orders-list']}>
                {backupOrders?.map((order) => (
                  <View.Item as="li" className={s['orders-list__item']} key={order.title}>
                    <CheckBoxCard
                      title={order.displayValue || ''}
                      label={order.label}
                      statusBadge={order.statusBadge || undefined}
                      isInErrorState={order.isInErrorState}
                      isCheckboxDisabled={order.isCheckboxDisabled}
                      isChecked={selectedOrders.includes(order.title)}
                      onChangeHandler={onCheckboxToggle}
                      onClick={() => handleOrderClick(order.title)}
                    />
                  </View.Item>
                ))}
              </View>
            </>
          )}
          {totalResults > FULL_PAGE_SIZE && (
            <View justify="center" align="center">
              <Pagination
                onPageChange={(newPage) => setCurrentPage(newPage)}
                totalPages={Math.ceil(totalResults / FULL_PAGE_SIZE)}
              />
            </View>
          )}
        </View>
        <OrderDetailsDrawer
          drawerProps={{
            show: showOrderDetailsDrawer,
            handleClose: () => {
              setShowOrderDetailsDrawer(false);
              navigate(PAGE_URLS.OPENING_AND_BACKUP);
            },
          }}
          isInternational={isInternational}
          key={key}
        />
        <StickyFooter />
      </>
    );
  }
};
