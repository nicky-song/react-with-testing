/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { OrderStatus } from '@ofm/constants/constants';
import { orderService } from '@ofm/services/orderService';
import { useQuery } from '@tanstack/react-query';
import { GetOrdersParams, OrderDetailsType } from '@ofm/types/types';

const getCountForOrderType = (orders: OrderDetailsType[], orderType: OrderStatus) => {
  return orders.filter((order) => order.status === orderType).length;
};

export const useGetOrders = (options?: GetOrdersParams, isEnabled = true) => {
  const {
    data: ordersData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['orders', options],
    queryFn: () => orderService.getOrders(options),
    enabled: isEnabled,
  });

  const numOfOrdersPerStatus = {
    [OrderStatus.READY_TO_REQUEST]: 0,
    [OrderStatus.READY_TO_BILL]: 0,
    [OrderStatus.ERROR]: 0,
    [OrderStatus.SENT_TO_OUTBOUND]: 0,
  };

  if (ordersData?.results.length) {
    const orders = ordersData.results;

    numOfOrdersPerStatus[OrderStatus.READY_TO_REQUEST] = getCountForOrderType(
      orders,
      OrderStatus.READY_TO_REQUEST
    );

    numOfOrdersPerStatus[OrderStatus.READY_TO_BILL] = getCountForOrderType(
      orders,
      OrderStatus.READY_TO_BILL
    );

    numOfOrdersPerStatus[OrderStatus.ERROR] = getCountForOrderType(orders, OrderStatus.ERROR);

    numOfOrdersPerStatus[OrderStatus.SENT_TO_OUTBOUND] = getCountForOrderType(
      orders,
      OrderStatus.SENT_TO_OUTBOUND
    );
  }

  return { ordersData, isLoading, isError, numOfOrdersPerStatus, refetch };
};
