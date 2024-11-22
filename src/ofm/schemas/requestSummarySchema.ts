/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';

export const RequestSummarySchema = z.object({
  totalOrdersCount: z.number(),
  completedOrdersCount: z.number(),
  ordersInProgressCount: z.number(),
  errorOrdersCount: z.number(),
});
