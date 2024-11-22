/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { DeepRequired, FieldErrorsImpl, GlobalError } from 'react-hook-form';
import { z } from 'zod';
import { t } from 'i18next';
import { AttributeTypes } from '@shared/components/Table/Table.types.ts';
import { isAlphaNumeric } from '@inbound/utils/utils.ts';

/**
 * Check if the value is numeric
 * @param value
 */
export const isNumeric = (value: string) => {
  const regEx = /^[0-9]*$/;
  return regEx.test(value);
};

/**
 * Display attribute field validation message
 * @param errors
 * @param fieldKey
 */
export const displayAttributeFieldValidationMessage = (
  errors: Partial<FieldErrorsImpl<DeepRequired<FormData>>> & {
    root?: Record<string, GlobalError> & GlobalError;
  },
  fieldKey: number
) => {
  // Disabled eslint rule for the below line as we are using the dynamic key to access the object
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return errors?.attributes[`attribute-${fieldKey}`]?.message || '';
};

/**
 * Add custom required field validation
 * @param data
 * @param fields
 * @param ctx
 */
export const addCustomRequiredFieldValidation = (
  data: AttributeTypes[],
  fields: string[],
  ctx: z.RefinementCtx
) => {
  for (const key of fields) {
    const foundFieldIndex = data.findIndex((attribute) => attribute.key === key);
    if (foundFieldIndex !== -1 && data[foundFieldIndex].value === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [`attribute-${foundFieldIndex}`],
        message: t('Form.RequiredField'),
      });
    }
  }
};

/**
 * Add custom numeric field validation
 * @param data
 * @param fields
 * @param ctx
 */
export const addCustomNumericFieldValidation = (
  data: AttributeTypes[],
  fields: string[],
  ctx: z.RefinementCtx
) => {
  for (const key of fields) {
    const foundFieldIndex = data.findIndex((attribute) => attribute.key === key);
    if (foundFieldIndex !== -1 && !isNumeric(data[foundFieldIndex].value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [`attribute-${foundFieldIndex}`],
        message: t('Form.NumericError'),
      });
    }
  }
};

/**
 * Add custom alphanumeric field validation
 * @param data
 * @param fields
 * @param ctx
 */
export const addCustomAlphaNumericFieldValidation = (
  data: AttributeTypes[],
  fields: string[],
  ctx: z.RefinementCtx
) => {
  for (const key of fields) {
    const foundFieldIndex = data.findIndex((attribute) => attribute.key === key);
    if (foundFieldIndex !== -1 && !isAlphaNumeric(data[foundFieldIndex].value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [`attribute-${foundFieldIndex}`],
        message: t('Form.AlphaNumericError'),
      });
    }
  }
};

/**
 * Add custom max length field validation
 * @param data
 * @param fields
 * @param ctx
 */
export const addCustomMaxLengthFieldValidation = (
  data: AttributeTypes[],
  fields: { key: string; maxLength: number }[],
  ctx: z.RefinementCtx
) => {
  for (const field of fields) {
    const foundFieldIndex = data.findIndex((attribute) => attribute.key === field.key);
    if (foundFieldIndex !== -1) {
      if (data[foundFieldIndex].value && data[foundFieldIndex].value.length > field.maxLength) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [`attribute-${foundFieldIndex}`],
          message: t('Form.MaxCharacterAmount', { count: field.maxLength }),
        });
      }
    }
  }
};
