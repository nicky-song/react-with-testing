/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ColumnParam } from '@shared/components/Table/Table.types';

import { StatusVariants } from '@shared/components/StatusBadge/StatusBadge.types';
import { OrderReleaseStatus } from '@outbound/constants/constants';
import {
  ORDER_RELEASE_LANE_ASSIGNMENT_TABLE_COLUMNS,
  ORDER_RELEASE_LTD_TABLE_COLUMNS,
  ORDER_RELEASE_NEW_STORE_ORDERS_TABLE_COLUMNS,
  ORDER_RELEASE_STORE_ORDERS_TABLE_COLUMNS,
  ORDER_RELEASE_WILL_CALL_SCHEDULED_TABLE_COLUMNS,
} from '@shared/components/Table/tableConstants';

export interface OrderType {
  label: string;
  columns: ColumnParam[];
  collapsible?: boolean;
  isSelectAll?: boolean;
}

export interface OrderTypes {
  [orderType: string]: OrderType;
}

export const releaseOrders: OrderTypes = {
  storeOrders: {
    label: 'OutboundMatrix.OrderRelease.Wave',
    columns: ORDER_RELEASE_STORE_ORDERS_TABLE_COLUMNS,
  },
  willCallOrders: {
    label: 'OutboundMatrix.OrderRelease.Wave',
    columns: ORDER_RELEASE_WILL_CALL_SCHEDULED_TABLE_COLUMNS,
    collapsible: false,
    isSelectAll: false,
  },
  newStoreOrders: {
    label: 'OutboundMatrix.OrderRelease.Store',
    columns: ORDER_RELEASE_NEW_STORE_ORDERS_TABLE_COLUMNS,
  },
  ltdOrders: {
    label: 'OutboundMatrix.OrderRelease.DC',
    columns: ORDER_RELEASE_LTD_TABLE_COLUMNS,
  },
  transferOrders: {
    label: 'OutboundMatrix.OrderRelease.Store',
    columns: ORDER_RELEASE_STORE_ORDERS_TABLE_COLUMNS,
  },
  releaseByMatrix: {
    label: 'OutboundMatrix.OrderRelease.Wave',
    columns: ORDER_RELEASE_LANE_ASSIGNMENT_TABLE_COLUMNS,
    collapsible: false,
    isSelectAll: false,
  },
};

export const waveStatus = {
  readyForRelease: {
    value: OrderReleaseStatus.READY_FOR_RELEASE,
    label: 'READY FOR RELEASE',
    variant: StatusVariants.READY_FOR_ACTION,
  },
  unReleased: {
    value: OrderReleaseStatus.UNRELEASED,
    label: 'UNRELEASED',
    variant: StatusVariants.READY_FOR_ACTION,
  },
  partiallyReleased: {
    value: OrderReleaseStatus.PARTIALLY_RELEASED,
    label: 'PARTIALLY RELEASED',
    variant: StatusVariants.IN_PROGRESS,
  },
  replenishmentNotRun: {
    value: OrderReleaseStatus.RPLENISHMENT_NOT_RUN,
    label: 'REPLENISHMENT NOT RUN',
    variant: StatusVariants.NOT_STARTED,
  },
};

export const allLaneOptions = [
  { label: 'LN1', value: 'ln1' },
  { label: 'LN2', value: 'ln2' },
  { label: 'LN3', value: 'ln3' },
  { label: 'LN4', value: 'ln4' },
  { label: 'LN5', value: 'ln5' },
  { label: 'LN6', value: 'ln6' },
  { label: 'LN7', value: 'ln7' },
  { label: 'LN8', value: 'ln8' },
  { label: 'LN9', value: 'ln9' },
];

export const wcLaneOptions = [
  { label: 'WC01', value: 'WC01' },
  { label: 'WC02', value: 'WC02' },
  { label: 'WC03', value: 'WC03' },
  { label: 'WC04', value: 'WC04' },
];

