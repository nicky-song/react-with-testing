/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';

export const ActivitySchema = z.object({
  id: z.string(),
  message: z.string(),
  activityDate: z.string(),
  user: z.string(),
  storeId: z.string().nullable(),
  orderId: z.string().nullable(),
  commentDetails: z.string().nullable(),
});

export const StoreSchema = z.object({
  storeId: z.string(),
  primaryDc: z.string(),
  storeType: z.string(),
  averagePieces: z.number(),
  averageLinesNumber: z.number(),
  customerNumber: z.string(),
  phoneNumber: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
  orderSchedule: z.array(
    z.object({
      day: z.string(),
      time: z.string(),
      wave: z.string(),
    })
  ),
  deliverySchedule: z.array(
    z.object({
      day: z.string(),
      time: z.string(),
      wave: z.string(),
    })
  ),
  status: z.string(),
  onHoldEndDate: z.string().nullable(),
  activity: z.array(ActivitySchema).optional(),
});
