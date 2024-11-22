/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ColumnParam as STARCColumParam } from '@az/starc-ui/dist/components/table/Table.types';
import type * as T from '../StatusBadge/StatusBadge.types';
import { SelectOption } from '@az/starc-ui/dist/components/select/Select.types';
import { TableStylingVariants } from '@shared/components/Table/tableConstants';
import { ReactNode } from 'react';
import { ProductType } from '@ofm/types/types';
import { StatusVariants } from '../StatusBadge/StatusBadge.types';
import { User } from '../AvatarGroup/AvatarGroup.types';

export type AttributeTypes = {
  key?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any /* value can string, boolean, integer, so it is declared as any */;
};

export type ErrorRowTypes = {
  storeId: string;
  errorStatus: string;
  attempts: number;
  created: Date;
  lastAttempted: Date;
  link: string;
};

export type OrderDetailsRowTypes = {
  sku: string;
  partNumber: string;
  planogramId: string;
  description: string;
  pack: number;
  qoh: number;
  quantity: number;
  isRowCredited: boolean;
};

export interface WarehouseDetails extends SelectOption {
  warehouseId: string;
  quantityOnHand: number;
  minimumPack: number;
}

export type WillCallRowTypes = ProductType & {
  warehouseDetails: WarehouseDetails[];
  selectedWarehouse: WarehouseDetails;
  status: string;
  quantityCurrent: number;
  numberOfPacksCurrent: number;
  isRowBeingEdited: boolean;
};

export type StoreDetailsRowTypes = {
  orderId: string;
  invoiceId: string;
  requestBy?: Date;
  orderType: string;
  badgeText: string;
  badgeVariant: T.StatusVariants;
  requestedAt: Date;
  billedAt?: Date;
  lines: number;
  pieces: number;
  hasComments: boolean;
};

export type WarehouseConfigurationRowTypes = {
  id: number;
  dcNumber: number;
  address: string;
  description: string;
  contactNumber: string;
};

export type ZoneListRowTypes = {
  id: number;
  zoneId: string;
  totalSubzones: number;
  description: string;
  attributes?: AttributeTypes[];
};

export type SubZoneListRowTypes = {
  id: number;
  name: string;
  zoneName: string;
  pickRouteType: string;
  type: string;
  totalLocations: number;
  totalVehicles: number;
  description: string;
  attributes?: AttributeTypes[];
};

export interface StoreStatus {
  value: string;
  label: string;
  variant: StatusVariants;
}

export type OrderReleaseStoreOrderRowTypes = {
  storeNumber: string;
  pallets: number;
  pieces?: number;
  comments?: string;
  pallet?: string;
  route?: string;
  dispatchTime?: Date;
  activity?: string;
  status?: StoreStatus;
  willCall?: boolean;
};

export type OrderReleaseNewStoreOrderRowTypes = {
  subzone: string;
  sku: number;
  pallets: number;
  status: StoreStatus;
  pieces: number;
};

export type OrderDetailsDrawerRowTypes = {
  sku: string;
  part: string;
  planogramId: string;
  subzone: string;
  description: string;
  pack: number;
  qoh: number;
  quantity: number;
  users?: User[];
};

export type LocationListRowTypes = {
  id: number;
  locationId: string;
  type: string;
  stockRoom: string;
  sku: string;
  quantityUnits: number;
  quantityReserved: number;
  minimum: number;
  maximum: number;
  zone: string;
  subzone: string;
  attributes: AttributeTypes[];
};

export type ConsolidationLocationListRowTypes = {
  id: number;
  locationId: string;
  zoneName: string;
  subzoneName: string;
  attributes: AttributeTypes[];
};

export type VehicleListRowTypes = {
  id: number;
  vehicleId: string;
  type: string;
  description: string;
  isFullPallet: boolean;
  isPartPallet: boolean;
  isPickingAllowed: boolean;
  isPutAwayAllowed: boolean;
};

export type SortRowsParam = {
  dividerLabel?: string;
  id: string;
  isDisabled?: boolean;
  cells: { value: ReactNode; sortValue?: string | number | boolean }[];
  inGroup?: boolean;
  inLaneConfirmation?: boolean;
  isStoreGroupParent?: boolean;
};

export interface ColumnParam extends STARCColumParam {
  isSorted?: boolean;
  isCheckbox?: boolean;
}

export type Props = {
  columns: ColumnParam[];
  rows: SortRowsParam[];
  isPaginated: boolean;
  pageSize: number;
  defaultPage: number;
  isCheckboxTable: boolean;
  isCheckboxDisabled?: boolean;
  isCreditItem: boolean;
  styleVariant:
    | TableStylingVariants.DETAILS
    | TableStylingVariants.ERROR
    | TableStylingVariants.MODAL
    | TableStylingVariants.DEFAULT
    | TableStylingVariants.FILLED
    | TableStylingVariants.SIMPLE;
  totalPages: number;
  onClick?: (selectedRows: string[]) => void;
  onSort: (sorting: TableSorting[]) => void;
  showTotalRows?: boolean;
  onRowAction?: (row: SortRowsParam) => void;
  isFullHeight?: boolean;
};

export enum DIRECTION {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

export type TableSorting = { direction: DIRECTION; id: string };
