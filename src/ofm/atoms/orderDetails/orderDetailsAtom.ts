/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { atom } from 'jotai';
import { OrderDetailsAtomType } from './orderDetailsAtom.types';
import { OrderType } from '@ofm/constants/constants';

export const orderDetailsAtom = atom<OrderDetailsAtomType>({
  orderId: '',
  orderType: OrderType.OPENING,
});
