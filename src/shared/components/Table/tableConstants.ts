/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

const STEPPER_MAX_VALUE = 5000;

const ERROR_TABLE_COLUMNS = [
  {
    label: 'ErrorTables.StoreNumber',
    id: 'storeId',
    textAlign: 'start' as const,
    isSorted: true,
    width: 'calc(var(--st-unit-25) * 2)',
  },
  {
    label: 'ErrorTables.ErrorStatus',
    id: 'errorStatus',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-25) * 4)',
    isSorted: true,
  },
  {
    label: 'ErrorTables.Attempts',
    id: 'attempts',
    textAlign: 'start' as const,
    isSorted: true,
    width: 'calc(var(--st-unit-25) * 2)',
  },
  {
    label: 'ErrorTables.CreatedAt',
    id: 'created',
    textAlign: 'start' as const,
    isSorted: true,
    width: 'calc(var(--st-unit-25) * 2)',
  },
  {
    label: 'ErrorTables.LastAttemptedAt',
    id: 'lastAttempted',
    textAlign: 'start' as const,
    isSorted: true,
    width: 'calc(var(--st-unit-25) * 2)',
  },
  { label: '', id: 'empty', textAlign: 'end' as const, width: 'calc(var(--st-unit-25) * 2)' },
];

const ORDER_DETAILS_TABLE_COLUMNS = [
  {
    label: '',
    id: 'checkbox',
    textAlign: 'start' as const,
    width: 'var(--st-unit-8)',
    isCheckbox: true,
  },
  {
    label: 'Table.OrderDetails.SKU',
    id: 'sku',
    textAlign: 'center' as const,
    width: 'calc(var(--st-unit-32) + var(--st-unit-3))',
    isSorted: true,
  },
  {
    label: 'Table.OrderDetails.PartNumber',
    id: 'partNumber',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-19) * 2 - 1px)',
    isSorted: true,
  },
  {
    label: 'Table.OrderDetails.PlanogramId',
    id: 'planogramId',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-19) * 2 - 1px)',
    isSorted: true,
  },
  {
    label: 'Table.OrderDetails.Description',
    id: 'description',
    textAlign: 'start' as const,
    isSorted: true,
    width: 'calc(var(--st-unit-30) * 2)',
  },
  {
    label: 'Table.OrderDetails.Pack',
    id: 'pack',
    textAlign: 'start' as const,
    width: 'var(--st-unit-25)',
    isSorted: true,
  },
  {
    label: 'Table.OrderDetails.QOH',
    id: 'qoh',
    textAlign: 'start' as const,
    width: 'var(--st-unit-25)',
    isSorted: true,
  },
  {
    label: 'Table.OrderDetails.Quantity',
    id: 'quantity',
    textAlign: 'start' as const,
    width: 'var(--st-unit-26)',
    isSorted: true,
  },
  { label: '', id: 'credited', width: 'var(--st-unit-14)' },
];
const ORDER_DETAILS_DRAWER_TABLE_COLUMNS = [
  {
    label: 'Table.OrderDetails.SKU',
    id: 'sku',
    textAlign: 'center' as const,
    width: 'calc(var(--st-unit-32) + var(--st-unit-3))',
    isSorted: true,
  },
  {
    label: 'Table.OrderDetails.PartNumber',
    id: 'partNumber',
    textAlign: 'start' as const,
    width: 'var(--st-unit-25)',
    isSorted: true,
  },
  {
    label: 'Table.OrderDetails.PlanogramId',
    id: 'planogramId',
    textAlign: 'start' as const,
    width: 'var(--st-unit-30)',
    isSorted: false,
  },
  {
    label: 'Table.OrderDetails.Subzone',
    id: 'subzone',
    textAlign: 'start' as const,
    width: 'var(--st-unit-25)',
    isSorted: true,
  },
  {
    label: 'Table.OrderDetails.Description',
    id: 'description',
    textAlign: 'start' as const,
    isSorted: false,
    width: 'calc(var(--st-unit-30) * 2)',
  },
  {
    label: 'Table.OrderDetails.Pack',
    id: 'pack',
    textAlign: 'start' as const,
    width: 'var(--st-unit-25)',
    isSorted: false,
  },
  {
    label: 'Table.OrderDetails.QOH',
    id: 'qoh',
    textAlign: 'start' as const,
    width: 'var(--st-unit-25)',
    isSorted: true,
  },
  {
    label: 'Table.OrderDetails.Quantity',
    id: 'quantity',
    textAlign: 'start' as const,
    width: 'var(--st-unit-25)',
    isSorted: false,
  },
  {
    label: 'Table.OrderDetails.Selectors',
    id: 'selector',
    textAlign: 'start' as const,
    width: 'calc((var(--st-unit-19) * 2) - var(--st-unit-1))',
    isSorted: false,
  },
];

