/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { OrderType } from '@outbound/pages/ControlDesk/ReleaseOrders/OrderTabs/data';
import { StatusVariants } from '@shared/components/StatusBadge/StatusBadge.types';
import { ColumnParam, OrderReleaseStoreOrderRowTypes } from '@shared/components/Table/Table.types';

export interface OrderStatus {
  value: string;
  label: string;
  variant: StatusVariants;
}

export interface Item {
  id: number;
  due?: string;
  releaseBy?: Date;
  comment?: string;
  status: OrderStatus;
  pallets?: number;
  pcs: number;
  stores: OrderReleaseStoreOrderRowTypes[];
  subzones?: undefined;
  grouping?: string[][];
}

export interface Order {
  label: string;
  columns: ColumnParam[];
}

export type Props = {
  item: Item;
  order: OrderType;
  laneOptions?: { label: string; value: string }[];
};
