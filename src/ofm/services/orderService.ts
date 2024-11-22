/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import {
  FlaggedItem,
  GetOrderProductsParams,
  GetOrdersParams,
  ActivityParams,
  OrderSummaryBody,
  CreditOrderRequest,
  WillCallBodyType,
  GetOrderHistoryParams,
} from '@ofm/types/types';
import { apiService } from './apiService';
import { HEADER_CURRENT_PAGE, HEADER_PAGE_SIZE } from '@shared/constants/headers';
import { OrderSchema } from '@ofm/schemas/orderSchema';
import { ORDER_ENDPOINTS } from '@shared/constants/routes';
import { OrderProductSchema } from '@ofm/schemas/orderProductSchema';
import { CreditOrderSchema } from '@ofm/schemas/creditOrderSchema';
import { paginatedParseAndLog, parseAndLog } from '@ofm/utils/utils';
import { z } from 'zod';
import { OrderType } from '@ofm/constants/constants';

export const orderService = {
  getOrderById: async (orderId: string, orderType: OrderType) => {
    const response = await apiService.get(ORDER_ENDPOINTS.GET_ORDER(orderId), {
      params: { orderType },
    });
    return parseAndLog(OrderSchema, response.data);
  },
  getCreditOrderById: async (orderId: string) => {
    const resp = await apiService.get(ORDER_ENDPOINTS.CREDIT_ORDER(orderId));
    return parseAndLog(CreditOrderSchema, resp.data);
  },
  getOrders: async (options?: GetOrdersParams) => {
    const params = {
      ...(options?.warehouseId && { warehouseId: options?.warehouseId }),
      ...(options?.type && { type: options?.type }),
      ...(options?.status && { status: options?.status.join(',') }),
      ...(options?.waveId && { waveId: options?.waveId }),
    };

    const headers = {
      ...(options?.currentPage && { [HEADER_CURRENT_PAGE]: options?.currentPage }),
      ...(options?.pageSize && { [HEADER_PAGE_SIZE]: options?.pageSize }),
    };
    const response = await apiService.get(ORDER_ENDPOINTS.GET_ORDERS, {
      params: params,
      headers: headers,
    });
    return paginatedParseAndLog(OrderSchema, response.data);
  },
  getOrderHistory: async (options?: GetOrderHistoryParams) => {
    const params = {
      warehouseId: options?.warehouseId,
      storeId: options?.storeId,
      searchTerms: options?.searchTerms,
    };
    const headers = {
      currentPage: options?.currentPage,
      pageSize: options?.pageSize,
    };

    const response = await apiService.get(ORDER_ENDPOINTS.GET_ORDER_HISTORY, { params, headers });
    return paginatedParseAndLog(OrderSchema, response.data);
  },
  getProducts: async (options: GetOrderProductsParams) => {
    const params = {
      ...(options.orderId && { orderId: options.orderId }),
      ...(options.searchTerms && { searchTerms: options.searchTerms }),
    };
    const headers = {
      ...(options?.currentPage && { [HEADER_CURRENT_PAGE]: options?.currentPage }),
      ...(options?.pageSize && { [HEADER_PAGE_SIZE]: options?.pageSize }),
    };
    const response = await apiService.get(ORDER_ENDPOINTS.GET_PRODUCTS, { params, headers });
    return paginatedParseAndLog(OrderProductSchema, response.data);
  },
  deleteOrder: async (orderId: string, message: string) => {
    const params = { message };
    const response = await apiService.delete(ORDER_ENDPOINTS.DELETE_ORDER(orderId), { params });
    return response;
  },
  deleteOrderProducts: async (orderId: string, message: string, productIds: string[]) => {
    const params = { message, productIds: productIds.join(',') };
    const response = await apiService.delete(ORDER_ENDPOINTS.DELETE_ORDER_PRODUCTS(orderId), {
      params,
    });
    return response;
  },
  verifyFlaggedOrder: async (orderId: string, verifiedProducts: FlaggedItem[]) => {
    const params = { orderId };
    const response = await apiService.post(
      ORDER_ENDPOINTS.VERIFY_ORDER_PRODUCTS,
      verifiedProducts,
      {
        params,
      }
    );
    return response;
  },
  postOrderActivity: async (orderId: string, activity: ActivityParams) => {
    const response = await apiService.post(ORDER_ENDPOINTS.POST_ORDER_ACTIVITY(orderId), activity);
    return response;
  },
  postOrderSummary: async (orderSummaryBody: OrderSummaryBody) => {
    const resp = await apiService.post(ORDER_ENDPOINTS.POST_ORDER_SUMMARY, orderSummaryBody);
    return resp;
  },
  createCreditOrder: async (orderId: string, creditOrderRequest: CreditOrderRequest) => {
    const resp = await apiService.post(ORDER_ENDPOINTS.CREDIT_ORDER(orderId), creditOrderRequest);
    return parseAndLog(z.string(), resp.data);
  },
  createWillCall: async (willCallBody: WillCallBodyType) => {
    const response = await apiService.post(ORDER_ENDPOINTS.CREATE_WILL_CALL, willCallBody);
    return response;
  },
};
