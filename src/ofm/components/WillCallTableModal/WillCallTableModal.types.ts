/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { WillCallRowTypes } from '@shared/components/Table/Table.types';

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  dcName: string;
  willCallRowsData: WillCallRowTypes[];
  handleRowChange?: (row: WillCallRowTypes) => void;
  handleRowDelete?: (row: WillCallRowTypes, shouldCloseModal?: boolean) => void;
};
