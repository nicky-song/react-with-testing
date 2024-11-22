/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

export type Props = {
  title: string;
  label: string;
  showDrawer: boolean;
  setShowDrawer: (value: boolean) => void;
  storeId: string;
  setStoreId: (value: string) => void;
  stores: string[];
  onClick: () => void;
};
