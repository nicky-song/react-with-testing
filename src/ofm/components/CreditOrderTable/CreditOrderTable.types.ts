/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';

const CreditOrderSchema = z.object({
  id: z.string(),
  sku: z.string(),
  partNumber: z.string(),
  description: z.string(),
  pack: z.number().min(0),
  packReceivedCurrent: z.number().min(0),
  packReceivedMax: z.number().min(0),
  quantityReceivedCurrent: z.number().min(0),
  quantityReceivedMax: z.number().min(0),
});

export type CreditOrderType = z.infer<typeof CreditOrderSchema>;

export type Props = {
  data: CreditOrderType[];
  onChange: (orders: CreditOrderType) => void;
  isEditable?: boolean;
};
