/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import {
  ErrorLogType,
  LogSource,
  OrderStatus,
  OrderType,
  StoreStatus,
} from '@ofm/constants/constants';
import {
  DrawerArraySchema,
  ReasonDateSchema,
  ReasonSchema,
} from '@ofm/schemas/confirmationModalSchema';
import { CreditOrderSchema } from '@ofm/schemas/creditOrderSchema';
import { OrderProductSchema } from '@ofm/schemas/orderProductSchema';
import { OrderSchema } from '@ofm/schemas/orderSchema';
import { ProductSchema } from '@ofm/schemas/productSchema';
import { RequestSummarySchema } from '@ofm/schemas/requestSummarySchema';
import { ActivitySchema, StoreSchema } from '@ofm/schemas/storeSchema';
import { WaveSchema } from '@ofm/schemas/waveSchema';
import { NameSchema, WillCallBodySchema } from '@ofm/schemas/willCallSchema';
import { Dispatch, SetStateAction } from 'react';
import { z } from 'zod';

export type GetStoresParams = {
  warehouseId?: string;
  storeStatus?: StoreStatus;
  currentPage?: number;
  pageSize?: number;
};

export type StoreStatusRequestParams = {
  status: StoreStatus;
  message: string;
  endDate?: string;
};

export type PostStoreStatus = {
  storeId: string;
} & StoreStatusRequestParams;

export type GetOrdersParams = {
  warehouseId?: string;
  type?: OrderType;
  status?: Array<OrderStatus>;
  waveId?: string;
  currentPage?: number;
  pageSize?: number;
};

export type GetProductsParams = {
  warehouseId?: number;
  searchTerms?: string;
  languageLocale?: string; // TODO: Enforce this when we have more info
};

export type GetWavesParams = {
  warehouseId: string;
  pastDue: boolean;
  startDate?: string;
  endDate?: string;
  currentPage?: number;
  pageSize?: number;
};

export type ActivityParams = {
  message: string;
};

export type OrderSummaryBody = {
  warehouseId: string;
  type: Array<OrderType>;
  isInProgress: boolean;
  status: Array<OrderStatus>;
  waveId?: string;
  startDate?: Date;
  endDate?: Date;
};

export type OrderSummary = {
  orderType: OrderType;
  totalOrders: number;
  completedOrders: number;
  flaggedOrders?: number;
  readyToRequestOrders?: number;
  readyToBillOrders?: number;
};

export type StoreActivity = {
  storeId: string;
  activity: ActivityParams;
};
export type OrderActivity = {
  orderId: string;
  activity: ActivityParams;
};

export type GetWaveParams = {
  waveId?: string;
};

export type GetOrderProductsParams = {
  orderId: string;
  searchTerms?: string;
  currentPage?: number;
  pageSize?: number;
};

export type GetOrderHistoryParams = {
  warehouseId?: string;
  storeId?: string;
  searchTerms?: string;
  currentPage?: number;
  pageSize?: number;
};

export type OrderDetailsType = z.infer<typeof OrderSchema>;
export type ProductType = z.infer<typeof ProductSchema>;
export type CreditOrderDetailsType = z.infer<typeof CreditOrderSchema>;
export type OrderProductsType = z.infer<typeof OrderProductSchema>;
export type WaveType = z.infer<typeof WaveSchema>;
export type StoreDetailsType = z.infer<typeof StoreSchema>;
export type ActivityType = z.infer<typeof ActivitySchema>;
export type ReasonType = z.infer<typeof ReasonSchema>;
export type DrawerArrayType = z.infer<typeof DrawerArraySchema>;
export type ReasonDateType = z.infer<typeof ReasonDateSchema>;
export type WillCallBodyType = z.infer<typeof WillCallBodySchema>;
export type WillCallFormData = z.infer<typeof NameSchema>;
export type RequestSummaryType = z.infer<typeof RequestSummarySchema>;

export type LogType = {
  id: number;
  timestamp: Date;
  details: unknown;
  // TODO: Just errors for now, add more types if we want to log more
  type: ErrorLogType;
  code?: number;
  source: LogSource.UI;
};

export type ClientLogType = {
  id: number;
  timestamp: Date;
  type: ErrorLogType;
};

export type FlaggedItem = {
  id: string;
  quantity: number;
  hasError?: boolean;
};

export type ScheduleItem = {
  day: string;
  time: string;
  wave: string;
};

export type CSVDataType = {
  fileName: string;
  data: string;
};

export type CreditOrderRequest = {
  items: { itemId: string; packsQuantity: number; quantityReceived: number }[];
};

export type PaginatedResponse<T extends z.ZodTypeAny> = {
  results: z.TypeOf<T>[];
  metadata: {
    totalResults: number;
  };
};

export type Comment = {
  message: string;
};

export type ReplenishmentOrderRequest = {
  stores: string[];
  comment?: Comment;
  waveId: string;
};

export type SetChildErrorType = Dispatch<SetStateAction<string>>;

export type ActionNotificationType = 'snack' | 'error' | 'success' | 'warning';

export type CtaNotificationType = 'button' | 'link' | undefined;
