/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ReactNode } from 'react';

export type Tab = {
  value: string;
  numberOfItems: number;
  name: string;
  content: ReactNode;
};
export interface Props {
  tabs: Array<Tab>;
}