export const transferOrders = [
  {
    id: 2009987,
    due: '1/29/23 10:30',
    status: waveStatus.replenishmentNotRun,
    pcs: 8495,
    stores: [
      {
        storeNumber: '009987',
        pallets: 4,
        pieces: 121,
        comments: '',
      },
    ],
  },
];

export const ltdGroupingRecemmendations = [
  ['000172', '000173', '000174'],
  ['000176', '000177'],
  ['000182', '000183'],
];

export const ltdOrders = [
  {
    id: 21,
    status: waveStatus.replenishmentNotRun,
    pcs: 2045,
    pallets: 50,

    stores: [
      {
        storeNumber: '000171',
        pallets: 4,
        pieces: 121,
        status: waveStatus.replenishmentNotRun,
      },
      {
        storeNumber: '000172',
        pallets: 2,
        pieces: 100,
        status: waveStatus.replenishmentNotRun,
      },
      {
        storeNumber: '000173',
        pallets: 3,
        pieces: 152,
        status: waveStatus.replenishmentNotRun,
      },
      {
        storeNumber: '000174',
        pallets: 5,
        pieces: 150,
        status: waveStatus.replenishmentNotRun,
      },
      {
        storeNumber: '000175',
        pallets: 2,
        pieces: 121,
        status: waveStatus.replenishmentNotRun,
      },
      {
        storeNumber: '000176',
        pallets: 1,
        pieces: 145,
        status: waveStatus.replenishmentNotRun,
      },
      {
        storeNumber: '000177',
        pallets: 3,
        pieces: 121,
        status: waveStatus.replenishmentNotRun,
      },
      {
        storeNumber: '000178',
        pallets: 1,
        pieces: 124,
        status: waveStatus.replenishmentNotRun,
      },
    ],
  },
  {
    id: 22,
    status: waveStatus.replenishmentNotRun,
    pcs: 2455,
    pallets: 50,

    stores: [
      {
        storeNumber: '000181',
        pallets: 2,
        pieces: 121,
        status: waveStatus.replenishmentNotRun,
      },
      {
        storeNumber: '000182',
        pallets: 4,
        pieces: 128,
        status: waveStatus.replenishmentNotRun,
      },
      {
        storeNumber: '000183',
        pallets: 3,
        pieces: 151,
        status: waveStatus.replenishmentNotRun,
      },
      {
        storeNumber: '000184',
        pallets: 5,
        pieces: 121,
        status: waveStatus.replenishmentNotRun,
      },
      {
        storeNumber: '000185',
        pallets: 1,
        pieces: 161,
        status: waveStatus.replenishmentNotRun,
      },
      {
        storeNumber: '000186',
        pallets: 2,
        pieces: 121,
        status: waveStatus.replenishmentNotRun,
      },
      {
        storeNumber: '000187',
        pallets: 3,
        pieces: 151,
        status: waveStatus.replenishmentNotRun,
      },
      {
        storeNumber: '000188',
        pallets: 5,
        pieces: 121,
        status: waveStatus.replenishmentNotRun,
      },
    ],
  },
  {
    id: 23,
    status: waveStatus.replenishmentNotRun,
    pcs: 2745,
    pallets: 50,
    stores: [
      {
        storeNumber: '000191',
        pallets: 4,
        pieces: 121,
        status: waveStatus.replenishmentNotRun,
      },
      {
        storeNumber: '000192',
        pallets: 2,
        pieces: 121,
        status: waveStatus.replenishmentNotRun,
      },
      {
        storeNumber: '000193',
        pallets: 1,
        pieces: 356,
        status: waveStatus.replenishmentNotRun,
      },
      {
        storeNumber: '000194',
        pallets: 4,
        pieces: 121,
        status: waveStatus.replenishmentNotRun,
      },
      {
        storeNumber: '000195',
        pallets: 1,
        pieces: 175,
        status: waveStatus.replenishmentNotRun,
      },
      {
        storeNumber: '000196',
        pallets: 2,
        pieces: 168,
        status: waveStatus.replenishmentNotRun,
      },
      {
        storeNumber: '000197',
        pallets: 3,
        pieces: 125,
        status: waveStatus.replenishmentNotRun,
      },
      {
        storeNumber: '000198',
        pallets: 2,
        pieces: 133,
        status: waveStatus.replenishmentNotRun,
      },
    ],
  },
];

