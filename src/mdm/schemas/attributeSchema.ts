/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';

export const AttributeSchema = z.object({
  key: z.string().optional(),
  value: z.any().optional(),
});

export type AttributeSchemaType = z.infer<typeof AttributeSchema>;
