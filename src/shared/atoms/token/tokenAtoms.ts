/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { LOCAL_ACCESS_TOKEN, LOCAL_REFRESH_TOKEN } from '@shared/constants/storageConstants';
import { atom } from 'jotai';

export const baseRefreshAtom = atom<string | undefined>(
  localStorage.getItem(LOCAL_REFRESH_TOKEN) || undefined
);
export const baseAccessAtom = atom<string | undefined>(
  localStorage.getItem(LOCAL_ACCESS_TOKEN) || undefined
);

export const refreshTokenAtom = atom(
  (get) => {
    return get(baseRefreshAtom);
  },
  async (_get, set, token?: string) => {
    if (token) {
      localStorage.setItem(LOCAL_REFRESH_TOKEN, token);
    } else {
      localStorage.removeItem(LOCAL_REFRESH_TOKEN);
    }
    set(baseRefreshAtom, token);
  }
);

export const accessTokenAtom = atom(
  (get) => {
    return get(baseAccessAtom);
  },
  async (_get, set, token?: string) => {
    if (token) {
      localStorage.setItem(LOCAL_ACCESS_TOKEN, token);
    } else {
      localStorage.removeItem(LOCAL_ACCESS_TOKEN);
    }
    set(baseAccessAtom, token);
  }
);
