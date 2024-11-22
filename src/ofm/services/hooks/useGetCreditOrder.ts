/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useQuery } from '@tanstack/react-query';
import { orderService } from '@ofm/services/orderService';

export const useGetCreditOrder = (orderId: string, isEnabled = true) => {
  const {
    data: creditOrderData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['creditOrder', orderId],
    queryFn: () => orderService.getCreditOrderById(orderId),
    enabled: isEnabled,
  });

  return { creditOrderData, isLoading, isError };
};
