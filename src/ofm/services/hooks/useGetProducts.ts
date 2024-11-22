/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { productService } from '@ofm/services/productService';
import { useQuery } from '@tanstack/react-query';
import { GetProductsParams } from '@ofm/types/types';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { useEffect } from 'react';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';
import { useTranslation } from 'react-i18next';

export const useGetProducts = (options: GetProductsParams, isEnabled = true) => {
  const { t } = useTranslation();
  const { handleNotification } = useNotificationHandler();

  const {
    data: productsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['products', options],
    queryFn: () => productService.getProducts(options),
    enabled: isEnabled,
  });

  useEffect(() => {
    if (isError) {
      handleNotification(NOTIFICATION_TYPES.ERROR, t('Errors.Products.Description'));
    }
  }, [isError, handleNotification, t]);

  return { productsData, isLoading, isError, refetch };
};