const ORDER_DETAILS_CREDITED_TABLE_COLUMNS = [
  {
    label: 'Table.OrderDetails.SKU',
    id: 'sku',
    textAlign: 'center' as const,
    width: 'var(--st-unit-26)',
    isSorted: true,
  },
  {
    label: 'Table.OrderDetails.PartNumber',
    id: 'partNumber',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-19) * 2 - 1px)',
    isSorted: true,
  },
  {
    label: 'Table.OrderDetails.PlanogramId',
    id: 'planogramId',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-19) * 2 - 1px)',
    isSorted: true,
  },
  {
    label: 'Table.OrderDetails.Description',
    id: 'description',
    textAlign: 'start' as const,
    isSorted: true,
    width: 'calc(var(--st-unit-30) * 2)',
  },
  {
    label: 'Table.OrderDetails.Pack',
    id: 'pack',
    textAlign: 'start' as const,
    width: 'var(--st-unit-25)',
    isSorted: true,
  },
  {
    label: 'Table.OrderDetails.QOH',
    id: 'qoh',
    textAlign: 'start' as const,
    width: 'var(--st-unit-25)',
    isSorted: true,
  },
  {
    label: 'Table.OrderDetails.Quantity',
    id: 'quantity',
    textAlign: 'start' as const,
    width: 'var(--st-unit-26)',
    isSorted: true,
  },
  { label: '', id: 'credited', width: 'var(--st-unit-14)' },
];

const ORDER_DETAILS_QUANTITY_ANOMALY_TABLE_COLUMNS = [
  {
    label: '',
    id: 'checkbox',
    textAlign: 'start' as const,
    width: 'var(--st-unit-8)',
    isCheckbox: true,
  },
  {
    label: 'Table.OrderDetails.SKU',
    id: 'sku',
    textAlign: 'center' as const,
    width: 'calc(var(--st-unit-32) + var(--st-unit-3))',
    isSorted: true,
  },
  {
    label: 'Table.OrderDetails.PartNumber',
    id: 'partNumber',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-19) * 2 - 1px)',
    isSorted: true,
  },
  {
    label: 'Table.OrderDetails.PlanogramId',
    id: 'planogramId',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-19) * 2 - 2px)',
    isSorted: true,
  },
  {
    label: 'Table.OrderDetails.Description',
    id: 'description',
    textAlign: 'start' as const,
    isSorted: true,
    width: 'calc(var(--st-unit-30) * 2)',
  },
  {
    label: 'Table.OrderDetails.Pack',
    id: 'pack',
    textAlign: 'start' as const,
    width: 'var(--st-unit-25)',
    isSorted: true,
  },
  {
    label: 'Table.OrderDetails.QOH',
    id: 'qoh',
    textAlign: 'start' as const,
    width: 'var(--st-unit-25)',
    isSorted: true,
  },
  {
    label: 'Table.OrderDetails.Quantity',
    id: 'quantity',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-22) * 2)',
    isSorted: true,
  },
  { label: '', id: 'credited', width: 'var(--st-unit-14)' },
];

const STORE_DETAILS_TABLE_COLUMNS = [
  {
    label: 'Table.StoreDetails.InvoiceId',
    id: 'invoiceId',
    textAlign: 'start' as const,
    width: 'var(--st-unit-30)',
    isSorted: true,
  },
  {
    label: 'Table.StoreDetails.RequestBy',
    id: 'requestBy',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-18) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.StoreDetails.OrderType',
    id: 'orderType',
    textAlign: 'start' as const,
    width: 'calc((var(--st-unit-17) + 1px) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.StoreDetails.Status',
    id: 'status',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-25) * 2 - 4px)',
    isSorted: true,
  },
  {
    label: 'Table.StoreDetails.RequestedAt',
    id: 'requestedAt',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-21) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.StoreDetails.BilledAt',
    id: 'billedAt',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-21) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.StoreDetails.Lines',
    id: 'lines',
    textAlign: 'end' as const,
    width: 'calc(var(--st-unit-23) - 10px)',
    isSorted: true,
  },
  {
    label: 'Table.StoreDetails.Pieces',
    id: 'pieces',
    textAlign: 'end' as const,
    width: 'calc(var(--st-unit-22) - 10px)',
    isSorted: true,
  },
  {
    label: '',
    id: 'comments',
    textAlign: 'start' as const,
    width: 'var(--st-unit-14)',
  },
];

