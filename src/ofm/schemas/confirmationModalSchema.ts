/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { MIN_FIELD_LENGTH } from '@shared/constants/constants';
dayjs.extend(customParseFormat);

export const ReasonDateSchema = z.object({
  reason: z
    .string()
    .min(1)
    .max(350)
    .refine((reason) => reason.trim().length >= MIN_FIELD_LENGTH),
  date: z
    .string()
    .refine((date) => !date || dayjs(date).isValid())
    .optional(),
});

export const ReasonSchema = z.object({
  reason: z
    .string()
    .min(1)
    .max(350)
    .refine((reason) => reason.trim().length >= MIN_FIELD_LENGTH),
});

export const DrawerArraySchema = z.array(z.unknown());

export const EmptySchema = z.object({});

export type SchemaOptions = typeof ReasonDateSchema | typeof ReasonSchema | typeof EmptySchema;
