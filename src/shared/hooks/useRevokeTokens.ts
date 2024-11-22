/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { authService } from '@ofm/services/authService';
import { useMutation } from '@tanstack/react-query';

type RevokeParamsType = { accessToken?: string; refreshToken?: string };

export const useRevokeTokens = () => {
  const {
    mutateAsync: mutateRevokeTokens,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: async (params: RevokeParamsType) => {
      const { accessToken, refreshToken } = params;
      if (accessToken) {
        await authService.revoke(accessToken, 'access_token');
      }
      if (refreshToken) {
        await authService.revoke(refreshToken);
      }
    },
  });

  return { mutateRevokeTokens, isLoading, isError };
};
