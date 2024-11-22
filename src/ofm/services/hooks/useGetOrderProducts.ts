/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { orderService } from '@ofm/services/orderService';
import { useQuery } from '@tanstack/react-query';
import { GetOrderProductsParams } from '@ofm/types/types';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useGetOrderProducts = (options: GetOrderProductsParams, isEnabled = true) => {
  const { t } = useTranslation();
  const { handleNotification } = useNotificationHandler();

  const {
    data: orderProductsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['orderProducts', options],
    queryFn: () => orderService.getProducts(options),
    enabled: isEnabled,
  });

  useEffect(() => {
    if (isEnabled && isError) {
      handleNotification(NOTIFICATION_TYPES.ERROR, t('Errors.Products.Description'));
    }
  }, [isError, isEnabled, handleNotification, t]);

  return { orderProductsData, isLoading, isError, refetch };
};
