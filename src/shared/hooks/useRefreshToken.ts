/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { authService } from '@ofm/services/authService';
import { useMutation } from '@tanstack/react-query';

type SetType = (token?: string) => Promise<void | boolean>;

export const useRefreshToken = (
  setAccessToken: SetType,
  setRefreshToken: SetType,
  setUser: SetType
) => {
  const {
    mutate: mutateRefreshTokens,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: async (refreshToken: string) => {
      const tokens = await authService.refreshTokens(refreshToken);
      if (tokens) {
        const { access_token, refresh_token } = tokens;
        setAccessToken(access_token);
        if (refresh_token) {
          setRefreshToken(refresh_token);
        }
        await setUser(access_token);
      }
    },
    onError: () => setRefreshToken(undefined),
  });

  return { mutateRefreshTokens, isLoading, isError };
};
