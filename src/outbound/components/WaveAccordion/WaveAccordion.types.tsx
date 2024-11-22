/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { StatusVariants } from '@shared/components/StatusBadge/StatusBadge.types';
import { ColumnParam, OrderReleaseStoreOrderRowTypes } from '@shared/components/Table/Table.types';

export interface OrderStatus {
  value: string;
  label: string;
  variant: StatusVariants;
}

export interface Store {
  storeNumber: string;
  pallets: number;
  pieces: number;
  comments?: string;
  subzone?: string;
  section?: string;
}

export interface Wave {
  id: number;
  due: string;
  comment?: string;
  status: OrderStatus;
  pcs: number;

  stores: OrderReleaseStoreOrderRowTypes[];
}

export interface order {
  label: string;
  columns: ColumnParam[];
}

export type WaveAccordianProps = {
  item: Wave;
  order: order;
};
