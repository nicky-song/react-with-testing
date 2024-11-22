/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { OrderType } from '@outbound/pages/ControlDesk/ReleaseOrders/OrderTabs/data';
import { StatusVariants } from '@shared/components/StatusBadge/StatusBadge.types';
import {
  ColumnParam,
  OrderReleaseNewStoreOrderRowTypes,
} from '@shared/components/Table/Table.types';

export interface ItemStatus {
  value: string;
  label: string;
  variant: StatusVariants;
}

export interface Store {
  id: string;
  closeBy: Date;
  status: ItemStatus;
  pallets: number;
  pcs: number;
  subzones: OrderReleaseNewStoreOrderRowTypes[];
}

export interface Order {
  label: string;
  columns: ColumnParam[];
}

export type Props = {
  item: Store;
  order: OrderType;
};
