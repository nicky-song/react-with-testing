/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';
import { AttributeSchemaType } from '@mdm/schemas/attributeSchema.ts';

/**
 * Get the default values for the form
 * @param schema
 */
export const getFormDefaults = <Schema extends z.AnyZodObject>(schema: Schema) => {
  return Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      if (value instanceof z.ZodDefault) return [key, value._def.defaultValue()];
      return [key, undefined];
    })
  );
};

/**
 * Get the index of the field in the form array
 * @param fieldArray
 * @param key
 */
export const getFormFieldIndexByKey = (fieldArray: AttributeSchemaType[], key: string) => {
  return fieldArray.findIndex((field) => field.key === key);
};
