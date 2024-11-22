/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';
import { AttributeSchema } from '@mdm/schemas/attributeSchema.ts';
import { t } from 'i18next';
import { isNumeric } from '@mdm/utils/form/validationUtils.tsx';
import { DEFAULT_CONSOLIDATION_STATUS } from '@mdm/constants/constants.ts';

const defaultAttributeValues = [
  {
    key: 'locationType',
    value: '',
  },
  {
    key: 'status',
    value: DEFAULT_CONSOLIDATION_STATUS,
  },
  {
    key: 'height',
    value: 0,
  },
  {
    key: 'width',
    value: 0,
  },
  {
    key: 'depth',
    value: 0,
  },
  {
    key: 'order',
    value: '',
  },
  {
    key: 'documentPrinterLocation',
    value: '',
  },
  {
    key: 'labelPrinterLocation',
    value: '',
  },
];

export const ConsolidationLocationSchema = z.object({
  id: z.number().optional(),
  locationId: z.string().min(1),
  zoneName: z.string().min(1),
  subzoneName: z.string().min(1),
  attributes: z
    .array(AttributeSchema)
    .superRefine((data, ctx) => {
      const requiredFields = ['locationType', 'status', 'height', 'width', 'depth'];
      const numericFields = ['height', 'width', 'depth'];

      for (const key of requiredFields) {
        const foundFieldIndex = data.findIndex((attribute) => attribute.key === key);
        if (foundFieldIndex !== -1 && data[foundFieldIndex].value === '') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [`attribute-${foundFieldIndex}`],
            message: t('Form.RequiredField'),
          });
        }
      }

      for (const key of numericFields) {
        const foundFieldIndex = data.findIndex((attribute) => attribute.key === key);
        if (foundFieldIndex !== -1 && !isNumeric(data[foundFieldIndex].value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [`attribute-${foundFieldIndex}`],
            message: t('Form.NumericError'),
          });
        }
      }
    })
    .default(defaultAttributeValues),
});
