/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import dayjs from 'dayjs';
import { WaveData } from '../components/WaveContainer/WaveContainer.types';
import { getWave } from '../utils/waves/waveUtils';
import { ScheduleDays, ScheduleWeek } from '../components/ScheduleSection/ScheduleSection.types';
import { StatusVariants } from '@shared/components/StatusBadge/StatusBadge.types';
import {
  WillCallItemOption,
  WillCallItemStatus,
} from '@ofm/components/WillCallSearch/WillCallSearch.types';
import { ProductType } from '@ofm/types/types';
import { ProductStatus } from './constants';

const CREDIT_MOCK_DATA = [
  {
    id: '1',
    sku: '000991132',
    partNumber: 'TMK-2.5',
    description: 'POLYURETHANE WHEELS',
    pack: 10,
    packReceivedCurrent: 0,
    packReceivedMax: 2,
    quantityReceivedCurrent: 0,
    quantityReceivedMax: 20,
  },
  {
    id: '2',
    sku: '000991132',
    partNumber: 'TMK-2.5',
    description: 'POLYURETHANE WHEELS',
    pack: 1,
    packReceivedCurrent: 0,
    packReceivedMax: 10,
    quantityReceivedCurrent: 0,
    quantityReceivedMax: 10,
  },
  {
    id: '3',
    sku: '000991132',
    partNumber: 'TMK-2.5',
    description: 'TEST ITEM NUMBER 1',
    pack: 20,
    packReceivedCurrent: 0,
    packReceivedMax: 3,
    quantityReceivedCurrent: 0,
    quantityReceivedMax: 60,
  },
  {
    id: '4',
    sku: '000991132',
    partNumber: 'TMK-2.5',
    description: 'TEST ITEM NUMBER 2',
    pack: 2,
    packReceivedCurrent: 0,
    packReceivedMax: 4,
    quantityReceivedCurrent: 0,
    quantityReceivedMax: 8,
  },
];

const USER_MOCK_DATA = {
  imageUrl: undefined,
  firstName: 'Richard',
  lastName: 'McCarthy',
  title: 'Computer Room Operator',
};

const WAVE_TODAY = dayjs().startOf('day').add(10, 'hour');

