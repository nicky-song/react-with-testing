/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { BFF_URL } from '@shared/constants/environmentConstants';
import axios from 'axios';

export const apiService = axios.create({
  baseURL: BFF_URL,
  timeout: 5000,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    client_id: window.env.APIGEE_CLIENT_ID,
  },
});
