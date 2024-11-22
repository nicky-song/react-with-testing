/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

export interface cell {
  state: string;
  count: string;
  assigned?: number | null;
  vehicle?: string | null;
  selector?: string | null;
}

export interface srow {
  location: string;
  tile1: cell[];
  tile2: cell[];
}

export interface MatrixRow {
  location: string;
  tile1: cell[];
  tile2: cell[];
  subzones: srow[];
}

export type MatrixAccordionProps = {
  row: MatrixRow;
  open: string[];
  displayOptions: DisplayOptionsType;
};

export type MatrixHeaderProps = {
  displayOptions: DisplayOptionsType;
  onExpand: () => void;
  onCollapse: () => void;
};

export interface DisplayOptionsType {
  completedStores: boolean;
  waveDetails: boolean;
  vehicleCode: boolean;
  orderSelector: boolean;
  tileInfo: boolean;
}
