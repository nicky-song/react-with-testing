/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { GetWaveParams, GetWavesParams } from '@ofm/types/types';
import { apiService } from './apiService';
import { WaveSchema } from '@ofm/schemas/waveSchema';
import { WAVE_ENDPOINTS } from '@shared/constants/routes';
import { HEADER_CURRENT_PAGE, HEADER_PAGE_SIZE } from '@shared/constants/headers';
import { paginatedParseAndLog, parseAndLog } from '@ofm/utils/utils';

export const waveService = {
  getWaves: async (options: GetWavesParams) => {
    const { warehouseId, pastDue, startDate, endDate, currentPage, pageSize } = options;

    const response = await apiService.get(WAVE_ENDPOINTS.GET_ALL_WAVES, {
      params: {
        warehouseId,
        pastDue,
        startDate,
        endDate,
      },
      headers: { [HEADER_CURRENT_PAGE]: currentPage, [HEADER_PAGE_SIZE]: pageSize },
    });
    return paginatedParseAndLog(WaveSchema, response.data);
  },

  getWaveById: async (options: GetWaveParams) => {
    const { waveId } = options;
    const response = await apiService.get(WAVE_ENDPOINTS.GET_WAVE(waveId || ''));
    return parseAndLog(WaveSchema, response.data);
  },
};
