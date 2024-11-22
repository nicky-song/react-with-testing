/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { storeService } from '@ofm/services/storeService';
import { useMutation } from '@tanstack/react-query';
import { PostStoreStatus } from '@ofm/types/types';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';
import { useTranslation } from 'react-i18next';

export const usePostStoreStatus = () => {
  const { t } = useTranslation();
  const { handleNotification } = useNotificationHandler();

  const {
    mutate: mutateStoreStatus,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: async (options: PostStoreStatus) => {
      return storeService.postStoreStatus(options);
    },
    onSuccess: () => {
      handleNotification(NOTIFICATION_TYPES.SUCCESS, t('Success.Action.StoreStatus'));
    },
    onError: () => {
      handleNotification(NOTIFICATION_TYPES.ERROR, t('Errors.Action.StoreStatus'));
    },
  });

  return { mutateStoreStatus, isLoading, isError };
};