const WILL_CALL_TABLE_COLUMNS = [
  {
    label: '',
    id: 'checkbox',
    textAlign: 'start' as const,
    isCheckbox: true,
    width: 'var(--st-unit-10)',
  },
  {
    label: 'WillCall.Item.SKU',
    id: 'sku',
    textAlign: 'start' as const,
    isSorted: true,
    width: 'calc(var(--st-unit-32) + var(--st-unit-3))',
  },
  {
    label: 'WillCall.Item.Status',
    id: 'part',
    textAlign: 'start' as const,
    isSorted: true,
    width: 'var(--st-unit-32)',
  },
  {
    label: 'WillCall.Item.PartNumber',
    id: 'status',
    textAlign: 'start' as const,
    isSorted: true,
    width: 'var(--st-unit-25)',
  },
  {
    label: 'WillCall.Item.Description',
    id: 'description',
    textAlign: 'start' as const,
    isSorted: true,
    width: 'calc(var(--st-unit-16) * 2)',
  },
  {
    label: 'WillCall.Item.Pack',
    id: 'pack',
    textAlign: 'start' as const,
    isSorted: true,
    width: 'var(--st-unit-18)',
  },
  {
    label: 'WillCall.Item.NumberOfPacks',
    id: 'numOfPacks',
    textAlign: 'start' as const,
    width: 'var(--st-unit-25)',
  },
  {
    label: 'WillCall.Item.Quantity',
    id: 'quantity',
    textAlign: 'start' as const,
    isSorted: true,
    width: 'calc(var(--st-unit-25) * 2)',
  },
  {
    label: 'WillCall.Item.DCSource',
    id: 'dc',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-28) * 2)',
  },
];

const WILL_CALL_TABLE_MODAL_COLUMNS = [
  {
    label: 'WillCall.Item.SKU',
    id: 'sku',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-32) + var(--st-unit-3))',
  },
  {
    label: 'WillCall.Item.Status',
    id: 'part',
    textAlign: 'start' as const,
    width: 'calc((var(--st-unit-19) - 1px) * 2)',
  },
  {
    label: 'WillCall.Item.PartNumber',
    id: 'status',
    textAlign: 'start' as const,
    width: 'calc((var(--st-unit-19) - 1px) * 2)',
  },
  {
    label: 'WillCall.Item.Description',
    id: 'description',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 5)',
  },
  {
    label: 'WillCall.Item.Pack',
    id: 'pack',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-19) - 1px)',
  },
  {
    label: 'WillCall.Item.NumberOfPacks',
    id: 'numOfPacks',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
  },
  {
    label: 'WillCall.Item.Quantity',
    id: 'quantity',
    textAlign: 'start' as const,
    width: 'var(--st-unit-20)',
  },
  {
    label: '',
    id: 'optionsMenu',
    textAlign: 'end' as const,
    width: 'var(--st-unit-20)',
  },
];

const WILL_CALL_TABLE_MODAL_EDIT_COLUMNS = [
  {
    label: 'WillCall.Item.SKU',
    id: 'sku',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-32) + var(--st-unit-3))',
  },
  {
    label: 'WillCall.Item.Status',
    id: 'part',
    textAlign: 'start' as const,
    width: 'calc((var(--st-unit-19) - 1px) * 2)',
  },
  {
    label: 'WillCall.Item.PartNumber',
    id: 'status',
    textAlign: 'start' as const,
    width: 'calc((var(--st-unit-19) - 1px) * 2)',
  },
  {
    label: 'WillCall.Item.Description',
    id: 'description',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 5)',
  },
  {
    label: 'WillCall.Item.Pack',
    id: 'pack',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-19) - 1px)',
  },
  {
    label: 'WillCall.Item.NumberOfPacks',
    id: 'numOfPacks',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-15) * 2)',
  },
  {
    label: 'WillCall.Item.Quantity',
    id: 'quantity',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-25) * 2)',
  },
  {
    label: '',
    id: 'optionsMenu',
    textAlign: 'end' as const,
    width: 'calc(var(--st-unit-15) * 2 + 2px)',
  },
];

