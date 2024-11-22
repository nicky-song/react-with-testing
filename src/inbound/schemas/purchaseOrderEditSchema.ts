/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';

import { isAlphaNumeric } from '@inbound/utils/utils';

export const PurchaseOrderEditSchema = z.object({
  priority: z.boolean(),
  carrierName: z
    .string()
    .min(1)
    .refine((carrierName) => isAlphaNumeric(carrierName)),
  trailerNumber: z
    .string()
    .min(1)
    .refine((trailerNumber) => isAlphaNumeric(trailerNumber)),
  locationType: z.string().min(1),
  location: z
    .string()
    .min(1)
    .refine((location) => isAlphaNumeric(location)),
  commodity: z.string().min(1),
  receivingDoor: z
    .string()
    .min(1)
    .refine((receivingDoor) => isAlphaNumeric(receivingDoor)),
});
