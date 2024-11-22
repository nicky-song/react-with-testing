/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ProductStatus } from '@ofm/constants/constants';
import { z } from 'zod';
import { WarehouseDetailsSchema } from './warehouseDetailsSchema';

export const ProductSchema = z.object({
  sku: z.string(),
  description: z.string(),
  partNumber: z.string(),
  status: z.nativeEnum(ProductStatus),
  pack: z.number(),
  upc: z.string(),
  planogramId: z.string(),
  warehouseDetails: z.array(WarehouseDetailsSchema),
});
