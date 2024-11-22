/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { GetProductsParams } from '@ofm/types/types';
import { apiService } from './apiService';
import { PRODUCT_ENDPOINTS } from '@shared/constants/routes';
import { ProductSchema } from '@ofm/schemas/productSchema';
import { parseAndLog } from '@ofm/utils/utils';
import { z } from 'zod';

export const productService = {
  getProducts: async (options: GetProductsParams) => {
    const params = { ...options };
    const resp = await apiService.get(PRODUCT_ENDPOINTS.GET_PRODUCTS, { params: params });
    return parseAndLog(z.array(ProductSchema), resp.data);
  },
};
