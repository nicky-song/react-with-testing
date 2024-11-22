/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => {
  return z.object({
    results: z.array(dataSchema),
    metadata: z.object({
      totalResults: z.number(),
    }),
  });
};
