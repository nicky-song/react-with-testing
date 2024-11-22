/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { billOrderProcessesService } from '@ofm/services/billOrderProcessesService';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export const usePatchBillOrderProcess = () => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();
  const { handleNotification } = useNotificationHandler();

  const {
    mutate: mutatePatchBillRequest,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (requestId: string) => billOrderProcessesService.patchUserNotified(requestId),
    onSuccess: () => queryClient.invalidateQueries(['bill-order-processes']),
    onError: () => {
      handleNotification(NOTIFICATION_TYPES.ERROR, t('Errors.Action.BillingNotification'));
    },
  });

  return { mutatePatchBillRequest, isLoading, isError };
};
