/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import en from 'dayjs/locale/en';
import es from 'dayjs/locale/es';
import pt from 'dayjs/locale/pt';

export enum Language {
  ENGLISH = 'en',
  SPANISH = 'es',
  PORTUGUESE = 'pt',
}

export const supportedLocales = {
  [Language.ENGLISH]: en,
  [Language.SPANISH]: es,
  [Language.PORTUGUESE]: pt,
};

export const Country = {
  US: 'US',
  CA: 'CA',
  MX: 'MX',
  BR: 'BR',
};

export const Warehouses = {
  LOCAL: [Country.US, Country.CA],
  INTERNATIONAL: [Country.MX, Country.BR],
};

export const DEBOUNCE_TIMER = 320;
export const EXPIRATION_INTERVAL_DURATION = 1000 * 60;
export const EXPIRATION_MINUTES_BEFORE_REFRESH = 3;
export const IDLE_INTERVAL_DURATION = 1000 * 60 * 60;
export const IDLE_MINUTES_BEFORE_LOGOUT = 120;

export const MIN_FIELD_LENGTH = 3;
export const MAX_TEXTFIELD_LENGTH = 70;
export const MAX_REASON_LENGTH = 100;
export const MAX_TEXTAREA_LENGTH = 350;
export const MAX_VISIBLE_AVATARS = 4;
export const PAGE_SIZE = 10;
export const MODAL_TABLE_PAGE_SIZE = 5;
export const DEFAULT_PAGE = 1;
export const FULL_PAGE_SIZE = 100;
export const EMPTY_VALUE = '--';

export const PAGE_ERRORS = {
  STORE: 'Store',
  STORES: 'Stores',
  WAVE: 'Wave',
  WAVES: 'Waves',
  SUMMARY: 'Summary',
  ORDER: 'Order',
  ORDERS: 'Orders',
};

export const NOTIFICATION_TYPES = {
  SNACK: 'snack',
  ERROR: 'error',
  WARNING: 'warning',
  SUCCESS: 'success',
} as const;

export const ID_PADDINGS = {
  STORE: 6,
  ORDER: 15,
};

export enum ACTIONS {
  CLOSE = 'close',
  SUBMIT = 'submit',
}

export enum INPUT_TYPES {
  TEXT = 'text',
  PASSWORD = 'password',
}
