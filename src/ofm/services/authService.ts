/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import {
  PING_CLIENT_ID,
  PING_FEDERATE_RUNTIME_URL,
  PING_REDIRECT_URL,
} from '@shared/constants/environmentConstants';
import { AUTH_ENDPOINTS, PING_URLS } from '@shared/constants/routes';
import { CodeSchema, PartialCodeSchema } from '@ofm/schemas/pingCodeSchema';
import { PingUserSchema } from '@ofm/schemas/pingUserSchema';
import { parseAndLog } from '@ofm/utils/utils';
import axios from 'axios';

const CHALLENGE_METHOD = 'S256';
const SCOPE = 'openid profile azjobinfo order-fulfillment-bff';
const RESPONSE_TYPE = 'code';
const GRANT_TYPE = 'authorization_code';
const TOKEN_GRANT_TYPE = 'refresh_token';

export const pingService = axios.create({
  baseURL: PING_FEDERATE_RUNTIME_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export const authService = {
  getAuthLink: (codeChallenge: string, forceLogin = false) => {
    return `${PING_FEDERATE_RUNTIME_URL}${
      PING_URLS.AUTH_URL
    }?client_id=${PING_CLIENT_ID}&redirect_uri=${PING_REDIRECT_URL}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&code_challenge_method=${CHALLENGE_METHOD}&code_challenge=${codeChallenge}${
      forceLogin ? '&prompt=login' : ''
    }`;
  },
  exchangeCode: async (code: string, codeVerifier: string) => {
    const data = {
      code,
      code_verifier: codeVerifier,
      client_id: PING_CLIENT_ID,
      grant_type: GRANT_TYPE,
      redirect_uri: PING_REDIRECT_URL,
    };

    const response = await pingService.post(AUTH_ENDPOINTS.TOKEN, data);
    return parseAndLog(CodeSchema, response.data);
  },
  getUserInfo: async (token: string) => {
    const response = await pingService.get(AUTH_ENDPOINTS.GET_USER_INFO, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return parseAndLog(PingUserSchema, response.data);
  },
  refreshTokens: async (refreshToken: string) => {
    const data = {
      client_id: PING_CLIENT_ID,
      grant_type: TOKEN_GRANT_TYPE,
      refresh_token: refreshToken,
    };
    const response = await pingService.post(AUTH_ENDPOINTS.TOKEN, data);
    return parseAndLog(PartialCodeSchema, response.data);
  },
  revoke: (token: string, tokenHint = 'refresh_token') => {
    const data = {
      client_id: PING_CLIENT_ID,
      token,
      token_type_hint: tokenHint,
    };
    return pingService.post(AUTH_ENDPOINTS.REVOKE, data);
  },
};
