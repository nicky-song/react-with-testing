/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { orderService } from '@ofm/services/orderService';
import { useMutation } from '@tanstack/react-query';
import { OrderSummaryBody } from '@ofm/types/types';

export const usePostOrderSummary = () => {
  const {
    mutate: mutatePostOrderSummary,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (orderSummaryBody: OrderSummaryBody) => {
      return orderService.postOrderSummary(orderSummaryBody);
    },
  });

  return { mutatePostOrderSummary, isLoading, isError };
};
