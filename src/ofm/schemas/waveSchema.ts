/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';

export const WaveSchema = z.object({
  id: z.string(),
  name: z.string(),
  warehouseId: z.string(),
  dueTimestamp: z.string(),
  status: z.enum(['NOT_STARTED', 'SENT_TO_OUTBOUND', 'IN_PROGRESS']),
  totalOrdersCount: z.number(),
  flaggedOrdersCount: z.number(),
  completedOrdersCount: z.number(),
  international: z.boolean(),
});
