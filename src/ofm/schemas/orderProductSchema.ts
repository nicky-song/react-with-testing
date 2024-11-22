/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';
import { ProductSchema } from './productSchema';

export const OrderProductSchema = z
  .object({
    id: z.string(),
    quantity: z.number(),
    credited: z.boolean(),
    inProgress: z.boolean(),
  })
  .merge(ProductSchema);
