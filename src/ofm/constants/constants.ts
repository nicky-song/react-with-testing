/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

export enum OrderType {
  REPLENISHMENT = 'REPLENISHMENT',
  OPENING = 'OPENING',
  BACKUP = 'BACKUP',
  CROSS_DOCK = 'CROSS_DOCK',
  WILL_CALL = 'WILL_CALL',
  CREDITED = 'CREDITED',
}

export enum OrderStatus {
  NOT_STARTED = 'NOT_STARTED',
  REQUESTED = 'REQUESTED',
  CANCELLED = 'CANCELLED',
  READY_TO_REQUEST = 'READY_TO_REQUEST',
  READY_TO_BILL = 'READY_TO_BILL',
  SENT_TO_OUTBOUND = 'SENT_TO_OUTBOUND',
  SENT_TO_OUTBOUND_UNRELEASED = 'SENT_TO_OUTBOUND_UNRELEASED',
  RELEASED = 'RELEASED',
  CREDITED = 'CREDITED',
  ERROR = 'ERROR',
}

export enum OrderSecondaryStatus {
  WILL_CALL = 'WILL_CALL',
  FILL_IN = 'FILL_IN',
}

export enum OrderErrorStatus {
  CSR_STORE_NOT_CREATED = 'CSR_STORE_NOT_CREATED',
  STORE_CONNECT_FAILED = 'STORE_CONNECT_FAILED',
  QUANTITY_ANOMALY = 'QUANTITY_ANOMALY',
  ON_HOLD = 'ON_HOLD',
}

export enum OrderErrorType {
  SYSTEM_ERROR = 'SYSTEM_ERROR',
  STORE_ERROR = 'STORE_ERROR',
  CSR_ERROR = 'CSR_ERROR',
}

export enum StoreStatus {
  ACTIVE = 'ACTIVE',
  ON_HOLD = 'ON_HOLD',
}

export enum ProductStatus {
  CLEARANCE = 'CLEARANCE',
  SELL_THROUGH = 'SELL_THROUGH',
  NEW = 'NEW',
  DISCONTINUED = 'DISCONTINUED',
  DISABLED = 'DISABLED',
}

export enum DeliveryMethod {
  RO_PULL_SHIFT = 'RO_PULL_SHIFT_TODAY',
  RO_PULL_SHIFT_DAYS = 'RO_PULL_SHIFT_X_DAYS',
  FEDEX = 'FEDEX_EXPRESS_SHIPMENTS',
  CROSS_DOCK = 'CROSS_DOCK_TO_PRIMARY_DC',
}

export const ProductStatusTranslationMap = {
  [ProductStatus.CLEARANCE]: 'WillCall.Item.StatusType.Clearance',
  [ProductStatus.SELL_THROUGH]: 'WillCall.Item.StatusType.SellThrough',
  [ProductStatus.NEW]: 'WillCall.Item.StatusType.New',
  [ProductStatus.DISCONTINUED]: 'WillCall.Item.StatusType.Discontinued',
  [ProductStatus.DISABLED]: 'WillCall.Item.StatusType.Disabled',
};

export enum RequestStatus {
  LOGGED = 'LOGGED',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING = 'PENDING',
  DEFERRED = 'DEFERRED',
  COMPLETED = 'COMPLETED',
}

export enum ErrorLogType {
  AXIOS = 'AXIOS_ERROR',
  ZOD = 'ZOD_ERROR',
}

export enum LogSource {
  UI = 'UI',
  BE = 'BE',
}

export const DAYS = 'days';
export const BFF_REQUEST_DATE_FORMAT = 'YYYY-MM-DD';
export const shortDateFormat = 'MMM DD YYYY';
export const hourAndMinuteDateFormat = 'hh:mm';

export const REQUEST_PATCH_OPERATION = {
  op: 'replace',
  path: '/userNotified',
  value: true,
};
