/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { orderService } from '@ofm/services/orderService';
import { useMutation } from '@tanstack/react-query';
import { WillCallBodyType } from '@ofm/types/types';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useCreateWillCall = () => {
  const { t } = useTranslation();
  const [currentItems, setCurrentItems] = useState<number>(0);
  const [storeNumber, setStoreNumber] = useState<string>('');

  const { handleNotification } = useNotificationHandler();

  const {
    mutate: mutateCreateWillCall,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (willCallBody: WillCallBodyType) => {
      setCurrentItems(willCallBody.items.length);
      setStoreNumber(willCallBody.storeNumber);
      return orderService.createWillCall(willCallBody);
    },
    onSuccess: () => {
      handleNotification(
        NOTIFICATION_TYPES.SUCCESS,
        t('Success.Action.WillCall.Title'),
        t('Success.Action.WillCall.ItemsSent', { count: currentItems, store: storeNumber })
      );
      setCurrentItems(0);
    },
    onError: () => {
      handleNotification(NOTIFICATION_TYPES.ERROR, t('Errors.Action.WillCall'));
    },
  });

  return { mutateCreateWillCall, isLoading, isError };
};
