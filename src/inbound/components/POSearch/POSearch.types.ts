/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { PODashboardDataRowType } from '@inbound/types/types';

export type POItemOption = {
  vendorName: string;
  poNumber: number;
};

export type Props = {
  id?: string;
  className?: string;
  searchValue?: string;
  options: PODashboardDataRowType[];
  label: string;
  isSearchLoading?: boolean;
  onItemSearch?: (searchValue: string) => void;
  onPOItemClick: (item: PODashboardDataRowType | string) => void;
};
