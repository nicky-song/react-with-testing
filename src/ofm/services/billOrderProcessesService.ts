/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { BILL_PROCESS_ENDPOINTS } from '@shared/constants/routes';
import { apiService } from './apiService';
import { BillOrderProcessRequestSchema } from '@ofm/schemas/billOrderProcessSchema';
import { REQUEST_PATCH_OPERATION } from '@ofm/constants/constants';
import { parseAndLog } from '@ofm/utils/utils';

export const billOrderProcessesService = {
  getBillOrderProcesses: async (waveId: string) => {
    const params = { waveId };
    const response = await apiService.get(BILL_PROCESS_ENDPOINTS.BASE_URL, { params });
    return parseAndLog(BillOrderProcessRequestSchema, response.data);
  },
  createBillOrderProcess: async (orderIds: string[]) => {
    const response = await apiService.post(BILL_PROCESS_ENDPOINTS.BASE_URL, orderIds);
    return response;
  },
  getBillOrderProcess: async (requestId: string) => {
    const response = await apiService.get(BILL_PROCESS_ENDPOINTS.GET_BILL(requestId));
    return parseAndLog(BillOrderProcessRequestSchema, response.data);
  },
  patchUserNotified: async (requestId: string) => {
    const response = await apiService.patch(
      `${BILL_PROCESS_ENDPOINTS.BASE_URL}/${requestId}`,
      REQUEST_PATCH_OPERATION
    );
    return response;
  },
};