export const replenishmentOrders_Today = [
  {
    id: 2018119,
    releaseBy: new Date('10/16/23 12:30:00'),
    comment: 'DSD, Mega/Area 6',
    status: waveStatus.replenishmentNotRun,
    pcs: 8495,

    stores: [
      {
        storeNumber: '000100',
        pallets: 4,
        pieces: 121,
        route: '0321',
        dispatchTime: new Date('10/16/23 09:10:00'),
      },
      {
        storeNumber: '000101',
        pallets: 2,
        pieces: 105,
        route: '0321',
        dispatchTime: new Date('10/16/23 09:30:00'),
      },
      {
        storeNumber: '000102',
        pallets: 3,
        pieces: 150,
        route: '0321',
        dispatchTime: new Date('10/16/23 09:50:00'),
        activity: 'Area 6',
      },
      {
        storeNumber: '000103',
        pallets: 1,
        pieces: 100,
        route: '0321',
        dispatchTime: new Date('10/16/23 10:15:00'),
      },
      {
        storeNumber: '000104',
        pallets: 4,
        pieces: 121,
        route: '0322',
        dispatchTime: new Date('10/16/23 10:45:00'),
      },
      {
        storeNumber: '000105',
        pallets: 2,
        pieces: 105,
        route: '0321',
        dispatchTime: new Date('10/16/23 10:55:00'),
      },
      {
        storeNumber: '000106',
        pallets: 3,
        pieces: 150,
        route: '0321',
        comments: 'Mega/Area 6',
        willCall: true,
        dispatchTime: new Date('10/16/23 11:15:00'),
      },
      {
        storeNumber: '000107',
        pallets: 1,
        pieces: 100,
        route: '0321',
        dispatchTime: new Date('10/16/23 11:30:00'),
      },
      {
        storeNumber: '000108',
        pallets: 1,
        pieces: 144,
        route: '0322',
        dispatchTime: new Date('10/16/23 11:30:00'),
      },
    ],
  },
  {
    id: 2018122,
    releaseBy: new Date('10/16/23 12:30:00'),
    comment: 'DSD',
    status: waveStatus.partiallyReleased,
    pcs: 8586,

    stores: [
      {
        storeNumber: '000111',
        pallets: 4,
        pieces: 121,
        route: '0321',
        dispatchTime: new Date('10/16/23 09:10:00'),
      },
      {
        storeNumber: '000112',
        pallets: 2,
        pieces: 105,
        route: '0321',
        dispatchTime: new Date('10/16/23 09:24:00'),
      },
      {
        storeNumber: '000113',
        pallets: 3,
        pieces: 150,
        route: '0322',
        dispatchTime: new Date('10/16/23 09:30:00'),
      },
      {
        storeNumber: '000114',
        pallets: 1,
        pieces: 100,
        route: '0321',
        activity: 'Area 6',
        dispatchTime: new Date('10/16/23 10:15:00'),
      },
      {
        storeNumber: '000115',
        pallets: 4,
        pieces: 121,
        route: '0321',
        dispatchTime: new Date('10/16/23 10:32:00'),
      },
      {
        storeNumber: '000116',
        pallets: 2,
        pieces: 105,
        route: '0321',
        dispatchTime: new Date('10/16/23 11:12:00'),
      },
      {
        storeNumber: '000117',
        pallets: 3,
        pieces: 150,
        route: '0321',
        dispatchTime: new Date('10/16/23 11:30:00'),
      },
      {
        storeNumber: '000118',
        pallets: 1,
        pieces: 100,
        route: '0321',
        dispatchTime: new Date('10/16/23 12:10:00'),
      },
      {
        storeNumber: '000119',
        pallets: 1,
        pieces: 144,
        route: '0322',
        dispatchTime: new Date('10/16/23 11:30:00'),
      },
    ],
  },
];

