/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { orderService } from '@ofm/services/orderService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OrderActivity } from '@ofm/types/types';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';
import { useTranslation } from 'react-i18next';

export const useCreateOrderActivity = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { handleNotification } = useNotificationHandler();

  const {
    mutate: mutateCreateOrderActivity,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (orderActivityDetails: OrderActivity) => {
      return orderService.postOrderActivity(
        orderActivityDetails.orderId,
        orderActivityDetails.activity
      );
    },
    onSuccess: (_data, _variables) => {
      queryClient.invalidateQueries(['order', _variables.orderId]);
      handleNotification(NOTIFICATION_TYPES.SUCCESS, t('Success.Action.Activity'));
    },
    onError: () => {
      handleNotification(NOTIFICATION_TYPES.ERROR, t('Errors.Action.Activity'));
    },
  });

  return { mutateCreateOrderActivity, isLoading, isError };
};
