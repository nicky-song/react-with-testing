/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { HEADER_CURRENT_PAGE, HEADER_PAGE_SIZE } from '@shared/constants/headers';
import { CSVDataType, GetOrderProductsParams, GetOrdersParams } from '@ofm/types/types';
import { apiService } from './apiService';
import { EXPORT_ENDPOINTS } from '@shared/constants/routes';
import { AxiosResponse } from 'axios';
import { formatCsvName } from '@ofm/utils/utils';

// This service is for downloading CSVs
export const exportService = {
  getOrders: async (options: GetOrdersParams): Promise<CSVDataType> => {
    const params = {
      ...options,
      ...(options?.type && { type: options?.type }),
      ...(options?.status && { status: options?.status.join(',') }),
      ...(options?.waveId && { waveId: options?.waveId }),
    };

    const headers = {
      ...(options?.currentPage && { [HEADER_CURRENT_PAGE]: options?.currentPage }),
      ...(options?.pageSize && { [HEADER_PAGE_SIZE]: options?.pageSize }),
    };

    const response: AxiosResponse<string> = await apiService.get(EXPORT_ENDPOINTS.GET_ORDERS, {
      params: params,
      headers: headers,
      responseType: 'text',
    });

    const fileName: string = response.headers['content-disposition']?.split('filename=')?.[1] || '';

    const csvData: string = response.data;
    return { fileName: formatCsvName(fileName), data: csvData };
  },
  getProducts: async (options: GetOrderProductsParams): Promise<CSVDataType> => {
    const params = {
      ...(options.orderId && { orderId: options.orderId }),
      ...(options.searchTerms && { searchTerms: options.searchTerms }),
    };
    const headers = {
      ...(options?.currentPage && { [HEADER_CURRENT_PAGE]: options?.currentPage }),
      ...(options?.pageSize && { [HEADER_PAGE_SIZE]: options?.pageSize }),
    };
    const response: AxiosResponse<string> = await apiService.get(EXPORT_ENDPOINTS.GET_PRODUCTS, {
      params,
      headers,
      responseType: 'text',
    });

    const fileName: string = response.headers['content-disposition']?.split('filename=')?.[1] || '';

    const csvData: string = response.data;
    return { fileName: formatCsvName(fileName), data: csvData };
  },
};