const WAVE_MOCK_DATA: WaveData[] = [
  {
    id: '1',
    date: WAVE_TODAY.toDate(),
    status: StatusVariants.NOT_STARTED,
    statusText: 'NOT STARTED',
    wave: `Wave ${getWave(WAVE_TODAY.day(), WAVE_TODAY.hour(), ScheduleDays.FRIDAY)}`,
    flaggedCount: 1,
    storeCount: 0,
    storeMax: 70,
  },
  {
    id: '2',
    date: WAVE_TODAY.add(10, 'hour').toDate(),
    status: StatusVariants.NOT_STARTED,
    statusText: 'NOT STARTED',
    wave: `Wave ${getWave(
      WAVE_TODAY.add(10, 'hour').day(),
      WAVE_TODAY.add(10, 'hour').hour(),
      ScheduleDays.FRIDAY
    )}`,
    flaggedCount: 2,
    storeCount: 0,
    storeMax: 80,
  },
  {
    id: '3',
    date: WAVE_TODAY.add(1, 'day').toDate(),
    status: StatusVariants.NOT_STARTED,
    statusText: 'NOT STARTED',
    wave: `Wave ${getWave(
      WAVE_TODAY.add(1, 'day').day(),
      WAVE_TODAY.add(1, 'day').hour(),
      ScheduleDays.FRIDAY
    )}`,
    storeCount: 0,
    storeMax: 80,
  },
  {
    id: '4',
    date: WAVE_TODAY.add(1, 'day').add(6, 'hour').toDate(),
    status: StatusVariants.NOT_STARTED,
    statusText: 'NOT STARTED',
    wave: `Wave ${getWave(
      WAVE_TODAY.add(1, 'day').add(6, 'hour').day(),
      WAVE_TODAY.add(1, 'day').add(6, 'hour').hour(),
      ScheduleDays.FRIDAY
    )}`,
    storeCount: 0,
    storeMax: 70,
  },
  {
    id: '5',
    date: WAVE_TODAY.add(1, 'day').add(10, 'hour').toDate(),
    status: StatusVariants.NOT_STARTED,
    statusText: 'NOT STARTED',
    wave: `Wave ${getWave(
      WAVE_TODAY.add(1, 'day').add(10, 'hour').day(),
      WAVE_TODAY.add(1, 'day').add(10, 'hour').hour(),
      ScheduleDays.FRIDAY,
      16
    )}`,
    storeCount: 0,
    storeMax: 80,
  },
  {
    id: '6',
    date: WAVE_TODAY.add(2, 'day').toDate(),
    status: StatusVariants.NOT_STARTED,
    statusText: 'NOT STARTED',
    wave: `Wave ${getWave(
      WAVE_TODAY.add(2, 'day').day(),
      WAVE_TODAY.add(2, 'day').hour(),
      ScheduleDays.FRIDAY
    )}`,
    storeCount: 0,
    storeMax: 80,
  },
  {
    id: '7',
    date: WAVE_TODAY.add(2, 'day').add(10, 'hour').toDate(),
    status: StatusVariants.NOT_STARTED,
    statusText: 'NOT STARTED',
    wave: `Wave ${getWave(
      WAVE_TODAY.add(2, 'day').add(10, 'hour').day(),
      WAVE_TODAY.add(2, 'day').add(10, 'hour').hour(),
      ScheduleDays.FRIDAY
    )}`,
    storeCount: 0,
    storeMax: 80,
  },
  {
    id: '8',
    date: WAVE_TODAY.add(3, 'day').toDate(),
    status: StatusVariants.NOT_STARTED,
    statusText: 'NOT STARTED',
    wave: `Wave ${getWave(
      WAVE_TODAY.add(3, 'day').day(),
      WAVE_TODAY.add(3, 'day').hour(),
      ScheduleDays.FRIDAY
    )}`,
    storeCount: 0,
    storeMax: 80,
  },
  {
    id: '9',
    date: WAVE_TODAY.add(3, 'day').add(10, 'hour').toDate(),
    status: StatusVariants.NOT_STARTED,
    statusText: 'NOT STARTED',
    wave: `Wave ${getWave(
      WAVE_TODAY.add(3, 'day').add(10, 'hour').day(),
      WAVE_TODAY.add(3, 'day').add(10, 'hour').hour(),
      ScheduleDays.FRIDAY
    )}`,
    storeCount: 0,
    storeMax: 80,
  },
  {
    id: '10',
    date: WAVE_TODAY.subtract(2, 'day').add(10, 'hour').toDate(),
    status: StatusVariants.NOT_STARTED,
    statusText: 'NOT STARTED',
    wave: `Wave ${getWave(
      WAVE_TODAY.subtract(2, 'day').add(10, 'hour').day(),
      WAVE_TODAY.subtract(2, 'day').add(10, 'hour').hour(),
      ScheduleDays.FRIDAY
    )}`,
    storeCount: 0,
    storeMax: 80,
  },
  {
    id: '11',
    date: WAVE_TODAY.subtract(1, 'day').add(10, 'hour').toDate(),
    status: StatusVariants.NOT_STARTED,
    statusText: 'NOT STARTED',
    wave: `Wave ${getWave(
      WAVE_TODAY.subtract(1, 'day').add(10, 'hour').day(),
      WAVE_TODAY.subtract(1, 'day').add(10, 'hour').hour(),
      ScheduleDays.FRIDAY
    )}`,
    storeCount: 0,
    storeMax: 80,
  },
];

