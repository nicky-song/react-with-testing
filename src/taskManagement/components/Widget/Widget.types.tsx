/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Props as StatusBadgeProps } from '@shared/components/StatusBadge/StatusBadge.types';

export type PoTypesProps = { label: string; value: number };

export type WidgetProps = {
  widgetTitle?: string;
  tileData?: {
    title: string;
    description: string;
    statusBadge: StatusBadgeProps;
    action: string;
  };
  shift?: string;
  assignedUsersCount?: number;
  departmentUser?: string;
  lastShiftGoal?: number;
  lastShiftPo?: {
    value: number;
    max: number;
    po: number;
  };
  unReceivedPoCount?: number;
  isShiftGoal?: boolean;
  currentShiftGoal?: number;
  poType?: PoTypesProps[];
};
