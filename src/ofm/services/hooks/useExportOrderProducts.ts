/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { exportService } from '@ofm/services/exportService';
import { useQuery } from '@tanstack/react-query';
import { GetOrderProductsParams } from '@ofm/types/types';
import { useEffect, useState } from 'react';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';
import { useTranslation } from 'react-i18next';

export const useExportOrderProducts = (options: GetOrderProductsParams) => {
  const [handleAction, setHandleAction] = useState<boolean>(false);

  const { t } = useTranslation();
  const { handleNotification } = useNotificationHandler();

  const {
    data: orderProductsCsvData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['export-order-products', options],
    queryFn: () => {
      setHandleAction(true);
      return exportService.getProducts(options);
    },
    enabled: false,
  });

  useEffect(() => {
    if (isError && handleAction) {
      handleNotification(
        NOTIFICATION_TYPES.ERROR,
        t('Errors.Action.Export', { item: t('Services.Order') })
      );
      setHandleAction(false);
    }
  }, [isError, handleAction, handleNotification, t]);

  return { orderProductsCsvData, isLoading, isError, refetch };
};
