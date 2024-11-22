/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { CreditOrderType } from '../CreditOrderTable/CreditOrderTable.types';

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  creditOrders: CreditOrderType[];
  pageSize?: number;
  onCreditItems: (newCreditOrders: CreditOrderType[]) => void;
};
