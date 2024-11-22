/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { billOrderProcessesService } from '@ofm/services/billOrderProcessesService';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useCreateBillOrderProcesses = () => {
  const [currentOrderIds, setCurrentOrderIds] = useState<string[] | null>(null);
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { handleNotification } = useNotificationHandler();

  const {
    mutate: mutateCreateBillOrder,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (orderIds: string[]) => {
      setCurrentOrderIds(orderIds);
      return billOrderProcessesService.createBillOrderProcess(orderIds);
    },
    onSuccess: () => {
      setCurrentOrderIds(null);
      queryClient.invalidateQueries(['createBillOrderProcess']);

      handleNotification(
        NOTIFICATION_TYPES.SUCCESS,
        t('Success.Action.BillingOrders', { count: currentOrderIds?.length })
      );
    },
    onError: () => {
      handleNotification(
        NOTIFICATION_TYPES.ERROR,
        t('Errors.Action.BillingOrders', { count: currentOrderIds?.length })
      );
    },
  });

  return { mutateCreateBillOrder, isLoading, isError };
};
