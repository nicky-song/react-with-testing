/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { StatusVariants } from '@shared/components/StatusBadge/StatusBadge.types';
import { PO_TYPES } from '@taskManagement/constants/constants';

export const widgetData = [
  {
    widgetTitle: 'ShiftProgress',
    tileData: {
      title: 'Shift Progress',
      description: 'test-description',
      statusBadge: {
        variant: StatusVariants.IN_PROGRESS,
        text: '8 hours Left',
      },
      action: 'view-all',
    },
    shift: '2nd shift',
    assignedUsersCount: 8,
    departmentUser: 'Inbound AutoZoners',
    lastShiftGoal: 0,
    lastShiftPo: {
      value: 188,
      max: 190,
      po: 2,
    },
    unReceivedPoCount: 0,
    isShiftGoal: false,
    currentShiftGoal: 0,
    poType: [
      {
        label: PO_TYPES.REGULAR_PO,
        value: 0,
      },
      {
        label: PO_TYPES.DSD,
        value: 0,
      },
      {
        label: PO_TYPES.LTD,
        value: 0,
      },
    ],
  },
  {
    widgetTitle: '72HoursPoArrival',
    tileData: {
      title: '72 Hours PO Arrival (Not Received)',
      description: 'test-description',
      statusBadge: {
        variant: StatusVariants.IN_PROGRESS,
        text: '8 hourse Left',
      },
      action: 'view-all',
    },
    shift: '1st shift',
  },
  {
    widgetTitle: 'UnassignedReplenishments',
    tileData: {
      title: 'Unassigned Replenishments',
      description: 'test-description',
      statusBadge: {
        variant: StatusVariants.IN_PROGRESS,
        text: '8 hourse Left',
      },
      action: 'view-all',
    },
  },
];
