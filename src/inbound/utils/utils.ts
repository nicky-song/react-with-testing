/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { t } from 'i18next';

import { z } from 'zod';

import { StatusVariants } from '@shared/components/StatusBadge/StatusBadge.types';
import { MAX_TEXTAREA_LENGTH } from '@shared/constants/constants';

import { ALPHA_NUMERIC_REGEX } from '@inbound/constants/constants';

export const statusToBadgeVariant = (status: string) => {
  switch (status) {
    case 'NOT_STARTED':
    default:
      return StatusVariants.NOT_STARTED;
    case 'RECEIVING_IN_PROGRESS':
      return StatusVariants.IN_PROGRESS;
    case 'READY_FOR_FINALIZATION':
      return StatusVariants.READY_FOR_ACTION;
    case 'COMPLETED':
    case 'READY_FOR_SIGNATURE':
      return StatusVariants.COMPLETED;
    case 'REMOVED':
      return StatusVariants.CANCELLED;
  }
};

export const replaceAll = (target: string, search: string, replace: string) => {
  return target.split(search).join(replace);
};

export const calculatePercentage = (count: number, total: number) => {
  return Math.round((100 * count) / total);
};

export const calculatePercentageWithSign = (count: number, total: number) => {
  return t('PODashboard.Stats.Percentage', {
    percentage: calculatePercentage(count, total),
  });
};

export const getFormAlphaNumericInputError = (errorType: string, maxCount?: number) => {
  switch (errorType) {
    case z.ZodIssueCode.custom:
      return t('Form.AlphaNumericError');
    case z.ZodIssueCode.too_big:
      return t('Form.MaxCharacterAmount', { count: maxCount || MAX_TEXTAREA_LENGTH });
    case z.ZodIssueCode.invalid_type:
    case z.ZodIssueCode.too_small:
    default:
      return t('Form.RequiredField');
  }
};

export const isAlphaNumeric = (value: string) => {
  return ALPHA_NUMERIC_REGEX.test(value);
};