const WAREHOUSE_CONFIGURATION_TABLE_COLUMNS = [
  {
    label: 'Table.WarehouseConfiguration.DCNumber',
    id: 'dcNumber',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-10) * 2)',
    isSorted: false,
  },
  {
    label: 'Table.WarehouseConfiguration.Address',
    id: 'address',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-25) * 3)',
    isSorted: false,
  },
  {
    label: 'Table.WarehouseConfiguration.Description',
    id: 'description',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-10) * 4)',
    isSorted: false,
  },
  {
    label: 'Table.WarehouseConfiguration.ContactNumber',
    id: 'contactNumber',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-10) * 5)',
    isSorted: false,
  },
];

const ZONE_TABLE_COLUMNS = [
  {
    label: 'Table.ZoneList.ZoneName',
    id: 'zoneName',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-34))',
    isSorted: true,
  },
  {
    label: 'Table.ZoneList.MapSequence',
    id: 'mapSequence',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-25) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.ZoneList.Subzones',
    id: 'subzones',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-10))',
    isSorted: true,
  },
  {
    label: 'Table.ZoneList.Description',
    id: 'description',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-40))',
    isSorted: true,
  },
  { label: '', id: 'empty', textAlign: 'center' as const, width: 'var(--st-unit-13)' },
];

const ZONE_ASSOCIATED_SUBZONE_TABLE_COLUMNS = [
  {
    label: 'Table.SubzoneList.SubzoneName',
    id: 'subzoneName',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-25) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.SubzoneList.Description',
    id: 'description',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-30) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.SubzoneList.SubzoneType',
    id: 'subzoneType',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-25) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.SubzoneList.Locations',
    id: 'locations',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-10) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.SubzoneList.Vehicles',
    id: 'vehicles',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-10) * 2)',
    isSorted: true,
  },
  { label: '', id: 'empty', textAlign: 'center' as const, width: 'var(--st-unit-13)' },
];

const ORDER_RELEASE_STORE_ORDERS_TABLE_COLUMNS = [
  {
    label: 'Table.OrderRelease.StoreNumber',
    id: 'storeNumber',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 3)',
  },
  {
    label: 'Table.OrderRelease.Pallets',
    id: 'pallets',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
  },
  {
    label: 'Table.OrderRelease.Pieces',
    id: 'pieces',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
  },
  {
    label: 'Table.OrderRelease.RouteGroup',
    id: 'route',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
  },
  {
    label: 'Table.OrderRelease.DispatchTime',
    id: 'dispatchTime',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 3)',
  },
  {
    label: 'Table.OrderRelease.Activity',
    id: 'activity',
    textAlign: 'start' as const,
    width: '100%',
  },
  {
    label: '',
    id: 'lane',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-27) * 4)',
  },
  {
    label: '',
    id: 'optionsMenu',
    textAlign: 'end' as const,
    width: 'var(--st-unit-12)',
  },
];

const ORDER_RELEASE_LANE_ASSIGNMENT_TABLE_COLUMNS = [
  {
    label: 'Table.OrderRelease.StoreNumber',
    id: 'storeNumber',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 3)',
  },
  {
    label: 'Table.OrderRelease.Pallets',
    id: 'pallets',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
  },
  {
    label: 'Table.OrderRelease.Pieces',
    id: 'pieces',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
  },
  {
    label: '',
    id: 'route',
    textAlign: 'start' as const,
    width: '0',
  },
  {
    label: 'Table.OrderRelease.DispatchTime',
    id: 'dispatchTime',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 3)',
  },
  {
    label: 'Table.OrderRelease.Activity',
    id: 'activity',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 3)',
  },
  {
    label: '',
    id: 'lane',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 3)',
  },
  {
    label: '',
    id: 'optionsMenu',
    textAlign: 'end' as const,
    width: 'var(--st-unit-12)',
  },
];

const ORDER_RELEASE_NEW_STORE_ORDERS_TABLE_COLUMNS = [
  {
    label: 'Table.OrderRelease.Subzone',
    id: 'storeNumber',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 3)',
  },
  {
    label: 'Table.OrderRelease.SKU',
    id: 'sku',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 3)',
  },
  {
    label: 'Table.OrderRelease.Pallets',
    id: 'pallets',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 3)',
  },
  {
    label: 'Table.OrderRelease.Pieces',
    id: 'pieces',
    textAlign: 'start' as const,
    width: '100%',
  },
  {
    label: '',
    id: 'lane',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-27) * 4)',
  },
  {
    label: '',
    id: 'optionsMenu',
    textAlign: 'end' as const,
    width: 'var(--st-unit-12)',
  },
];

