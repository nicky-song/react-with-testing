/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import * as T from './AuthInterceptor.types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { accessTokenAtom, refreshTokenAtom } from '@shared/atoms/token/tokenAtoms';
import { useSessionStorage } from '@shared/hooks/useStorage';
import { generatePKCE } from '@shared/utils/pkceUtils';
import { authService } from '@ofm/services/authService';
import { useLocation } from 'react-router-dom';
import { useRefreshToken } from '@shared/hooks/useRefreshToken';
import { apiService } from '@ofm/services/apiService';
import { LogError } from '@ofm/classes/LogError';
import { formatErrorLog } from '@ofm/utils/utils';
import dayjs from 'dayjs';
import { asyncUserAtom } from '@shared/atoms/user/userAtom';
import { useRevokeTokens } from '@shared/hooks/useRevokeTokens';
import { ErrorLogType } from '@ofm/constants/constants';
import {
  EXPIRATION_MINUTES_BEFORE_REFRESH,
  EXPIRATION_INTERVAL_DURATION,
  IDLE_MINUTES_BEFORE_LOGOUT,
  IDLE_INTERVAL_DURATION,
} from '@shared/constants/constants';
import { ROUTES } from '@shared/constants/routes';
import { SESSION_CODE_VERIFIER } from '@shared/constants/storageConstants';

export const AuthInterceptor = ({ children }: T.Props) => {
  /* Atoms */
  const [user, setUser] = useAtom(asyncUserAtom);
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);

  /* State variables */
  const [expirationDate, setExpirationDate] = useState<dayjs.Dayjs>();
  const [idleDate, setIdleDate] = useState<dayjs.Dayjs>(dayjs());
  const [, setCodeVerifier] = useSessionStorage(SESSION_CODE_VERIFIER);

  /* Constants */
  const location = useLocation();
  const isLoggingIn = useRef(false);

  /* Queries */
  const { mutateRefreshTokens } = useRefreshToken(setAccessToken, setRefreshToken, setUser);
  const { mutateRevokeTokens } = useRevokeTokens();

  /* Functions */
  const handleIdleLogout = useCallback(async () => {
    mutateRevokeTokens(
      { accessToken, refreshToken },
      {
        onSuccess: async () => {
          setAccessToken();
          const { codeChallenge, codeVerifier } = await generatePKCE();
          setCodeVerifier(codeVerifier);
          window.location.href = authService.getAuthLink(codeChallenge, true);
        },
      }
    );
  }, [accessToken, mutateRevokeTokens, refreshToken, setAccessToken, setCodeVerifier]);

  // Initiates the authentication code using the PKCE flow
  const handleAuth = useCallback(async () => {
    const challenge = await generatePKCE();
    const codeChallenge = challenge.codeChallenge;
    setCodeVerifier(challenge.codeVerifier);

    window.location.href = authService.getAuthLink(codeChallenge);
  }, [setCodeVerifier]);

  const handleRefresh = useCallback(() => {
    if (refreshToken) {
      return mutateRefreshTokens(refreshToken, {
        onSettled: () => (isLoggingIn.current = false),
      });
    }
  }, [mutateRefreshTokens, refreshToken]);

  const handleLogin = useCallback(async () => {
    isLoggingIn.current = true;
    if (accessToken) {
      try {
        await setUser(accessToken);
        isLoggingIn.current = false;
      } catch (err) {
        // Refresh the token in case it expires
        setAccessToken(undefined);
        handleRefresh();
      }
    } else {
      handleRefresh();
    }
  }, [accessToken, handleRefresh, setAccessToken, setUser]);

  /* Hooks */
  // Initiates the authentication flow in case it is not already in progress
  useEffect(() => {
    if (!location.pathname.includes(ROUTES.AUTH) && !refreshToken) {
      handleAuth();
    }
  }, [handleAuth, location.pathname, refreshToken]);

  // Loads the user's data if it has not been loaded already
  useEffect(() => {
    // Makes sure to only allow one login/refresh process at a time
    if (isLoggingIn.current) {
      return;
    }
    if (!user) {
      handleLogin();
    }
  }, [handleLogin, user]);

  // Refresh access token when the expiration date is in 3 minutes or less
  useEffect(() => {
    const interval = setInterval(() => {
      if (expirationDate) {
        const expirationMinutes = expirationDate.diff(dayjs(), 'minute');
        if (expirationMinutes <= EXPIRATION_MINUTES_BEFORE_REFRESH) {
          handleRefresh();
        }
      }
    }, EXPIRATION_INTERVAL_DURATION);

    return () => clearInterval(interval);
  }, [expirationDate, handleRefresh]);

  // Logout the user when no API requests have been made in 2 hours or more
  useEffect(() => {
    const interval = setInterval(() => {
      const idleMinutes = dayjs().diff(idleDate, 'minute');
      if (idleMinutes >= IDLE_MINUTES_BEFORE_LOGOUT) {
        handleIdleLogout();
        setIdleDate(dayjs());
      }
    }, IDLE_INTERVAL_DURATION);

    return () => clearInterval(interval);
  }, [handleIdleLogout, idleDate]);

  // Handles the token expiration date and sets the token inside the request headers
  useMemo(() => {
    if (accessToken) {
      const base64Url = accessToken.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      try {
        const expiresAt: number = JSON.parse(window.atob(base64)).exp;
        setExpirationDate(dayjs(expiresAt * 1000));
      } catch (err) {
        setExpirationDate(undefined);
      }
    }

    apiService.interceptors.request.clear();

    apiService.interceptors.request.use(
      (config) => {
        setIdleDate(dayjs());
        if (accessToken && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        throw new LogError(formatErrorLog(ErrorLogType.AXIOS, error, error?.response?.status));
      }
    );

    apiService.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          setUser(undefined);
        }
        throw new LogError(formatErrorLog(ErrorLogType.AXIOS, error, error?.response?.status));
      }
    );
  }, [accessToken, setUser]);

  if (user || location.pathname.includes(ROUTES.AUTH)) {
    return children;
  } else {
    return undefined;
  }
};
