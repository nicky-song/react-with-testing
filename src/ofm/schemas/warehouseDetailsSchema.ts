/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';

export const WarehouseDetailsSchema = z.object({
  warehouseId: z.string(),
  warehouseName: z.string().nullable(),
  quantityOnHand: z.number(),
  minimumPack: z.number(),
});
