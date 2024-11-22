/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ProductType } from '@ofm/types/types';

export type Props = {
  data?: ProductType[];
  maxEntries?: number;
  onItemClick?: (item: ProductType) => void;
  setSuggestionWasHidden?: (arg: boolean) => void;
};
