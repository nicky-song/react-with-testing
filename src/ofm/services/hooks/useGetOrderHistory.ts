/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { orderService } from '@ofm/services/orderService';
import { useQuery } from '@tanstack/react-query';
import { GetOrderHistoryParams } from '@ofm/types/types';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { useEffect } from 'react';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';
import { useTranslation } from 'react-i18next';

export const useGetOrderHistory = (options: GetOrderHistoryParams, isEnabled = true) => {
  const { t } = useTranslation();
  const { handleNotification } = useNotificationHandler();

  const {
    data: orderHistoryData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['orderHistory', options],
    queryFn: () => orderService.getOrderHistory(options),
    enabled: isEnabled,
  });

  useEffect(() => {
    if (isError) {
      handleNotification(
        NOTIFICATION_TYPES.ERROR,
        t('Errors.Service.Description', { service: t('Services.OrderHistory') })
      );
    }
  }, [isError, handleNotification, t]);

  return { orderHistoryData, isLoading, isError, refetch };
};
