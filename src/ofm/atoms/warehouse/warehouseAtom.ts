/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { WarehouseAtomType } from './warehouseAtom.types';
import { atom } from 'jotai';

export const warehouseAtom = atom<WarehouseAtomType>({
  id: '',
  name: '',
  country: '',
});

export const asyncWarehouseAtom = atom(
  (get) => {
    return get(warehouseAtom);
  },
  (_get, set, warehouse: WarehouseAtomType) => {
    set(warehouseAtom, warehouse);
  }
);
