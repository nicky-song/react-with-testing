/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

export type AssignTaskDrawerProps = {
  userId: number;
  username?: string;
  name?: string;
  department?: string;
  onDrawerClose: (value: boolean) => void;
  OpenDrawer: boolean;
};