export const replenishmentOrders_Upcomming = [
  {
    id: 244586,
    releaseBy: new Date('10/16/23 12:30:00'),
    comment: 'DSD',
    status: waveStatus.partiallyReleased,
    pcs: 8486,

    stores: [
      {
        storeNumber: '000121',
        pallets: 4,
        pieces: 121,
        route: '0321',
        dispatchTime: new Date('10/16/23 09:10:00'),
      },
      {
        storeNumber: '000122',
        pallets: 2,
        pieces: 105,
        route: '0322',
        dispatchTime: new Date('10/16/23 09:10:00'),
      },
      {
        storeNumber: '000123',
        pallets: 3,
        pieces: 150,
        route: '0322',
        dispatchTime: new Date('10/16/23 10:15:00'),
      },
      {
        storeNumber: '000124',
        pallets: 1,
        pieces: 100,
        route: '0322',
        dispatchTime: new Date('10/16/23 10:15:00'),
      },
      {
        storeNumber: '000125',
        pallets: 4,
        pieces: 121,
        route: '0322',
        activity: 'Area 6',
        dispatchTime: new Date('10/16/23 11:30:00'),
      },
      {
        storeNumber: '000126',
        pallets: 2,
        pieces: 105,
        route: '0322',
        dispatchTime: new Date('10/16/23 11:30:00'),
      },
      {
        storeNumber: '000127',
        pallets: 3,
        pieces: 150,
        route: '0322',
        dispatchTime: new Date('10/16/23 12:10:00'),
      },
      {
        storeNumber: '000128',
        pallets: 1,
        pieces: 100,
        route: '0322',
        dispatchTime: new Date('10/16/23 12:10:00'),
      },
      {
        storeNumber: '000129',
        pallets: 1,
        pieces: 144,
        route: '0322',
        dispatchTime: new Date('10/16/23 11:30:00'),
      },
    ],
  },
  {
    id: 548596,
    releaseBy: new Date('10/16/23 12:30:00'),
    comment: 'DSD, Mega/Area 6',
    status: waveStatus.replenishmentNotRun,
    pcs: 8495,

    stores: [
      {
        storeNumber: '000131',
        pallets: 4,
        pieces: 121,
        route: '0321',
        dispatchTime: new Date('10/16/23 09:10:00'),
      },
      {
        storeNumber: '000132',
        pallets: 2,
        pieces: 105,
        route: '0321',
        dispatchTime: new Date('10/16/23 09:30:00'),
      },
      {
        storeNumber: '000133',
        pallets: 3,
        pieces: 150,
        route: '0321',
        dispatchTime: new Date('10/16/23 09:50:00'),
        activity: 'Area 6',
      },
      {
        storeNumber: '000134',
        pallets: 1,
        pieces: 100,
        route: '0321',
        dispatchTime: new Date('10/16/23 10:15:00'),
      },
      {
        storeNumber: '000135',
        pallets: 4,
        pieces: 121,
        route: '0322',
        dispatchTime: new Date('10/16/23 10:45:00'),
      },
      {
        storeNumber: '000136',
        pallets: 2,
        pieces: 105,
        route: '0321',
        dispatchTime: new Date('10/16/23 10:55:00'),
      },
      {
        storeNumber: '000137',
        pallets: 3,
        pieces: 150,
        route: '0321',
        comments: 'Mega/Area 6',
        willCall: true,
        dispatchTime: new Date('10/16/23 11:15:00'),
      },
      {
        storeNumber: '000138',
        pallets: 1,
        pieces: 100,
        route: '0321',
        dispatchTime: new Date('10/16/23 11:30:00'),
      },
      {
        storeNumber: '000139',
        pallets: 1,
        pieces: 144,
        route: '0322',
        dispatchTime: new Date('10/16/23 11:30:00'),
      },
    ],
  },
  {
    id: 201866,
    releaseBy: new Date('10/16/23 12:30:00'),
    comment: 'DSD',
    status: waveStatus.replenishmentNotRun,
    pcs: 8586,

    stores: [
      {
        storeNumber: '000141',
        pallets: 4,
        pieces: 121,
        route: '0321',
        dispatchTime: new Date('10/16/23 09:10:00'),
      },
      {
        storeNumber: '000142',
        pallets: 2,
        pieces: 105,
        route: '0321',
        dispatchTime: new Date('10/16/23 09:24:00'),
      },
      {
        storeNumber: '000144',
        pallets: 3,
        pieces: 150,
        route: '0322',
        dispatchTime: new Date('10/16/23 09:30:00'),
      },
      {
        storeNumber: '000145',
        pallets: 1,
        pieces: 100,
        route: '0321',
        activity: 'Area 6',
        dispatchTime: new Date('10/16/23 10:15:00'),
      },
      {
        storeNumber: '000146',
        pallets: 4,
        pieces: 121,
        route: '0321',
        dispatchTime: new Date('10/16/23 10:32:00'),
      },
      {
        storeNumber: '000147',
        pallets: 2,
        pieces: 105,
        route: '0321',
        dispatchTime: new Date('10/16/23 11:12:00'),
      },
      {
        storeNumber: '000148',
        pallets: 3,
        pieces: 150,
        route: '0321',
        dispatchTime: new Date('10/16/23 11:30:00'),
      },
      {
        storeNumber: '000149',
        pallets: 1,
        pieces: 100,
        route: '0321',
        dispatchTime: new Date('10/16/23 12:10:00'),
      },
      {
        storeNumber: '000150',
        pallets: 1,
        pieces: 144,
        route: '0322',
        dispatchTime: new Date('10/16/23 11:30:00'),
      },
    ],
  },
  {
    id: 748236,
    releaseBy: new Date('10/16/23 12:30:00'),
    comment: 'DSD',
    status: waveStatus.replenishmentNotRun,
    pcs: 8486,

    stores: [
      {
        storeNumber: '000151',
        pallets: 4,
        pieces: 121,
        route: '0321',
        dispatchTime: new Date('10/16/23 09:10:00'),
      },
      {
        storeNumber: '000152',
        pallets: 2,
        pieces: 105,
        route: '0322',
        dispatchTime: new Date('10/16/23 09:10:00'),
      },
      {
        storeNumber: '000153',
        pallets: 3,
        pieces: 150,
        route: '0322',
        dispatchTime: new Date('10/16/23 10:15:00'),
      },
      {
        storeNumber: '000154',
        pallets: 1,
        pieces: 100,
        route: '0322',
        dispatchTime: new Date('10/16/23 10:15:00'),
      },
      {
        storeNumber: '000155',
        pallets: 4,
        pieces: 121,
        route: '0322',
        activity: 'Area 6',
        dispatchTime: new Date('10/16/23 11:30:00'),
      },
      {
        storeNumber: '000156',
        pallets: 2,
        pieces: 105,
        route: '0322',
        dispatchTime: new Date('10/16/23 11:30:00'),
      },
      {
        storeNumber: '000157',
        pallets: 3,
        pieces: 150,
        route: '0322',
        dispatchTime: new Date('10/16/23 12:10:00'),
      },
      {
        storeNumber: '000158',
        pallets: 1,
        pieces: 100,
        route: '0322',
        dispatchTime: new Date('10/16/23 12:10:00'),
      },
      {
        storeNumber: '000159',
        pallets: 1,
        pieces: 144,
        route: '0322',
        dispatchTime: new Date('10/16/23 11:30:00'),
      },
    ],
  },
  {
    id: 478596,
    releaseBy: new Date('10/16/23 12:30:00'),
    comment: 'DSD',
    status: waveStatus.replenishmentNotRun,
    pcs: 8486,

    stores: [
      {
        storeNumber: '000161',
        pallets: 4,
        pieces: 121,
        route: '0321',
        dispatchTime: new Date('10/16/23 09:10:00'),
      },
      {
        storeNumber: '000162',
        pallets: 2,
        pieces: 105,
        route: '0322',
        dispatchTime: new Date('10/16/23 09:10:00'),
      },
      {
        storeNumber: '000163',
        pallets: 3,
        pieces: 150,
        route: '0322',
        dispatchTime: new Date('10/16/23 10:15:00'),
      },
      {
        storeNumber: '000164',
        pallets: 1,
        pieces: 100,
        route: '0322',
        dispatchTime: new Date('10/16/23 10:15:00'),
      },
      {
        storeNumber: '000165',
        pallets: 4,
        pieces: 121,
        route: '0322',
        activity: 'Area 6',
        dispatchTime: new Date('10/16/23 11:30:00'),
      },
      {
        storeNumber: '000166',
        pallets: 2,
        pieces: 105,
        route: '0322',
        dispatchTime: new Date('10/16/23 11:30:00'),
      },
      {
        storeNumber: '000167',
        pallets: 3,
        pieces: 150,
        route: '0322',
        dispatchTime: new Date('10/16/23 12:10:00'),
      },
      {
        storeNumber: '000168',
        pallets: 1,
        pieces: 100,
        route: '0322',
        dispatchTime: new Date('10/16/23 12:10:00'),
      },
      {
        storeNumber: '000169',
        pallets: 1,
        pieces: 144,
        route: '0322',
        dispatchTime: new Date('10/16/23 11:30:00'),
      },
    ],
  },
];

