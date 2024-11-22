/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';
import { AttributeSchema } from '@mdm/schemas/attributeSchema.ts';
import {
  addCustomAlphaNumericFieldValidation,
  addCustomMaxLengthFieldValidation,
  addCustomRequiredFieldValidation,
} from '@mdm/utils/form/validationUtils.tsx';
import { MAX_LENGTH_FIELD } from '@mdm/constants/constants.ts';

const defaultAttributeValues = [
  {
    key: 'categoryLabel',
    value: '',
  },
];

export const SubzoneSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  description: z.string(),
  zoneName: z.string().min(1),
  type: z.string().min(1),
  containerType: z.string(),
  pickMethod: z.string().min(1),
  labelSort: z.string().min(1),
  skuPickClass: z.string().min(1),
  pickDropLocation: z.string().min(1),
  putDropLocation: z.string().min(1),
  isMultiplePartsAllowedWithinLocation: z.string(),
  isMezzanine: z.string(),
  packMethod: z.string(),
  isConveyorFlag: z.boolean(),
  isItemVerify: z.boolean(),
  hasBidirectionalPick: z.boolean(),
  itemDescriptionPrompt: z.boolean(),
  stockRoom: z.string(),
  pickPriority: z.number().nonnegative(),
  putAwayPriority: z.number().nonnegative(),
  attributes: z
    .array(AttributeSchema)
    .superRefine((data, ctx) => {
      const requiredFields = ['categoryLabel'];
      addCustomRequiredFieldValidation(data, requiredFields, ctx);

      const alphaNumericFields = ['categoryLabel'];
      addCustomAlphaNumericFieldValidation(data, alphaNumericFields, ctx);

      const maxLengthFields = [
        {
          key: 'categoryLabel',
          maxLength: MAX_LENGTH_FIELD.SUB_ZONE_CATEGORY_LABEL,
        },
      ];
      addCustomMaxLengthFieldValidation(data, maxLengthFields, ctx);
    })
    .default(defaultAttributeValues),
});
