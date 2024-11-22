/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { USER_ENDPOINTS } from '@shared/constants/routes';
import { apiService } from './apiService';
import { UserSchema } from '@ofm/schemas/userSchema';
import { parseAndLog } from '@ofm/utils/utils';

export const userService = {
  retrieveUserInfo: async (token?: string) => {
    const response = await apiService.post(USER_ENDPOINTS.RETRIEVE_USER, undefined, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    return parseAndLog(UserSchema, response.data);
  },
};