const ORDER_RELEASE_WILL_CALL_SCHEDULED_TABLE_COLUMNS = [
  {
    label: 'Table.OrderRelease.StoreNumber',
    id: 'storeNumber',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-30) * 2)',
  },
  {
    label: 'Table.OrderRelease.Pallets',
    id: 'pallets',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
  },
  {
    label: 'Table.OrderRelease.Pieces',
    id: 'pieces',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
  },
  {
    label: 'Table.OrderRelease.Route',
    id: 'route',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
  },
  {
    label: 'Table.OrderRelease.DispatchTime',
    id: 'dispatchTime',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-30) * 2)',
  },
  {
    label: 'Table.OrderRelease.Activity',
    id: 'activity',
    textAlign: 'start' as const,
    width: '100%',
  },
  {
    label: '',
    id: 'lane',
    textAlign: 'end' as const,
    width: 'calc(var(--st-unit-27) * 4)',
  },
  {
    label: '',
    id: 'optionsMenu',
    textAlign: 'end' as const,
    width: 'var(--st-unit-12)',
  },
];

const ORDER_RELEASE_WILL_CALL_UNSCHEDULED_TABLE_COLUMNS = [
  {
    label: 'Table.OrderRelease.StoreNumber',
    id: 'storeNumber',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-30) * 2)',
  },
  {
    label: 'Table.OrderRelease.Pallets',
    id: 'pallets',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
  },
  {
    label: 'Table.OrderRelease.Pieces',
    id: 'pieces',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
  },
  {
    label: '',
    id: 'route',
    textAlign: 'start' as const,
    width: '0',
  },
  {
    label: 'Table.OrderRelease.DispatchTime',
    id: 'dispatchTime',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-30) * 2)',
  },
  {
    label: 'Table.OrderRelease.Activity',
    id: 'activity',
    textAlign: 'start' as const,
    width: '100%',
  },
  {
    label: '',
    id: 'lane',
    textAlign: 'end' as const,
    width: 'calc(var(--st-unit-27) * 4)',
  },
  {
    label: '',
    id: 'optionsMenu',
    textAlign: 'end' as const,
    width: 'var(--st-unit-12)',
  },
];

const ORDER_RELEASE_LTD_TABLE_COLUMNS = [
  {
    label: 'Table.OrderRelease.StoreNumber',
    id: 'storeNumber',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 3)',
  },
  {
    label: 'Table.OrderRelease.Pallets',
    id: 'pallets',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 3)',
  },
  {
    label: 'Table.OrderRelease.Pieces',
    id: 'pieces',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 3)',
  },
  {
    label: '',
    id: 'route',
    textAlign: 'start' as const,
    width: '0',
  },
  {
    label: '',
    id: 'dispatchTime',
    textAlign: 'start' as const,
    width: '100%',
  },
  {
    label: '',
    id: 'activity',
    textAlign: 'start' as const,
    width: '0',
  },
  {
    label: '',
    id: 'lane',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-27) * 4)',
  },
  {
    label: '',
    id: 'optionsMenu',
    textAlign: 'end' as const,
    width: 'var(--st-unit-12)',
  },
];

const SUBZONE_TABLE_COLUMNS = [
  {
    label: 'Table.SubzoneList.SubzoneName',
    id: 'subzoneName',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-25) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.SubzoneList.ZoneName',
    id: 'zoneName',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-10) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.SubzoneList.Description',
    id: 'description',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-30) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.SubzoneList.SubzoneType',
    id: 'subzoneType',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-25) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.SubzoneList.PickRouteType',
    id: 'pickRouteType',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-22) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.SubzoneList.Locations',
    id: 'locations',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-14) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.SubzoneList.Vehicles',
    id: 'vehicles',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-10) * 2)',
    isSorted: true,
  },
  { label: '', id: 'empty', textAlign: 'center' as const, width: 'var(--st-unit-13)' },
];

const SUBZONE_ASSOCIATED_LOCATION_TABLE_COLUMNS = [
  {
    label: 'Table.LocationList.LocationId',
    id: 'locationId',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.LocationList.Type',
    id: 'type',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-10) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.LocationList.Stockroom',
    id: 'stockRoom',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-15) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.LocationList.SKU',
    id: 'sku',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.LocationList.QuantityUnits',
    id: 'quantityUnits',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-19) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.LocationList.QuantityReserved',
    id: 'quantityReserved',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-25) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.LocationList.Minimum',
    id: 'minimum',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-15) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.LocationList.Maximum',
    id: 'maximum',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-10) * 2)',
    isSorted: true,
  },
  { label: '', id: 'empty', textAlign: 'center' as const, width: 'var(--st-unit-13)' },
];

