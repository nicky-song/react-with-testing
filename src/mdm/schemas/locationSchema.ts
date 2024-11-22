/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';
import { AttributeSchema } from '@mdm/schemas/attributeSchema.ts';
import { t } from 'i18next';

import { isNumeric } from '@mdm/utils/form/validationUtils.tsx';

const defaultAttributeValues = [
  {
    key: 'stockroom',
    value: '',
  },
  {
    key: 'locationType',
    value: '',
  },
  {
    key: 'checkDigit',
    value: 0,
  },
  {
    key: 'sku',
    value: '',
  },
  {
    key: 'lot',
    value: '',
  },
  {
    key: 'quantityUnits',
    value: 0,
  },
  {
    key: 'quantityReserved',
    value: 0,
  },
  {
    key: 'minimum',
    value: 0,
  },
  {
    key: 'maximum',
    value: 0,
  },
  {
    key: 'packSize',
    value: 0,
  },
  {
    key: 'locationFlag',
    value: '',
  },
  {
    key: 'locationLock',
    value: 'unlocked',
  },
  {
    key: 'slotFronts',
    value: 0,
  },
  {
    key: 'slotLayers',
    value: 0,
  },
  {
    key: 'slotDeeps',
    value: 0,
  },
  {
    key: 'currentWidth',
    value: 0,
  },
  {
    key: 'cycleDate',
    value: '',
  },
  {
    key: 'cycleCc',
    value: '',
  },
  {
    key: 'cycleLot',
    value: '',
  },
  {
    key: 'cycleSqty',
    value: '',
  },
  {
    key: 'cycleQuantity',
    value: 0,
  },
  {
    key: 'cycleCost',
    value: 0,
  },
  {
    key: 'cycleUser',
    value: '',
  },
  {
    key: 'invQuantity1',
    value: 0,
  },
  {
    key: 'invQuantity2',
    value: 0,
  },
  {
    key: 'invQuantity3',
    value: 0,
  },
  {
    key: 'invQuantity4',
    value: 0,
  },
  {
    key: 'cycleCount',
    value: 0,
  },
  {
    key: 'isFullPallet',
    value: false,
  },
  {
    key: 'recordType',
    value: '',
  },
  {
    key: 'materialCode',
    value: '',
  },
  {
    key: 'slotType',
    value: '',
  },
  {
    key: 'receivingDate',
    value: '',
  },
  {
    key: 'expirationDate',
    value: '',
  },
  {
    key: 'crossReference',
    value: '',
  },
  {
    key: 'isFullReserved',
    value: false,
  },
  {
    key: 'pickingDropArea',
    value: '',
  },
  {
    key: 'putawayDropArea',
    value: '',
  },
  {
    key: 'volume',
    value: 0,
  },
  {
    key: 'putawayVolume',
    value: 0,
  },
];

export const LocationSchema = z.object({
  id: z.number().optional(),
  locationId: z.string().min(1),
  type: z.string().optional(),
  sku: z.string().optional(),
  subzoneName: z.string().optional(),
  attributes: z
    .array(AttributeSchema)
    .superRefine((data, ctx) => {
      const requiredFields = [
        'checkDigit',
        'stockroom',
        'locationType',
        'sku',
        'minimum',
        'maximum',
        'quantityReserved',
      ];

      const numericFields = [
        'checkDigit',
        'slotFronts',
        'slotDeeps',
        'slotLayers',
        'minimum',
        'maximum',
        'quantityReserved',
        'currentWidth',
        'packSize',
      ];

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
        if (foundFieldIndex !== -1) {
          if (!isNumeric(data[foundFieldIndex].value)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [`attribute-${foundFieldIndex}`],
              message: t('Form.NumericError'),
            });
          }

          if (
            data[foundFieldIndex].key === 'checkDigit' &&
            data[foundFieldIndex].value &&
            data[foundFieldIndex].value.length > 2
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [`attribute-${foundFieldIndex}`],
              message: t('Form.MaxCharacterAmount', { count: 2 }),
            });
          }
        }
      }
    })
    .default(defaultAttributeValues),
});
