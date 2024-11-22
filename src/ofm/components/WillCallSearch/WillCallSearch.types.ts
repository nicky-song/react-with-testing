/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ProductType } from '@ofm/types/types';

export enum WillCallItemStatus {
  NEW = 'New',
  CLEARANCE = 'Clearance',
  DISCONTINUED = 'Discontinued',
  SELL_THROUGH = 'SellThrough',
}

export type WillCallItemOption = {
  name: string;
  sku: string;
  partNumber: string;
  status: string;
  isDisabled: boolean;
};

export type Props = {
  options?: ProductType[];
  className?: string;
  id?: string;
  label: string;
  isSearchLoading?: boolean;
  onItemSearch: (searchValue: string) => void;
  onWillCallItemClick: (item: ProductType) => void;
};
