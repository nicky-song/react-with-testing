/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { storeService } from '@ofm/services/storeService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { StoreActivity } from '@ofm/types/types';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';
import { useTranslation } from 'react-i18next';

export const useCreateStoreActivity = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { handleNotification } = useNotificationHandler();

  const {
    mutate: mutateCreateStoreActivity,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (storeActivityDetails: StoreActivity) => {
      return storeService.postStoreActivity(
        storeActivityDetails.storeId,
        storeActivityDetails.activity
      );
    },
    onSuccess: (_data, _variables) => {
      queryClient.invalidateQueries(['store', _variables.storeId]);
      handleNotification(NOTIFICATION_TYPES.SUCCESS, t('Success.Action.Activity'));
    },
    onError: () => {
      handleNotification(NOTIFICATION_TYPES.ERROR, t('Errors.Action.Activity'));
    },
  });

  return { mutateCreateStoreActivity, isLoading, isError };
};
