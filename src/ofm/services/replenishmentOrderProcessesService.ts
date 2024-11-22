/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { REPLENISHMENT_PROCESS_ENDPOINTS } from '@shared/constants/routes';
import { apiService } from './apiService';
import { RequestSchema } from '@ofm/schemas/requestSchema';
import { REQUEST_PATCH_OPERATION } from '@ofm/constants/constants';
import { parseAndLog } from '@ofm/utils/utils';
import { ReplenishmentOrderRequest } from '../types/types';

export const replenishmentOrderProcessesService = {
  getReplenishmentOrderProcesses: async (waveId: string) => {
    const params = { waveId };
    const response = await apiService.get(REPLENISHMENT_PROCESS_ENDPOINTS.BASE_URL, {
      params,
    });
    return parseAndLog(RequestSchema, response.data);
  },
  createReplenishmentOrderProcess: async (orderDetails: ReplenishmentOrderRequest) => {
    const response = await apiService.post(REPLENISHMENT_PROCESS_ENDPOINTS.BASE_URL, orderDetails);
    return response;
  },
  getReplenishmentOrderProcess: async (requestId: string) => {
    const response = await apiService.get(
      REPLENISHMENT_PROCESS_ENDPOINTS.GET_RO_REQUEST(requestId)
    );
    return parseAndLog(RequestSchema, response.data);
  },
  patchUserNotified: async (requestId: string) => {
    const response = await apiService.patch(
      `${REPLENISHMENT_PROCESS_ENDPOINTS.BASE_URL}/${requestId}`,
      REQUEST_PATCH_OPERATION
    );
    return response;
  },
};
