/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useQuery } from '@tanstack/react-query';
import { orderService } from '@ofm/services/orderService';
import { OrderType } from '@ofm/constants/constants';

export const useGetOrderById = (
  params: { orderId: string; orderType: OrderType },
  isEnabled = true
) => {
  const {
    data: orderData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['order', params],
    queryFn: () => orderService.getOrderById(params.orderId, params.orderType),
    enabled: isEnabled,
  });

  return { orderData, isLoading, isError };
};
