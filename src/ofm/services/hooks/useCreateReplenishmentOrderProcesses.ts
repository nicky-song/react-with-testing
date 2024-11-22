/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { replenishmentOrderProcessesService } from '@ofm/services/replenishmentOrderProcessesService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReplenishmentOrderRequest } from '../../types/types';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useCreateReplenishmentOrderProcesses = () => {
  const { t } = useTranslation();
  const [currentOrderIds, setCurrentOrderIds] = useState<string[] | null>(null);

  const queryClient = useQueryClient();

  const { handleNotification } = useNotificationHandler();

  const {
    mutate: mutateCreateReplenishmentOrder,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (orderDetails: ReplenishmentOrderRequest) => {
      setCurrentOrderIds(orderDetails.stores);
      return replenishmentOrderProcessesService.createReplenishmentOrderProcess(orderDetails);
    },
    onSuccess: () => {
      setCurrentOrderIds(null);
      queryClient.invalidateQueries(['createReplenishmentOrderProcess']);

      handleNotification(
        NOTIFICATION_TYPES.SUCCESS,
        t('Success.Action.RequestingOrders', { count: currentOrderIds?.length })
      );
    },
    onError: () => {
      handleNotification(
        NOTIFICATION_TYPES.ERROR,
        t('Errors.Action.RequestingOrders', { count: currentOrderIds?.length })
      );
    },
  });

  return { mutateCreateReplenishmentOrder, isLoading, isError };
};
