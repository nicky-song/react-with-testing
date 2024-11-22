/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { t } from 'i18next';
import { z } from 'zod';

import dayjs from 'dayjs';

const isValidDate = (dateString: string) => {
  const date = dayjs(dateString, t('DateFormat.Short'));
  return date.isValid() && date.isAfter(dayjs());
};

export const PurchaseOrderSchema = z.object({
  poNumber: z.number(),
  poType: z.string(),
  vendorName: z.string(),
  arrivalTimeDate: z.string().refine((date) => isValidDate(date)),
  arrivalTimeTime: z.string(),
  position: z.string(),
  trailerId: z.number(),
  trailerNumber: z.number(),
  locationType: z.string(),
  gateNumber: z.number(),
  commodity: z.string(),
  reason: z.string(),
});
