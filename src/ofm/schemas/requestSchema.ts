/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';
import { RequestSummarySchema } from './requestSummarySchema';
import { RequestStatus } from '@ofm/constants/constants';

export const RequestSchema = z.object({
  waveId: z.string().nullable(),
  status: z.nativeEnum(RequestStatus).nullable(),
  requestedDate: z.coerce.date(),
  lastUpdate: z.coerce.date(),
  summary: RequestSummarySchema,
});
