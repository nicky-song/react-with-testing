/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Props as StatusBadgeProps } from '@shared/components/StatusBadge/StatusBadge.types';
export type TileProps = {
  title?: string;
  description?: string;
  statusBadge?: StatusBadgeProps;
  action?: string;
};
