/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { orderService } from '@ofm/services/orderService';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FlaggedItem } from '@ofm/types/types';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';
import { useTranslation } from 'react-i18next';

type VerifyOrderVariables = {
  orderId: string;
  verifiedProducts: FlaggedItem[];
};

export const useVerifyOrder = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { handleNotification } = useNotificationHandler();

  const {
    mutate: mutateVerifyOrder,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (values: VerifyOrderVariables) =>
      orderService.verifyFlaggedOrder(values.orderId, values.verifiedProducts),
    onSuccess: () => {
      queryClient.invalidateQueries(['orderProducts']);
      handleNotification(NOTIFICATION_TYPES.SUCCESS, t('Success.Action.VerifyOrder'));
    },
    onError: () => {
      handleNotification(NOTIFICATION_TYPES.ERROR, t('Errors.Action.VerifyOrder'));
    },
  });

  return { mutateVerifyOrder, isLoading, isError };
};
