/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { accessTokenAtom, refreshTokenAtom } from '@shared/atoms/token/tokenAtoms';
import { asyncUserAtom } from '@shared/atoms/user/userAtom';
import { IconError, View } from '@az/starc-ui';
import { PAGE_URLS } from '@shared/constants/routes';
import { SESSION_CODE_VERIFIER } from '@shared/constants/storageConstants';
import { useSessionStorage } from '@shared/hooks/useStorage';
import { authService } from '@ofm/services/authService';
import { useRevokeTokens } from '@shared/hooks/useRevokeTokens';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { EmptyPage } from '@shared/components/EmptyPage/EmptyPage';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';

export const Auth = () => {
  /* Atoms */
  const [, setUser] = useAtom(asyncUserAtom);
  const [, setAccessToken] = useAtom(accessTokenAtom);
  const [, setRefreshToken] = useAtom(refreshTokenAtom);

  /* State variables */
  const [searchParams, setSearchParams] = useSearchParams();
  const [codeVerifier, setCodeVerifier] = useSessionStorage<string>(SESSION_CODE_VERIFIER);
  const [result, setResult] = useState<string>('loading');

  /* Constants */
  const { t } = useTranslation();
  const navigate = useNavigate();
  const authCode = searchParams.get('code');
  const isFetching = useRef(false);

  /* Queries */
  const { mutateRevokeTokens } = useRevokeTokens();

  /* Functions */
  const exchangeCode = useCallback(
    async (code: string) => {
      if (codeVerifier) {
        isFetching.current = true;
        try {
          const response = await authService.exchangeCode(code, codeVerifier);
          setCodeVerifier(undefined);
          if (response) {
            const { refresh_token, access_token } = response;
            setRefreshToken(refresh_token);
            setAccessToken(access_token);
            try {
              await setUser(access_token);
              setResult('success');
            } catch (error) {
              mutateRevokeTokens(
                { refreshToken: refresh_token, accessToken: access_token },
                {
                  onSettled: () => {
                    setAccessToken();
                    setRefreshToken();
                    setResult('error');
                  },
                }
              );
            }
          }
        } catch (err) {
          setResult('error');
        }
      } else {
        setResult('error');
      }
    },
    [codeVerifier, setCodeVerifier, setRefreshToken, setAccessToken, setUser, mutateRevokeTokens]
  );

  /* Hooks */
  /**
   * Initiates the code exchange when the authorization code can be extracted
   * from the search parameters
   */
  useEffect(() => {
    setSearchParams(undefined);
    // Makes sure an authentication process is not already running
    if (isFetching.current) {
      return;
    } else if (authCode) {
      exchangeCode(authCode);
    } else {
      navigate(PAGE_URLS.HOME);
    }
  }, [authCode, exchangeCode, navigate, setSearchParams]);

  if (result === 'loading') {
    return <View />;
  } else if (result === 'error') {
    return (
      <View direction="column" justify="center" align="center" height="100%" width="100%">
        <EmptyPage
          title={t('Auth.ErrorLogin.Subtitle')}
          description={t('Auth.ErrorLogin.Text')}
          buttonText={t('Auth.ErrorLogin.Link')}
          onClick={() => navigate(PAGE_URLS.HOME)}
          icon={IconError}
        />
      </View>
    );
  } else {
    return <Navigate to={PAGE_URLS.HOME} />;
  }
};
