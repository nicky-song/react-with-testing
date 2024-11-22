/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { StatusVariants } from '../../../shared/components/StatusBadge/StatusBadge.types';

export type WaveData = {
  id: string;
  date: Date;
  wave: string;
  status: StatusVariants;
  statusText: string;
  storeCount: number;
  storeMax: number;
  flaggedCount?: number;
};

export type Props = {
  data: WaveData[];
  isDefaultSort?: boolean;
  withWaveDisplay?: boolean;
};
