/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';
import { AttributeSchema } from '@mdm/schemas/attributeSchema.ts';
import {
  addCustomMaxLengthFieldValidation,
  addCustomNumericFieldValidation,
  addCustomRequiredFieldValidation,
} from '@mdm/utils/form/validationUtils.tsx';
import { MAX_LENGTH_FIELD } from '@mdm/constants/constants.ts';

const defaultAttributeValues = [
  {
    key: 'mapSequence',
    value: '',
  },
];

export const ZoneSchema = z.object({
  zoneId: z.string().min(1),
  description: z.string(),
  attributes: z
    .array(AttributeSchema)
    .superRefine((data, ctx) => {
      const requiredFields = ['mapSequence'];
      addCustomRequiredFieldValidation(data, requiredFields, ctx);

      const numericFields = ['mapSequence'];
      addCustomNumericFieldValidation(data, numericFields, ctx);

      const maxLengthFields = [
        { key: 'mapSequence', maxLength: MAX_LENGTH_FIELD.ZONE_MAP_SEQUENCE },
      ];
      addCustomMaxLengthFieldValidation(data, maxLengthFields, ctx);
    })
    .default(defaultAttributeValues),
});
