/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { orderService } from '@ofm/services/orderService';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type DeleteOrderProductsVariables = {
  orderId: string;
  message: string;
  productIds: string[];
};

export const useDeleteOrderProducts = () => {
  const [currentProductIds, setCurrentProductIds] = useState<string[] | null>(null);

  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { handleNotification } = useNotificationHandler();

  const {
    mutate: mutateDeleteOrderProducts,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (values: DeleteOrderProductsVariables) => {
      setCurrentProductIds(values.productIds);
      return orderService.deleteOrderProducts(values.orderId, values.message, values.productIds);
    },
    onSuccess: () => {
      setCurrentProductIds(null);
      queryClient.invalidateQueries(['orderProducts']);

      handleNotification(
        NOTIFICATION_TYPES.SUCCESS,
        t('Success.Action.DeleteOrderProducts', { count: currentProductIds?.length })
      );
    },
    onError: () => {
      handleNotification(
        NOTIFICATION_TYPES.ERROR,
        t('Errors.Action.DeleteOrderProducts', { count: currentProductIds?.length })
      );
    },
  });

  return { mutateDeleteOrderProducts, isLoading, isError };
};
