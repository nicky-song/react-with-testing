/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { LOG_ENDPOINTS } from '@shared/constants/routes';
import { apiService } from './apiService';
import { LogError } from '@ofm/classes/LogError';
import { ClientLogError } from '@ofm/classes/ClientLogError';
import { LogType } from '@ofm/types/types';

export const logService = {
  postErrorLog: async (error: unknown) => {
    if (error instanceof LogError) {
      const errorLog: LogType = {
        ...error,
      };
      // Send log to service
      await logService.createLog(errorLog);

      // Throw only partial log to FE
      throw new ClientLogError({
        timestamp: error.timestamp,
        type: error.type,
        id: error.id,
      });

      // Throw any unknown errors for now
    } else {
      throw error;
    }
  },

  // Create a log, and just console out if it fails
  createLog: async (log: LogType) => {
    try {
      const response = await apiService.post(LOG_ENDPOINTS.BASE_URL, log);
      if (response?.data) {
        // eslint-disable-next-line no-console
        console.info(`Successfully created a log with the ID: ${log.id}`);
      }
      return response;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`Unable to create a log with the ID: ${log.id}`);
    }
  },
};
