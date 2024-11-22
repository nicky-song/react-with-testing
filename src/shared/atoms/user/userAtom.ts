/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { atom } from 'jotai';
import { userService } from '@ofm/services/userService';
import { UserAtomType } from './userAtom.types';

export const userAtom = atom<UserAtomType>(undefined);

export const asyncUserAtom = atom(
  (get) => {
    return get(userAtom);
  },
  async (_get, set, token?: string) => {
    if (token) {
      const response = await userService.retrieveUserInfo(token);
      if (response) {
        set(userAtom, response);
        return true;
      }
    }
    set(userAtom, undefined);
    return false;
  }
);
