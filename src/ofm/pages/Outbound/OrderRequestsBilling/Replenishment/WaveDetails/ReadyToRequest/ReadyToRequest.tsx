/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { warehouseAtom } from '@ofm/atoms/warehouse/warehouseAtom';
import { ItemLayout } from '@shared/components/ItemLayout/ItemLayout';
import { OrderDetailsDrawer } from '@ofm/components/OrderDetailsDrawer/OrderDetailsDrawer';
import {
  ModalActionProp,
  ModalActions,
} from '@ofm/components/OrderDetailsDrawer/OrderDetailsDrawer.types';
import { OrderDetailsDrawerModal } from '@ofm/components/OrderDetailsDrawer/OrderDetailsDrawerModal';
import { OrderStatus, OrderType } from '@ofm/constants/constants';
import { useInternationalDC } from '@shared/hooks/useInternationalDC';
import { useCreateReplenishmentOrderProcesses } from '@ofm/services/hooks/useCreateReplenishmentOrderProcesses';
import { useGetReplenishmentOrderProcesses } from '@ofm/services/hooks/useGetReplenishmentOrderProcesses';
import {
  filterItemsBySelection,
  mapRequestToProgressBar,
  toggleAllSelectedItems,
} from '@ofm/utils/utils';
import { useAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import { OrderDetailsType, RequestSummaryType, SetChildErrorType } from '@ofm/types/types';
import { useGetOrdersByStatus } from '@ofm/services/hooks/useGetOrdersByStatus';
import { orderDetailsAtom } from '@ofm/atoms/orderDetails/orderDetailsAtom';
import { useQueryClient } from '@tanstack/react-query';
import { usePageErrorHandler } from '@shared/hooks/usePageErrorHandler';
import { PAGE_ERRORS } from '@shared/constants/constants';
import dayjs from 'dayjs';
import { PAGE_URLS, ROUTES } from '@shared/constants/routes';

export const ReadyToRequest = () => {
  const { t } = useTranslation();
  const { waveId, waveDueDate, setChildError } = useOutletContext<{
    waveId?: string;
    waveDueDate?: Date;
    setChildError?: SetChildErrorType;
  }>();

  /* Atoms */
  const [warehouse] = useAtom(warehouseAtom);
  const [, setOrderDetails] = useAtom(orderDetailsAtom);

  /* State variables */
  const [showOrderDetailsDrawer, setShowOrderDetailsDrawer] = useState<boolean>(false);
  const [inProgressOrderIds, setInProgressOrderIds] = useState<string[]>([]);
  const [modalData, setModalData] = useState<ModalActionProp>(undefined);
  const [requestAheadOrders, setRequestAheadOrders] = useState<OrderDetailsType[]>([]);
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [summary, setSummary] = useState<RequestSummaryType>();

  /* Constants */
  const queryClient = useQueryClient();
  const { isInternational, key } = useInternationalDC({ warehouse });
  const navigate = useNavigate();
  const { orderId } = useParams();

  /* Queries */
  const {
    replenishmentsData,
    isError: isRepError,
    isLoading: isRepLoading,
  } = useGetReplenishmentOrderProcesses(waveId ?? '', !!waveId);

  const {
    orders,
    isLoading: isOrderLoading,
    isError: isOrderError,
  } = useGetOrdersByStatus([OrderStatus.READY_TO_REQUEST, OrderStatus.REQUESTED]);

  const { mutateCreateReplenishmentOrder } = useCreateReplenishmentOrderProcesses();

  /* Functions */
  const openModal = (action: ModalActionProp, orders: OrderDetailsType[]) => {
    setModalData(action);
    setRequestAheadOrders(orders);
  };

  const closeModal = () => {
    setModalData(undefined);
  };

  const onOrderSelect = (id: string) => {
    setSelectedOrderIds(filterItemsBySelection(id, selectedOrderIds));
  };

  const selectAllHandler = () => {
    if (orders) {
      const orderIds = orders.map((order) => order.id);
      const totalOrdersCount = orders.length;
      if (orderIds) {
        setSelectedOrderIds(
          toggleAllSelectedItems(selectedOrderIds, totalOrdersCount, orderIds, inProgressOrderIds)
        );
      }
    }
  };

  const handleRequestStore = () => {
    const currentDate = dayjs(new Date());

    // In case we have more then one request ahead, open the modal and trigger the action for many
    if (waveDueDate && dayjs(waveDueDate).isAfter(currentDate)) {
      if (requestAheadOrders.length > 0) {
        openModal(ModalActions.REQUEST_MANY, requestAheadOrders);
        return;
      }
    }

    // In case we only have one request ahead, create the replenishment
    if (requestAheadOrders.length > 0 && waveId) {
      mutateCreateReplenishmentOrder(
        {
          stores: requestAheadOrders.map((order) => order.storeNumber),
          waveId,
        },
        {
          onSuccess: () => {
            setInProgressOrderIds([...inProgressOrderIds, ...selectedOrderIds]);
            queryClient.invalidateQueries(['orders']);
            setSelectedOrderIds([]);
          },
        }
      );
    }
  };

  const requestManyAction = (reasonMessage: string) => {
    setModalData(undefined);

    if (requestAheadOrders && waveId) {
      mutateCreateReplenishmentOrder(
        {
          stores: requestAheadOrders.map((order) => order.storeNumber),
          waveId,
          comment: {
            message: reasonMessage,
          },
        },
        {
          onSuccess: () => {
            setInProgressOrderIds([
              ...inProgressOrderIds,
              ...requestAheadOrders.map((order) => order.storeNumber),
            ]);
            queryClient.invalidateQueries(['orders']);
            setSelectedOrderIds([]);
          },
        }
      );
    }
  };

  /* Hooks */
  const selectableOrderCount = useMemo(() => {
    if (orders) {
      return orders.length - inProgressOrderIds.length;
    }
  }, [orders, inProgressOrderIds]);

  usePageErrorHandler(
    [{ name: PAGE_ERRORS.ORDERS, value: isOrderError || isRepError }],
    setChildError
  );

  // Sets the ready to request orders based on the request timeout
  useEffect(() => {
    orders?.length &&
      setRequestAheadOrders(orders.filter((order) => selectedOrderIds.includes(order.id)));
    orders?.length &&
      setInProgressOrderIds(
        orders?.filter((o) => o.status === OrderStatus.REQUESTED).map((o) => o.id)
      );
  }, [selectedOrderIds, orders]);

  // This will update the summary object every time we fetch the status from the server
  useEffect(() => {
    setSummary(replenishmentsData?.summary);
  }, [replenishmentsData]);

  // If there's a change in summary caused by the previous useEffect, we refetch the orders to reflect the change in the UI
  useEffect(() => {
    queryClient.invalidateQueries(['orders']);
  }, [queryClient, summary]);

  useEffect(() => {
    if (orderId) {
      setOrderDetails({ orderId: orderId.toString(), orderType: OrderType.REPLENISHMENT });
      setShowOrderDetailsDrawer(true);
    }
  }, [orderId, setOrderDetails]);

  return (
    <>
      <ItemLayout
        items={orders}
        isLoading={isRepLoading || isOrderLoading}
        onItemSelect={onOrderSelect}
        selectedItems={selectedOrderIds}
        progress={
          replenishmentsData && replenishmentsData.summary.ordersInProgressCount > 0
            ? [mapRequestToProgressBar(replenishmentsData)]
            : []
        }
        itemsInProgress={inProgressOrderIds}
        buttons={[
          {
            title:
              selectedOrderIds.length && selectedOrderIds.length === selectableOrderCount
                ? t('DeselectAll')
                : t('SelectAll'),
            clickHandler: selectAllHandler,
            isDisabled: inProgressOrderIds.length === orders?.length || orders?.length === 0,
            variant: 'secondary',
          },
          {
            title: t('RequestStores', { count: selectedOrderIds.length }),
            clickHandler: handleRequestStore,
            isDisabled: !selectedOrderIds.length,
          },
        ]}
        setItemId={(id) => {
          setOrderDetails({ orderId: id.toString(), orderType: OrderType.REPLENISHMENT });
          navigate(
            `${PAGE_URLS.WAVE_DETAILS(waveId || '')}/${ROUTES.READY_TO_REQUEST}/${
              ROUTES.ORDERS
            }/${id.toString()}`
          );
        }}
        setShowOrderDetailsDrawer={setShowOrderDetailsDrawer}
        emptySubtitle={t('Empty.Store.Subtitle')}
        emptyText={t('Empty.Store.Text', { orderType: t('OrderStatus.ReadyToRequest') })}
      />
      <OrderDetailsDrawer
        drawerProps={{
          show: showOrderDetailsDrawer,
          handleClose: () => {
            setShowOrderDetailsDrawer(false);
            navigate(`${PAGE_URLS.WAVE_DETAILS(waveId || '')}/${ROUTES.READY_TO_REQUEST}`);
          },
          hasNoItems: true,
        }}
        isInternational={isInternational}
        key={key}
      />
      <OrderDetailsDrawerModal
        action={modalData}
        handleClose={closeModal}
        orders={requestAheadOrders}
        waveDueDate={waveDueDate}
        requestManyAction={requestManyAction}
        flaggedItems={[]}
      />
    </>
  );
};
