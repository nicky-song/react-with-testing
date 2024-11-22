/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import {
  OrderErrorStatus,
  OrderErrorType,
  OrderSecondaryStatus,
  OrderStatus,
  OrderType,
} from '@ofm/constants/constants';
import { ActivitySchema } from './storeSchema';
import { z } from 'zod';

export const OrderSchema = z.object({
  id: z.string(),
  status: z.nativeEnum(OrderStatus),
  type: z.nativeEnum(OrderType),
  secondaryStatus: z.nativeEnum(OrderSecondaryStatus).nullable().optional(),
  isInProgress: z.boolean(),
  billedDate: z.coerce.date().nullable().optional(),
  creationDate: z.coerce.date(),
  dueDate: z.coerce.date(),
  error: z.array(
    z.object({
      id: z.string(),
      status: z.nativeEnum(OrderErrorStatus),
      errorType: z.nativeEnum(OrderErrorType),
      storeNumber: z.string(),
      attemptsCount: z.number(),
      createdAt: z.coerce.date(),
      lastAttemptedAt: z.coerce.date(),
      orderId: z.string(),
    })
  ),
  hasHistory: z.boolean(),
  invoiceNumber: z.string().nullable(),
  lastUpdate: z.coerce.date(),
  linesCount: z.number(),
  piecesCount: z.number(),
  requestedDate: z.coerce.date().nullable().optional(),
  storeNumber: z.string(),
  warehouseId: z.string(),
  wave: z.string(),
  waveName: z.string(),
  international: z.boolean(),
  delivery: z
    .object({
      option: z.string(),
      arrivesBy: z.coerce.date(),
      dcSource: z.number(),
    })
    .nullable()
    .optional(),
  activity: z.array(ActivitySchema).optional(),
});