const MOCK_WILL_CALL_ITEM_PRODUCT_OPTIONS: ProductType[] = [
  {
    sku: '000991131',
    description: 'Polyurethane Wheels Lorem',
    partNumber: 'TMK-2.5',
    status: ProductStatus.CLEARANCE,
    pack: 10,
    upc: '111',
    planogramId: '123',
    warehouseDetails: [
      {
        warehouseId: '20',
        warehouseName: 'DC 20',
        quantityOnHand: 800,
        minimumPack: 2,
      },
      {
        warehouseId: '60',
        warehouseName: 'DC 60',
        quantityOnHand: 100,
        minimumPack: 2,
      },
      {
        warehouseId: '73',
        warehouseName: 'DC 73',
        quantityOnHand: 40,
        minimumPack: 0,
      },
    ],
  },
  {
    sku: '000991132',
    description: 'Polyurethane Wheels X',
    partNumber: 'TMK-2.5',
    status: ProductStatus.SELL_THROUGH,
    pack: 10,
    upc: '222',
    planogramId: '123',
    warehouseDetails: [
      {
        warehouseId: '20',
        warehouseName: 'DC 20',
        quantityOnHand: 800,
        minimumPack: 2,
      },
      {
        warehouseId: '60',
        warehouseName: 'DC 60',
        quantityOnHand: 100,
        minimumPack: 2,
      },
      {
        warehouseId: '73',
        warehouseName: 'DC 73',
        quantityOnHand: 40,
        minimumPack: 0,
      },
    ],
  },
  {
    sku: '000991133',
    description: 'Polyurethane Wheels',
    partNumber: 'TMK-2.5',
    status: ProductStatus.SELL_THROUGH,
    pack: 10,
    upc: '333',
    planogramId: '123',
    warehouseDetails: [
      {
        warehouseId: '20',
        warehouseName: 'DC 20',
        quantityOnHand: 800,
        minimumPack: 2,
      },
      {
        warehouseId: '60',
        warehouseName: 'DC 60',
        quantityOnHand: 100,
        minimumPack: 2,
      },
      {
        warehouseId: '73',
        warehouseName: 'DC 73',
        quantityOnHand: 40,
        minimumPack: 0,
      },
    ],
  },
  {
    sku: '000991134',
    description: 'Polyurethane Wheels',
    partNumber: 'TMK-2.5',
    status: ProductStatus.NEW,
    pack: 10,
    upc: '444',
    planogramId: '123',
    warehouseDetails: [
      {
        warehouseId: '20',
        warehouseName: 'DC 20',
        quantityOnHand: 800,
        minimumPack: 2,
      },
      {
        warehouseId: '60',
        warehouseName: 'DC 60',
        quantityOnHand: 100,
        minimumPack: 2,
      },
      {
        warehouseId: '73',
        warehouseName: 'DC 73',
        quantityOnHand: 40,
        minimumPack: 0,
      },
    ],
  },
  {
    sku: '000991135',
    description: 'Polyurethane Pads',
    partNumber: 'TMK-2.5',
    status: ProductStatus.DISCONTINUED,
    pack: 10,
    upc: '555',
    planogramId: '123',
    warehouseDetails: [
      {
        warehouseId: '20',
        warehouseName: 'DC 20',
        quantityOnHand: 800,
        minimumPack: 2,
      },
      {
        warehouseId: '60',
        warehouseName: 'DC 60',
        quantityOnHand: 100,
        minimumPack: 2,
      },
      {
        warehouseId: '73',
        warehouseName: 'DC 73',
        quantityOnHand: 40,
        minimumPack: 0,
      },
    ],
  },
  {
    sku: '000891131',
    description: 'Nylon Wheels Lorem',
    partNumber: 'TMK-2.5',
    status: ProductStatus.CLEARANCE,
    pack: 10,
    upc: '666',
    planogramId: '123',
    warehouseDetails: [
      {
        warehouseId: '20',
        warehouseName: 'DC 20',
        quantityOnHand: 800,
        minimumPack: 2,
      },
      {
        warehouseId: '60',
        warehouseName: 'DC 60',
        quantityOnHand: 100,
        minimumPack: 2,
      },
      {
        warehouseId: '73',
        warehouseName: 'DC 73',
        quantityOnHand: 40,
        minimumPack: 0,
      },
    ],
  },
  {
    sku: '000891132',
    description: 'Nylon Wheels X',
    partNumber: 'ZMK-3.5',
    status: ProductStatus.SELL_THROUGH,
    pack: 10,
    upc: '777',
    planogramId: '123',
    warehouseDetails: [
      {
        warehouseId: '20',
        warehouseName: 'DC 20',
        quantityOnHand: 800,
        minimumPack: 2,
      },
      {
        warehouseId: '60',
        warehouseName: 'DC 60',
        quantityOnHand: 100,
        minimumPack: 2,
      },
      {
        warehouseId: '73',
        warehouseName: 'DC 73',
        quantityOnHand: 40,
        minimumPack: 0,
      },
    ],
  },
  {
    sku: '000891133',
    description: 'Nylon Wheels',
    partNumber: 'ZMK-3.5',
    status: ProductStatus.SELL_THROUGH,
    pack: 10,
    upc: '888',
    planogramId: '123',
    warehouseDetails: [
      {
        warehouseId: '20',
        warehouseName: 'DC 20',
        quantityOnHand: 800,
        minimumPack: 2,
      },
      {
        warehouseId: '60',
        warehouseName: 'DC 60',
        quantityOnHand: 100,
        minimumPack: 2,
      },
      {
        warehouseId: '73',
        warehouseName: 'DC 73',
        quantityOnHand: 40,
        minimumPack: 0,
      },
    ],
  },
  {
    sku: '000891134',
    description: 'Nylon Wheels',
    partNumber: 'ZMK-3.5',
    status: ProductStatus.NEW,
    pack: 10,
    upc: '999',
    planogramId: '123',
    warehouseDetails: [
      {
        warehouseId: '20',
        warehouseName: 'DC 20',
        quantityOnHand: 800,
        minimumPack: 2,
      },
      {
        warehouseId: '60',
        warehouseName: 'DC 60',
        quantityOnHand: 100,
        minimumPack: 2,
      },
      {
        warehouseId: '73',
        warehouseName: 'DC 73',
        quantityOnHand: 40,
        minimumPack: 0,
      },
    ],
  },
  {
    sku: '000891135',
    description: 'Nylon Pads',
    partNumber: 'ZMK-3.5',
    status: ProductStatus.DISCONTINUED,
    pack: 10,
    upc: '000',
    planogramId: '123',
    warehouseDetails: [
      {
        warehouseId: '20',
        warehouseName: 'DC 20',
        quantityOnHand: 800,
        minimumPack: 2,
      },
      {
        warehouseId: '60',
        warehouseName: 'DC 60',
        quantityOnHand: 100,
        minimumPack: 2,
      },
      {
        warehouseId: '73',
        warehouseName: 'DC 73',
        quantityOnHand: 40,
        minimumPack: 0,
      },
    ],
  },
];

