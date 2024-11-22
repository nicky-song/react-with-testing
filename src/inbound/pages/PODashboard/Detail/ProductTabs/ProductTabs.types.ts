/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

export type Tab = {
  value: string;
  numberOfItems: number;
  name: string;
  item: () => JSX.Element;
};

export interface Props {
  tabs: Array<Tab>;
}
