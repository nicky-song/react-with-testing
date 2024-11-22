/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { orderService } from '@ofm/services/orderService';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

type DeleteOrderVariables = {
  orderId: string;
  message: string;
};

export const useDeleteOrder = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { handleNotification } = useNotificationHandler();

  const {
    mutate: mutateDeleteOrder,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (values: DeleteOrderVariables) =>
      orderService.deleteOrder(values.orderId, values.message),
    onSuccess: () => {
      queryClient.invalidateQueries(['order']);

      handleNotification(NOTIFICATION_TYPES.SUCCESS, t('Success.Action.DeleteOrder'));
    },
    onError: () => {
      handleNotification(NOTIFICATION_TYPES.ERROR, t('Errors.Action.DeleteOrder'));
    },
  });

  return { mutateDeleteOrder, isLoading, isError };
};
