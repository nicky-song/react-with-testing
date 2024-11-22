/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';

import { MIN_FIELD_LENGTH } from '@shared/constants/constants';
import { isAlphaNumeric } from '@inbound/utils/utils';

export const PurchaseOrderRemoveSchema = z.object({
  autoZoneId: z
    .string()
    .min(1)
    .refine((autoZoneId) => isAlphaNumeric(autoZoneId)),
  password: z
    .string()
    .min(1)
    .refine((password) => isAlphaNumeric(password)),
  reason: z
    .string()
    .min(1)
    .max(100)
    .refine((reason) => reason.trim().length >= MIN_FIELD_LENGTH),
});
