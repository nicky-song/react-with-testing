/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useMutation } from '@tanstack/react-query';
import { orderService } from '@ofm/services/orderService';
import { CreditOrderRequest } from '@ofm/types/types';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';
import { useTranslation } from 'react-i18next';

export const useCreateCreditOrder = () => {
  const { t } = useTranslation();
  const { handleNotification } = useNotificationHandler();

  const {
    mutate: mutateCreateCreditOrder,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (params: { orderId: string; creditOrderRequest: CreditOrderRequest }) => {
      return orderService.createCreditOrder(params.orderId, params.creditOrderRequest);
    },
    onError: () => {
      handleNotification(NOTIFICATION_TYPES.ERROR, t('Errors.Action.CreditOrder'));
    },
  });

  return { mutateCreateCreditOrder, isLoading, isError };
};
