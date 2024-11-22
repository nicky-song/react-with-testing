/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { PODashboardDataRowType } from '@inbound/types/types';

export type Props = {
  data?: PODashboardDataRowType[];
  maxEntries?: number;
  searchValue?: string;
  onItemClick?: (item: PODashboardDataRowType | string) => void;
  setSuggestionWasHidden?: (status: boolean) => void;
};
