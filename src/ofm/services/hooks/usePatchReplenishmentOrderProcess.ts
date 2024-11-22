/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { replenishmentOrderProcessesService } from '@ofm/services/replenishmentOrderProcessesService';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export const usePatchReplenishmentOrderProcess = () => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();
  const { handleNotification } = useNotificationHandler();

  const {
    mutate: mutatePatchReplenishmentRequest,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (requestId: string) =>
      replenishmentOrderProcessesService.patchUserNotified(requestId),
    onSuccess: () => queryClient.invalidateQueries(['replenishment-order-processes']),
    onError: () => {
      handleNotification(NOTIFICATION_TYPES.ERROR, t('Errors.Action.RequestingNotification'));
    },
  });

  return { mutatePatchReplenishmentRequest, isLoading, isError };
};