export const newStoreOrders = [
  {
    id: '154826',
    pallets: 36,
    pcs: 16000,
    closeBy: new Date('10/20/23 10:30:00'),
    status: waveStatus.replenishmentNotRun,

    subzones: [
      {
        subzone: 'BAB2',
        sku: 2000,
        pallets: 4,
        pieces: 10000,
        status: waveStatus.replenishmentNotRun,
      },
      {
        subzone: 'CRAC',
        pallets: 2,
        sku: 800,
        pieces: 8000,
        status: waveStatus.replenishmentNotRun,
      },
      {
        subzone: 'HPAL',
        pallets: 1,
        sku: 1200,
        pieces: 9000,
        status: waveStatus.replenishmentNotRun,
      },
    ],
  },
];

export const backupStoreOrders = [
  {
    id: '152489',
    pallets: 65,
    pcs: 8586,
    closeBy: new Date('10/03/23 10:30:00'),
    status: waveStatus.replenishmentNotRun,

    subzones: [
      {
        subzone: 'BAB3',
        sku: 3000,
        pallets: 8,
        pieces: 9000,
        status: waveStatus.replenishmentNotRun,
      },
      {
        subzone: 'KIUS',
        pallets: 2,
        sku: 300,
        pieces: 9000,
        status: waveStatus.replenishmentNotRun,
      },
      {
        subzone: 'PPS1',
        pallets: 7,
        sku: 1580,
        pieces: 9500,
        status: waveStatus.replenishmentNotRun,
      },
    ],
  },
];

export const willCallScheduleOrders = [
  {
    id: 20094859,
    releaseBy: new Date('10/16/23 12:30:00'),
    pcs: 996,
    status: waveStatus.unReleased,
    stores: [
      {
        storeNumber: '009453',
        pallets: 4,
        pieces: 121,
        route: '0321',
        dispatchTime: new Date('10/16/23 10:15:00'),
        willCall: true,
        status: waveStatus.replenishmentNotRun,
        activity: '',
      },
    ],
  },
];

export const willCallUnscheduleOrders = [
  {
    storeNumber: '003452',
    pallets: 1,
    pieces: 60,
    willCall: true,
    status: waveStatus.replenishmentNotRun,
    dispatchTime: new Date('10/16/23 11:15:00'),
    activity: '',
  },
  {
    storeNumber: '006789',
    pallets: 0,
    pieces: 45,
    willCall: true,
    status: waveStatus.replenishmentNotRun,
    dispatchTime: new Date('10/16/23 11:50:00'),
    activity: '',
  },
];
