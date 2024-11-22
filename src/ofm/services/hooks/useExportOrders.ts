/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { exportService } from '@ofm/services/exportService';
import { useQuery } from '@tanstack/react-query';
import { GetOrdersParams } from '@ofm/types/types';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { useEffect } from 'react';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';
import { useTranslation } from 'react-i18next';

export const useExportOrders = (options: GetOrdersParams) => {
  const { t } = useTranslation();
  const { handleNotification } = useNotificationHandler();

  const {
    data: ordersCsvData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['export-orders', options],
    queryFn: () => exportService.getOrders(options),
    enabled: false,
  });

  useEffect(() => {
    if (isError) {
      handleNotification(
        NOTIFICATION_TYPES.ERROR,
        t('Errors.Action.Export', { item: t('Services.Wave') })
      );
    }
  }, [isError, handleNotification, t]);

  return { ordersCsvData, isLoading, isError, refetch };
};
