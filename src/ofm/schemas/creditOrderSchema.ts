/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';
import { OrderSchema } from './orderSchema';

export const CreditOrderSchema = z
  .object({
    amountCredited: z.number(),
    originalOrderTitle: z.string(),
    originalOrderId: z.string(),
  })
  .merge(OrderSchema);
