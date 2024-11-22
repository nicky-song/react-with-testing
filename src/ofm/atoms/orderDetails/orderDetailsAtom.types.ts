/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { OrderType } from '@ofm/constants/constants';

export type OrderDetailsAtomType = {
  orderId: string;
  orderType: OrderType;
};
