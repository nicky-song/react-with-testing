/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

export const WAREHOUSE_CONFIGURATION_TABLE_PAGE_SIZE = 1;

export const DEFAULT_CONSOLIDATION_STATUS = 'Available';
export const SEARCH_MENU_MAX_HEIGHT = 300;
export const DEFAULT_DIMENSION_UNIT = 'in';
export const FIELD_EVENT = {
  CHANGE: 'change',
};

export const LOCATION_TYPES = [
  {
    value: 'CONVEYOR',
    label: 'Conveyor',
  },
  {
    value: 'CONV_SORT',
    label: 'Conveyor Sort',
  },
  {
    value: 'DOCK',
    label: 'Dock',
  },
  {
    value: 'MRG_ORD',
    label: 'Merge Order',
  },
  {
    value: 'PACK',
    label: 'Pack',
  },
  {
    value: 'PAL_POS',
    label: 'Pallet Position',
  },
  {
    value: 'RECV_DOCK',
    label: 'Receiving Dock',
  },
  {
    value: 'RETURNS',
    label: 'Returns',
  },
  {
    value: 'SHIP_NCF',
    label: 'Ship NCF',
  },
  {
    value: 'STAGE',
    label: 'Stage',
  },
  {
    value: 'STAGE_PICK',
    label: 'Stage Pick',
  },
];

export const CONSOLIDATION_STATUS_OPTIONS = [
  {
    label: 'Available',
    value: 'AVAILABLE',
  },
  {
    label: 'Mixed',
    value: 'MIXED',
  },
  {
    label: 'Single',
    value: 'SINGLE',
  },
];

export const MAX_LENGTH_FIELD = {
  SUB_ZONE_CATEGORY_LABEL: 25,
  ZONE_MAP_SEQUENCE: 3,
};
