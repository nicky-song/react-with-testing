/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Store } from '@az/starc-ui';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { hasFunctionalCheckbox } from '@shared/components/CheckBoxCard/CheckBoxCard.types';
import { ItemLayout } from '@shared/components/ItemLayout/ItemLayout';
import { useGetOrders } from '@ofm/services/hooks/useGetOrders';
import { OrderStatus, OrderType } from '@ofm/constants/constants';
import { useAtom } from 'jotai';
import { warehouseAtom } from '@ofm/atoms/warehouse/warehouseAtom';
import { useCreateBillOrderProcesses } from '@ofm/services/hooks/useCreateBillOrderProcesses';
import { OrderDetailsDrawer } from '@ofm/components/OrderDetailsDrawer/OrderDetailsDrawer';
import { useGetBillOrderProcesses } from '@ofm/services/hooks/useGetBillOrderProcesses';
import { mapRequestToProgressBar } from '@ofm/utils/utils';
import { useQueryClient } from '@tanstack/react-query';
import { orderDetailsAtom } from '@ofm/atoms/orderDetails/orderDetailsAtom';
import { OrderDetailsType, SetChildErrorType } from '@ofm/types/types';
import { useInternationalDC } from '@shared/hooks/useInternationalDC';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import { FULL_PAGE_SIZE, PAGE_ERRORS } from '@shared/constants/constants';
import { usePageErrorHandler } from '@shared/hooks/usePageErrorHandler';
import { EmptyState } from '@shared/components/EmptyState/EmptyState';
import { PAGE_URLS } from '@shared/constants/routes';

export const CrossDock = () => {
  const { t } = useTranslation();
  const { waveId, setChildError } = useOutletContext<{
    waveId?: string;
    setChildError?: SetChildErrorType;
  }>();

  /* Atoms */
  const [warehouse] = useAtom(warehouseAtom);
  const [, setOrderDetails] = useAtom(orderDetailsAtom);

  /* State variables */
  const [orders, setOrders] = useState<
    {
      title: string;
      onChangeHandler: () => void;
      isChecked: boolean;
    }[]
  >([]);
  const [showOrderDetailsDrawer, setShowOrderDetailsDrawer] = useState<boolean>(false);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  /* Constants */
  const queryClient = useQueryClient();
  const numberOfSelectedOrders = selectedOrders.length;
  const orderQueryOptions = {
    warehouseId: warehouse.id,
    type: OrderType.CROSS_DOCK,
    currentPage: currentPage - 1,
    pageSize: FULL_PAGE_SIZE,
    status: [OrderStatus.READY_TO_BILL],
  };

  const { isInternational, key } = useInternationalDC({ warehouse });

  const navigate = useNavigate();
  const { orderId } = useParams();

  /* Queries */
  const {
    ordersData,
    isLoading: isOrderLoading,
    isError: isOrderError,
  } = useGetOrders(orderQueryOptions, !!warehouse.id);

  const {
    billsData,
    isInitialLoading: isBillLoading,
    isError: isBillError,
  } = useGetBillOrderProcesses(waveId || '', !!waveId);

  const { mutateCreateBillOrder, isLoading: isBilling } = useCreateBillOrderProcesses();

  /* Functions */
  const onCheckboxToggle = (title: string) => {
    const newSelectedOrders = selectedOrders.includes(title)
      ? selectedOrders.filter((id) => id !== title)
      : [...selectedOrders, title];
    setSelectedOrders(newSelectedOrders);
  };

  const selectAllHandler = () => {
    if (numberOfSelectedOrders === orders.length) {
      setSelectedOrders([]);
      return;
    }
    setSelectedOrders(
      orders.filter((order) => hasFunctionalCheckbox(order)).map((order) => order.title)
    );
  };

  // Show the notification for a bill order request
  const showOrderNotification = async () => {
    mutateCreateBillOrder(selectedOrders, {
      onSuccess: () => {
        queryClient.invalidateQueries(['orders', orderQueryOptions]);
        setSelectedOrders([]);
      },
    });
  };

  /* Hooks */
  usePageErrorHandler(
    [{ name: PAGE_ERRORS.ORDERS, value: isOrderError || isBillError }],
    setChildError
  );

  // Sets the orders displayed inside the item layout component
  useEffect(() => {
    if (!isOrderLoading && !isOrderError && ordersData) {
      setOrders(
        ordersData?.results
          .filter((order: OrderDetailsType) => order.type === OrderType.CROSS_DOCK)
          .map((order: OrderDetailsType) => ({
            title: order.id,
            onChangeHandler: () => null,
            isChecked: false,
          }))
      );
      setTotalResults(ordersData.metadata.totalResults);
    }
  }, [ordersData, isOrderLoading, isOrderError]);

  useEffect(() => {
    if (orderId) {
      setOrderDetails({ orderId: orderId.toString(), orderType: OrderType.CROSS_DOCK });
      setShowOrderDetailsDrawer(true);
    }
  }, [orderId, setOrderDetails]);

  // TODO: Need to figure out a way to show notification to user after all order completed may be local storage can be used.

  // Notifies the user once the progress bar is complete
  // useEffect(() => {
  //   if (!isBillError && !isBillLoading && billsData && billsData.length > 0) {
  //     const request = billsData.at(0);

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
  // }, [billsData, isBillError, isBillLoading, t, mutatePatchBillRequest, handleNotification]);

  if (!isOrderLoading && ordersData?.results && ordersData.results.length === 0) {
    return (
      <EmptyState
        svg={Store}
        subtitle={t('Empty.Store.Subtitle')}
        text={t('Empty.Store.Orders', { orderType: t('CombinedTabs.Orders.CrossDock') })}
      />
    );
  } else {
    return (
      <>
        <ItemLayout
          items={orders.map((order) => {
            return { id: order.title };
          })}
          selectedItems={selectedOrders}
          onItemSelect={onCheckboxToggle}
          isLoading={isBillLoading || isOrderLoading}
          buttons={[
            {
              title:
                numberOfSelectedOrders === orders.length && numberOfSelectedOrders !== 0
                  ? t('DeselectAll')
                  : t('SelectAll'),
              isDisabled: orders.length === 0,
              clickHandler: selectAllHandler,
            },
            {
              title: t('BillOrders', { count: numberOfSelectedOrders }),
              isDisabled: !numberOfSelectedOrders && !isBilling,
              variant: 'secondary',
              loading: isBilling,
              clickHandler: showOrderNotification,
            },
          ]}
          progress={billsData ? [mapRequestToProgressBar(billsData)] : undefined}
          paginationProps={
            totalResults > FULL_PAGE_SIZE
              ? {
                  onPageChange: (newPage) => setCurrentPage(newPage),
                  totalPages: Math.ceil(totalResults / FULL_PAGE_SIZE),
                }
              : undefined
          }
          setItemId={(orderId) => {
            setOrderDetails({ orderId: orderId.toString(), orderType: OrderType.CROSS_DOCK });
            navigate(`${PAGE_URLS.CROSS_DOCK}${PAGE_URLS.ORDERS}/${orderId}`);
          }}
          setShowOrderDetailsDrawer={(status) => setShowOrderDetailsDrawer(status)}
          showProgressSkeleton
        />
        <OrderDetailsDrawer
          drawerProps={{
            show: showOrderDetailsDrawer,
            handleClose: () => {
              setShowOrderDetailsDrawer(false);
              navigate(PAGE_URLS.CROSS_DOCK);
            },
          }}
          isInternational={isInternational}
          key={key}
        />
      </>
    );
  }
};
