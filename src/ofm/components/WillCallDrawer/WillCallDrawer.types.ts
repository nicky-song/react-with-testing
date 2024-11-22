/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

export type Props = {
  title: string;
  showDrawer: boolean;
  setShowDrawer: (value: boolean) => void;
  setShowPreviousDrawer?: (value: boolean) => void;
  storeId: string;
  setSearchStoreId?: (value: string) => void;
};
