/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { DeliveryMethod, ProductStatus } from '@ofm/constants/constants';
import { MIN_FIELD_LENGTH } from '@shared/constants/constants';
import { z } from 'zod';

export const WillCallItemSchema = z.object({
  sku: z.string(),
  description: z.string(),
  partNumber: z.string(),
  status: z.nativeEnum(ProductStatus),
  pack: z.number(),
  packs: z.number(),
  quantity: z.number(),
  warehouseId: z.string(),
  deliveryMethod: z.nativeEnum(DeliveryMethod),
});

export const WillCallBodySchema = z.object({
  callerName: z.string(),
  storeNumber: z.string(),
  items: z.array(WillCallItemSchema),
});

export const NameSchema = z.object({
  fullName: z
    .string()
    .min(1)
    .max(70)
    .refine((fullName) => fullName.trim().length >= MIN_FIELD_LENGTH),
});
