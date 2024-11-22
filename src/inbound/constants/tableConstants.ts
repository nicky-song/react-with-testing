/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

const PO_DASHBOARD_TABLE_COLUMNS = [
  {
    label: '',
    id: 'priority',
    textAlign: 'center' as const,
    width: 'calc(var(--st-unit-15))',
    isSorted: false,
  },
  {
    label: 'PODashboard.Item.ArrivalTime',
    id: 'arrivalTime',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-18) * 2)',
    isSorted: true,
  },
  {
    label: 'PODashboard.Item.Vendor',
    id: 'vendorName',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-30) * 2)',
    isSorted: true,
  },
  {
    label: 'PODashboard.Item.PO',
    id: 'poNumber',
    textAlign: 'start' as const,
    width: 'var(--st-unit-30)',
    isSorted: false,
  },
  {
    label: 'PODashboard.Item.Door',
    id: 'door',
    textAlign: 'start' as const,
    width: 'var(--st-unit-20)',
    isSorted: false,
  },
  {
    label: 'PODashboard.Item.Loc',
    id: 'location',
    textAlign: 'start' as const,
    width: 'var(--st-unit-25)',
    isSorted: false,
  },
  {
    label: 'PODashboard.Item.Lines',
    id: 'lines',
    textAlign: 'start' as const,
    width: 'var(--st-unit-26)',
    isSorted: true,
  },
  {
    label: 'PODashboard.Item.Pieces',
    id: 'pieces',
    textAlign: 'start' as const,
    width: 'var(--st-unit-26)',
    isSorted: true,
  },
  {
    label: 'PODashboard.Item.Commodity',
    id: 'commodity',
    textAlign: 'start' as const,
    width: 'var(--st-unit-26)',
    isSorted: true,
  },
  {
    label: 'PODashboard.Item.POType',
    id: 'poType',
    textAlign: 'start' as const,
    width: 'var(--st-unit-22)',
    isSorted: false,
  },
  {
    label: 'PODashboard.Item.SKUsWithFPS',
    id: 'skusWithFPS',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
    isSorted: true,
  },
  {
    label: 'PODashboard.Item.Users',
    id: 'users',
    textAlign: 'start' as const,
    width: 'calc((var(--st-unit-19) * 2) - var(--st-unit-1))',
    isSorted: false,
  },
  {
    label: 'PODashboard.Item.Status',
    id: 'status',
    textAlign: 'start' as const,
    width: 'calc((var(--st-unit-29) * 2) - var(--st-unit-3))',
    isSorted: true,
  },
  { label: '', id: 'empty', textAlign: 'center' as const, width: 'var(--st-unit-13)' },
];

const PO_DETAILS_PRODUCT_TABLE_COLUMNS = [
  {
    label: 'PODashboard.ProductItem.ProductName',
    id: 'productName',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-25) * 4)',
    isSorted: true,
  },
  {
    label: 'PODashboard.ProductItem.PutLocations',
    id: 'putLocations',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-24) * 2)',
    isSorted: true,
  },
  {
    label: 'PODashboard.ProductItem.SKU',
    id: 'sku',
    textAlign: 'start' as const,
    width: 'var(--st-unit-28)',
    isSorted: false,
  },
  {
    label: 'PODashboard.ProductItem.PartHash',
    id: 'partNumber',
    textAlign: 'start' as const,
    width: 'var(--st-unit-28)',
    isSorted: false,
  },
  {
    label: 'PODashboard.ProductItem.Lines',
    id: 'lines',
    textAlign: 'start' as const,
    width: 'var(--st-unit-26)',
    isSorted: true,
  },
  {
    label: 'PODashboard.ProductItem.Pieces',
    id: 'pieces',
    textAlign: 'start' as const,
    width: 'var(--st-unit-26)',
    isSorted: true,
  },
];

export { PO_DASHBOARD_TABLE_COLUMNS, PO_DETAILS_PRODUCT_TABLE_COLUMNS };
