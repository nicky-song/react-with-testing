/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ItemLayout } from '@shared/components/ItemLayout/ItemLayout';
import { OrderDetailsDrawer } from '@ofm/components/OrderDetailsDrawer/OrderDetailsDrawer';
import { OrderStatus, OrderType } from '@ofm/constants/constants';
import {
  filterItemsBySelection,
  mapRequestToProgressBar,
  toggleAllSelectedItems,
} from '@ofm/utils/utils';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OrderDetailsType, SetChildErrorType } from '@ofm/types/types';
import { useGetBillOrderProcesses } from '@ofm/services/hooks/useGetBillOrderProcesses';
import { useAtom } from 'jotai';
import { warehouseAtom } from '@ofm/atoms/warehouse/warehouseAtom';
import { useCreateBillOrderProcesses } from '@ofm/services/hooks/useCreateBillOrderProcesses';
import { useGetOrdersByStatus } from '@ofm/services/hooks/useGetOrdersByStatus';
import { useQueryClient } from '@tanstack/react-query';
import { orderDetailsAtom } from '@ofm/atoms/orderDetails/orderDetailsAtom';
import { useInternationalDC } from '@shared/hooks/useInternationalDC';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import { usePageErrorHandler } from '@shared/hooks/usePageErrorHandler';
import { PAGE_ERRORS } from '@shared/constants/constants';
import { PAGE_URLS, ROUTES } from '@shared/constants/routes';

export const ReadyToBill = () => {
  const { waveId, setChildError } = useOutletContext<{
    waveId?: string;
    setChildError?: SetChildErrorType;
  }>();

  /* Atoms */
  const [warehouse] = useAtom(warehouseAtom);
  const [, setOrderDetails] = useAtom(orderDetailsAtom);

  /* State variables */
  const [showOrderDetailsDrawer, setShowOrderDetailsDrawer] = useState<boolean>(false);
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [readyToBillOrders, setReadyToBillOrders] = useState<OrderDetailsType[]>([]);
  const [inProgressOrderIds, setInProgressOrderIds] = useState<string[]>([]);

  /* Constants */
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { isInternational, key } = useInternationalDC({ warehouse });
  // const { handleNotification } = useNotificationHandler();
  const navigate = useNavigate();
  const { orderId } = useParams();

  /* Queries */
  const {
    orders,
    isLoading: isOrderLoading,
    isError: isOrderError,
  } = useGetOrdersByStatus([OrderStatus.READY_TO_BILL]);

  const {
    billsData,
    isLoading: isBillLoading,
    isError: isBillError,
  } = useGetBillOrderProcesses(waveId || '', !!waveId);

  // const { mutatePatchBillRequest } = usePatchBillOrderProcess();
  const { mutateCreateBillOrder, isLoading: isBilling } = useCreateBillOrderProcesses();

  /* Functions */
  const onOrderSelect = (id: string) => {
    setSelectedOrderIds(filterItemsBySelection(id, selectedOrderIds));
  };

  const selectAllHandler = () => {
    const orderIds = readyToBillOrders.map((order) => order.id);
    const totalOrdersCount = readyToBillOrders.length;

    if (orderIds) {
      setSelectedOrderIds(
        toggleAllSelectedItems(selectedOrderIds, totalOrdersCount, orderIds, inProgressOrderIds)
      );
    }
  };

  const billOrders = async () => {
    if (selectedOrderIds) {
      mutateCreateBillOrder(selectedOrderIds, {
        onSuccess: () => {
          queryClient.invalidateQueries(['orders']);
          setInProgressOrderIds([...inProgressOrderIds, ...selectedOrderIds]);
          setSelectedOrderIds([]);
        },
      });
    }
  };

  /* Hooks */
  const selectableOrderCount = useMemo(() => {
    return readyToBillOrders.length - inProgressOrderIds.length;
  }, [readyToBillOrders, inProgressOrderIds]);

  usePageErrorHandler(
    [{ name: PAGE_ERRORS.ORDERS, value: isOrderError || isBillError }],
    setChildError
  );

  // Sets the orders currently in progress
  useEffect(() => {
    if (readyToBillOrders.length) {
      setInProgressOrderIds(
        readyToBillOrders.filter((order) => order.isInProgress)?.map((order) => order.id)
      );
    }
  }, [readyToBillOrders]);

  // Sets the ready to bill orders based on the request timeout
  useEffect(() => {
    if (orders?.length) {
      setReadyToBillOrders(orders?.filter((order) => order.status === OrderStatus.READY_TO_BILL));
    }
  }, [orders]);

  // Notifies the user once the progress bar is complete
  // useEffect(() => {
  //   if (!isBillLoading && !isBillError && billsData && billsData.length > 0) {
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
  //   queryClient,
  //   mutatePatchBillRequest,
  //   handleNotification,
  //   t,
  // ]);

  useEffect(() => {
    if (orderId) {
      setOrderDetails({ orderId: orderId.toString(), orderType: OrderType.REPLENISHMENT });
      setShowOrderDetailsDrawer(true);
    }
  }, [orderId, setOrderDetails]);

  return (
    <>
      <ItemLayout
        items={readyToBillOrders}
        isLoading={isOrderLoading || isBillLoading}
        onItemSelect={onOrderSelect}
        selectedItems={selectedOrderIds}
        progress={billsData ? [mapRequestToProgressBar(billsData)] : []}
        itemsInProgress={inProgressOrderIds}
        buttons={[
          {
            title:
              selectedOrderIds.length && selectedOrderIds.length === selectableOrderCount
                ? t('DeselectAll')
                : t('SelectAll'),
            clickHandler: selectAllHandler,
            isDisabled:
              inProgressOrderIds.length === readyToBillOrders.length ||
              readyToBillOrders.length === 0,
            variant: 'secondary',
          },
          {
            title: t('BillOrders', { count: selectedOrderIds.length }),
            clickHandler: billOrders,
            isDisabled: !selectedOrderIds.length && !isBilling,
            loading: isBilling,
          },
        ]}
        setItemId={(id) => {
          setOrderDetails({ orderId: id.toString(), orderType: OrderType.REPLENISHMENT });
          navigate(
            `${PAGE_URLS.WAVE_DETAILS(waveId || '')}/${ROUTES.READY_TO_BILL}/${
              ROUTES.ORDERS
            }/${id.toString()}`
          );
        }}
        setShowOrderDetailsDrawer={setShowOrderDetailsDrawer}
        emptySubtitle={t('Empty.Store.Subtitle')}
        emptyText={t('Empty.Store.Text', { orderType: t('OrderStatus.ReadyToBill') })}
      />
      <OrderDetailsDrawer
        drawerProps={{
          show: showOrderDetailsDrawer,
          handleClose: () => {
            // eslint-disable-next-line no-console
            console.log('Drawer close');
            setShowOrderDetailsDrawer(false);
            navigate(`${PAGE_URLS.WAVE_DETAILS(waveId || '')}/${ROUTES.READY_TO_BILL}`);
          },
        }}
        isInternational={isInternational}
        key={key}
      />
    </>
  );
};
