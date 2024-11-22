/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { HEADER_CURRENT_PAGE, HEADER_PAGE_SIZE } from '@shared/constants/headers';
import { STORE_ENDPOINTS } from '@shared/constants/routes';
import { StoreSchema } from '@ofm/schemas/storeSchema';
import { apiService } from '@ofm/services/apiService';
import { GetStoresParams, ActivityParams, PostStoreStatus } from '@ofm/types/types';
import { paginatedParseAndLog, parseAndLog } from '@ofm/utils/utils';

export const storeService = {
  getStoreById: async (storeId: string) => {
    const response = await apiService.get(STORE_ENDPOINTS.GET_STORE(storeId));
    return parseAndLog(StoreSchema, response.data);
  },
  getStores: async (options?: GetStoresParams) => {
    const params = {
      ...(options?.warehouseId && { warehouseId: options?.warehouseId }),
      ...(options?.storeStatus && { status: options?.storeStatus }),
    };

    const headers = {
      ...(options?.currentPage && { [HEADER_CURRENT_PAGE]: options?.currentPage }),
      ...(options?.pageSize && { [HEADER_PAGE_SIZE]: options?.pageSize }),
    };

    const response = await apiService.get(STORE_ENDPOINTS.GET_ALL_STORES, {
      params: params,
      headers: headers,
    });
    return paginatedParseAndLog(StoreSchema, response.data);
  },
  postStoreActivity: async (storeId: string, activity: ActivityParams) => {
    const response = await apiService.post(STORE_ENDPOINTS.POST_STORE_ACTIVITY(storeId), activity);
    return response;
  },
  postStoreStatus: async (options: PostStoreStatus) => {
    const response = await apiService.post(STORE_ENDPOINTS.POST_STORE_STATUS(options.storeId), {
      status: options.status,
      message: options.message,
      endDate: options?.endDate,
    });

    return parseAndLog(StoreSchema, response.data);
  },
};