const MOCK_WILL_CALL_ITEM_OPTIONS: WillCallItemOption[] = [
  {
    name: 'Polyurethane Wheels Lorem',
    sku: '000991131',
    partNumber: 'TMK-2.5',
    status: WillCallItemStatus['CLEARANCE'],
    isDisabled: false,
  },
  {
    name: 'Polyurethane Wheels X',
    sku: '000991132',
    partNumber: 'TMK-2.5',
    status: WillCallItemStatus['SELL_THROUGH'],
    isDisabled: false,
  },
  {
    name: 'Polyurethane Wheels',
    sku: '000991133',
    partNumber: 'TMK-2.5',
    status: WillCallItemStatus['SELL_THROUGH'],
    isDisabled: false,
  },
  {
    name: 'Polyurethane Wheels',
    sku: '000991134',
    partNumber: 'TMK-2.5',
    status: WillCallItemStatus['NEW'],
    isDisabled: true,
  },
  {
    name: 'Polyurethane Pads',
    sku: '000991135',
    partNumber: 'TMK-2.5',
    status: WillCallItemStatus['DISCONTINUED'],
    isDisabled: true,
  },
  {
    name: 'Nylon Wheels Lorem',
    sku: '000891131',
    partNumber: 'TMK-2.1',
    status: WillCallItemStatus['CLEARANCE'],
    isDisabled: false,
  },
  {
    name: 'Nylon Wheels X',
    sku: '000891132',
    partNumber: 'TMK-2.1',
    status: WillCallItemStatus['SELL_THROUGH'],
    isDisabled: false,
  },
  {
    name: 'Nylon Wheels',
    sku: '000891133',
    partNumber: 'TMK-2.1',
    status: WillCallItemStatus['SELL_THROUGH'],
    isDisabled: false,
  },
  {
    name: 'Nylon Wheels',
    sku: '000891134',
    partNumber: 'TMK-2.1',
    status: WillCallItemStatus['NEW'],
    isDisabled: true,
  },
  {
    name: 'Nylon Pads',
    sku: '000891135',
    partNumber: 'TMK-2.1',
    status: WillCallItemStatus['DISCONTINUED'],
    isDisabled: true,
  },
];

const MAX_VISIBLE_COMMENTS = 2;

const SEARCH_PROPERTIES = {
  STORE: {
    queryParam: 'store',
    search: 'search',
  },
};

const WEEK_DAYS_MAP: Record<string, keyof ScheduleWeek> = {
  SUN: 'sunday',
  MON: 'monday',
  TUE: 'tuesday',
  WED: 'wednesday',
  THU: 'thursday',
  FRI: 'friday',
  SAT: 'saturday',
};

export {
  CREDIT_MOCK_DATA,
  USER_MOCK_DATA,
  WAVE_MOCK_DATA,
  MAX_VISIBLE_COMMENTS,
  SEARCH_PROPERTIES,
  MOCK_WILL_CALL_ITEM_OPTIONS,
  MOCK_WILL_CALL_ITEM_PRODUCT_OPTIONS,
  WEEK_DAYS_MAP,
};