const SUBZONE_ASSOCIATED_VEHICLE_TABLE_COLUMNS = [
  {
    label: 'Table.VehicleList.VehicleId',
    id: 'vehicleId',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.VehicleList.Type',
    id: 'type',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
  },
  {
    label: 'Table.VehicleList.Description',
    id: 'description',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-30) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.VehicleList.FullPallet',
    id: 'fullPallet',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.VehicleList.PartPallet',
    id: 'partPallet',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
    isSorted: true,
  },
  {
    label: '',
    id: 'pickingAllowed',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-30) * 2)',
  },
  {
    label: '',
    id: 'putAwayAllowed',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-30) * 2)',
    isSorted: false,
  },
  { label: '', id: 'empty', textAlign: 'center' as const, width: 'var(--st-unit-13)' },
];

const LOCATION_TABLE_COLUMNS = [
  {
    label: 'Table.LocationList.LocationId',
    id: 'locationId',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.LocationList.Zone',
    id: 'zone',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-10) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.LocationList.Subzone',
    id: 'subzone',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.LocationList.SKU',
    id: 'sku',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.LocationList.LocationType',
    id: 'type',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-30) * 2)',
    isSorted: true,
  },
  { label: '', id: 'empty', textAlign: 'center' as const, width: 'var(--st-unit-13)' },
];

const CONSOLIDATION_LOCATION_TABLE_COLUMNS = [
  {
    label: 'Table.ConsolidationLocationList.LocationId',
    id: 'locationId',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.ConsolidationLocationList.Zone',
    id: 'zone',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-10) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.ConsolidationLocationList.Subzone',
    id: 'subzone',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-20) * 2)',
    isSorted: true,
  },
  {
    label: 'Table.ConsolidationLocationList.LocationType',
    id: 'type',
    textAlign: 'start' as const,
    width: 'calc(var(--st-unit-30) * 2)',
    isSorted: true,
  },
  { label: '', id: 'empty', textAlign: 'center' as const, width: 'var(--st-unit-13)' },
];

enum TableVariants {
  ERROR = 'error',
  ORDER_DETAILS = 'order-details',
  STORE_DETAILS = 'store-details',
  WILL_CALL = 'will-call',
}

enum TableStylingVariants {
  ERROR = 'error',
  DETAILS = 'details',
  MODAL = 'modal',
  DEFAULT = 'default',
  FILLED = 'filled',
  SIMPLE = 'simple',
}

export {
  TableVariants,
  ERROR_TABLE_COLUMNS,
  ORDER_DETAILS_TABLE_COLUMNS,
  ORDER_DETAILS_CREDITED_TABLE_COLUMNS,
  STEPPER_MAX_VALUE,
  STORE_DETAILS_TABLE_COLUMNS,
  ORDER_DETAILS_QUANTITY_ANOMALY_TABLE_COLUMNS,
  ORDER_DETAILS_DRAWER_TABLE_COLUMNS,
  TableStylingVariants,
  WILL_CALL_TABLE_COLUMNS,
  WILL_CALL_TABLE_MODAL_COLUMNS,
  WILL_CALL_TABLE_MODAL_EDIT_COLUMNS,
  WAREHOUSE_CONFIGURATION_TABLE_COLUMNS,
  ZONE_TABLE_COLUMNS,
  ORDER_RELEASE_STORE_ORDERS_TABLE_COLUMNS,
  ORDER_RELEASE_NEW_STORE_ORDERS_TABLE_COLUMNS,
  ORDER_RELEASE_WILL_CALL_SCHEDULED_TABLE_COLUMNS,
  ORDER_RELEASE_WILL_CALL_UNSCHEDULED_TABLE_COLUMNS,
  ORDER_RELEASE_LTD_TABLE_COLUMNS,
  ZONE_ASSOCIATED_SUBZONE_TABLE_COLUMNS,
  SUBZONE_TABLE_COLUMNS,
  SUBZONE_ASSOCIATED_LOCATION_TABLE_COLUMNS,
  SUBZONE_ASSOCIATED_VEHICLE_TABLE_COLUMNS,
  LOCATION_TABLE_COLUMNS,
  CONSOLIDATION_LOCATION_TABLE_COLUMNS,
  ORDER_RELEASE_LANE_ASSIGNMENT_TABLE_COLUMNS,
};
