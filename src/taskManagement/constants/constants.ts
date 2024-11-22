/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

export enum UserStatus {
  NOT_ACTIVE = `InboundTaskManager.UserStatus.NotActive`,
  ACTIVE = `InboundTaskManager.UserStatus.Active`,
  ALMOST_DONE = `InboundTaskManager.UserStatus.AlmostDone`,
}

export enum WidgetTypes {
  SHIFT_PROGRESS = 'ShiftProgress',
  PO_ARRIVAL = '72HoursPoArrival',
  Unassign_Replenishments = 'UnassignedReplenishments',
}

export enum PO_TYPES {
  REGULAR_PO = `ShiftProgress.POType.RegularPo`,
  DSD = `ShiftProgress.POType.DSD`,
  LTD = `ShiftProgress.POType.LTD`,
}

export const InboundTaskTypeFilter = [
  {
    value: 'Recommended',
  },
  {
    value: 'POs',
  },
  {
    value: 'Replenishments',
  },
  {
    value: 'Outbound',
  },
  {
    value: 'InventoryControl',
  },
  {
    value: 'GeneralTasks',
  },
];
