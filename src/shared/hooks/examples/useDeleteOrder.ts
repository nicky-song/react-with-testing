/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  async function deleteOrder(orderNumber: number): Promise<boolean> {
    const resp = await axios.delete(`/api/orders/${orderNumber}`);
    return resp.data;
  }

  const { mutate } = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['orders']);
    },
  });

  return mutate;
};
