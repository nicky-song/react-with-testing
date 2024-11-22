/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

export const ROUTES = {
  HOME: '',
  STORES: 'stores',
  ORDERS: 'orders',
  PRODUCTS: 'products',
  EXPORT: 'export',
  FAVORITES: 'favorites',
  PO_DASHBOARD: 'po-dashboard',
  CONTROL_DESK: 'control-desk',
  ORDER_RELEASE: 'order-release',
  INBOUND: 'inbound',
  COMPLETED_PO: 'completed-po',
  TASK_MANAGER: 'task-manager',
  OUTBOUND: 'outbound',
  SHIPMENTS: 'shipments',
  CONTROL_TOWER: 'control-tower',
  ORDER_REQUEST_BILLING: 'order-requests-billing',
  TRANSPORTATION: 'transportation',
  DISPATCH_REPORT: 'dispatch-report',
  RETURNS_RECALLS: 'returns-recalls',
  PACKING_LISTS: 'packing-lists',
  INVENTORY_CONTROL: 'inventory-control',
  DISCREPANCY_CHECKS: 'discrepancy-checks',
  QCS: 'qcs',
  QCS_REPORTS: 'qcs-reports',
  SLOT_CREATION: 'slot-creation',
  COMPONENTS: 'components',
  COMBINED_TABS: 'combined-tabs',
  MODALS: 'modals',
  NOTIFICATION: 'notification',
  DRAWER: 'drawer',
  PROGRESS_BAR: 'progress-bar',
  TABLES: 'tables',
  WAVES: 'waves',
  WILL_CALL_SEARCH: 'will-call-search',
  CREATE_WILL_CALL: 'create-will-call',
  MASTER_TITLE: 'master-title',
  DELIVERY_CARD: 'delivery-card',
  SEARCH: 'search',
  REPLENISHMENT: 'replenishment',
  OPENING_AND_BACKUP: 'new-store-and-backup',
  CROSS_DOCK: 'cross-dock',
  READY_TO_REQUEST: 'ready-to-request',
  FLAGGED: 'flagged',
  READY_TO_BILL: 'ready-to-bill',
  SENT_TO_OUTBOUND: 'sent-to-outbound',
  EMPTY_STATE: 'empty-state',
  TAGS: 'tags',
  SCHEDULE: 'schedule',
  STATS: 'stats',
  STEPPER: 'stepper',
  BILL_PROCESSES: 'bill-order-processes',
  REPLENISHMENT_PROCESSES: 'replenishment-order-processes',
  ACTIVITY: 'activity',
  AUTH: 'auth/callback',
  USERS: 'users',
  PREFERENCES: 'preferences',
  HELP: 'help',
  LOGS: 'logs',
  LOGOUT: 'logout',
  SUMMARIZE: 'summarize',
  CHANGE_STATUS: 'change-status',
  RETRIEVE_USER: 'retrieve-current-user',
  CREDIT: 'credit',
  ITEMS: 'items',
  ORDER_HISTORY: 'history',
  MDM: 'mdm',
  RDM: 'reference-data-manager',
  FAQ: 'faq',
  GENERAL: 'general',
  LOCATION_MANAGER: 'location-manager',
  ZONE: 'zone',
  ZONE_LIST: 'zone-list',
  SUB_ZONE: 'sub-zone',
  SUB_ZONE_LIST: 'sub-zone-list',
  CREATE: 'create',
  Will_CAll: 'will-call',
  New_Store: 'new-store-and-backup',
  Long_Tail_Distribution: 'long-tail-distribution',
  Transfer: 'transfer',
  PUT_ON_HOLD: 'put-on-hold',
  EDIT: 'edit',
  REMOVE: 'remove',
  STORE_DETAILS: 'store-details',
  LOCATION: 'location',
  CONSOLIDATION_LOCATION: 'consolidation-location',
};

export const USER_ENDPOINTS = {
  RETRIEVE_USER: `/${ROUTES.USERS}/${ROUTES.RETRIEVE_USER}`,
};

export const BILL_PROCESS_ENDPOINTS = {
  BASE_URL: `/${ROUTES.BILL_PROCESSES}`,
  GET_BILL: (requestId: string) => `/${ROUTES.BILL_PROCESSES}/${requestId}`,
};

export const REPLENISHMENT_PROCESS_ENDPOINTS = {
  BASE_URL: `/${ROUTES.REPLENISHMENT_PROCESSES}`,
  GET_RO_REQUEST: (requestId: string) => `/${ROUTES.REPLENISHMENT_PROCESSES}/${requestId}`,
};

export const STORE_ENDPOINTS = {
  GET_STORE: (storeId: string) => `/${ROUTES.STORES}/${storeId}`,
  GET_ALL_STORES: `/${ROUTES.STORES}`,
  POST_STORE_ACTIVITY: (storeId: string) => `/${ROUTES.STORES}/${storeId}/${ROUTES.ACTIVITY}`,
  POST_STORE_STATUS: (storeId: string) => `/${ROUTES.STORES}/${ROUTES.CHANGE_STATUS}/${storeId}`,
} as const;

export const WAVE_ENDPOINTS = {
  GET_ALL_WAVES: `${ROUTES.WAVES}`,
  GET_WAVE: (waveId: string) => `/${ROUTES.WAVES}/${waveId}`,
} as const;

export const ORDER_ENDPOINTS = {
  GET_ORDERS: `/${ROUTES.ORDERS}`,
  GET_ORDER_HISTORY: `/${ROUTES.ORDERS}/${ROUTES.ORDER_HISTORY}`,
  GET_ORDER: (orderId: string) => `/${ROUTES.ORDERS}/${orderId}`,
  CREDIT_ORDER: (orderId: string) => `/${ROUTES.ORDERS}/${orderId}/${ROUTES.CREDIT}`,
  GET_PRODUCTS: `/${ROUTES.ORDERS}/${ROUTES.SEARCH}`,
  DELETE_ORDER: (orderId: string) => `/${ROUTES.ORDERS}/${orderId}`,
  DELETE_ORDER_PRODUCTS: (orderId: string) => `/${ROUTES.ORDERS}/${orderId}/${ROUTES.ITEMS}`,
  VERIFY_ORDER_PRODUCTS: `/${ROUTES.ORDERS}/${ROUTES.FLAGGED}`,
  POST_ORDER_ACTIVITY: (orderId: string) => `/${ROUTES.ORDERS}/${orderId}/${ROUTES.ACTIVITY}`,
  POST_ORDER_SUMMARY: `/${ROUTES.ORDERS}/${ROUTES.SUMMARIZE}`,
  CREATE_WILL_CALL: `/${ROUTES.ORDERS}/${ROUTES.CREATE_WILL_CALL}`,
} as const;

export const PRODUCT_ENDPOINTS = {
  GET_PRODUCTS: `/${ROUTES.PRODUCTS}/${ROUTES.SEARCH}`,
} as const;

export const EXPORT_ENDPOINTS = {
  GET_ORDERS: `/${ROUTES.EXPORT}${ORDER_ENDPOINTS.GET_ORDERS}`,
  GET_PRODUCTS: `/${ROUTES.EXPORT}${ORDER_ENDPOINTS.GET_PRODUCTS}`,
} as const;

export const REPLENISHMENT_ORDER_PROCESSES_ENDPOINTS = {
  POST_CREATE_REQUEST: `/${ROUTES.REPLENISHMENT_PROCESSES}`,
};

export const BILL_ORDER_PROCESSES_ENDPOINTS = {
  POST_CREATE_REQUEST: `/${ROUTES.BILL_PROCESSES}`,
};

export const LOG_ENDPOINTS = {
  BASE_URL: `/${ROUTES.LOGS}`,
} as const;

export const PAGE_URLS = {
  HOME: '/',
  STORES: `/${ROUTES.STORES}`,
  STORE: (storeId: number) => `/${ROUTES.STORES}/${storeId}`,
  ORDERS: `/${ROUTES.ORDERS}`,
  TASK_MANAGER: `/${ROUTES.INBOUND}/${ROUTES.TASK_MANAGER}`,
  ORDER_REQUEST_BILLING: `/${ROUTES.OUTBOUND}/${ROUTES.ORDER_REQUEST_BILLING}`,
  PO_DASHBOARD: `/${ROUTES.INBOUND}/${ROUTES.PO_DASHBOARD}`,
  PO_DASHBOARD_SEARCH: `/${ROUTES.INBOUND}/${ROUTES.PO_DASHBOARD}/${ROUTES.SEARCH}`,
  PO_DETAILS: (poId: string | number | undefined) =>
    `/${ROUTES.INBOUND}/${ROUTES.PO_DASHBOARD}/${poId}`,
  PO_EDIT: (poId: string | number | undefined) =>
    `/${ROUTES.INBOUND}/${ROUTES.PO_DASHBOARD}/${poId}/${ROUTES.EDIT}`,
  PO_PUT_ON_HOLD: (poId: string | number | undefined) =>
    `/${ROUTES.INBOUND}/${ROUTES.PO_DASHBOARD}/${poId}/${ROUTES.PUT_ON_HOLD}`,
  PO_REMOVE: (poId: string | number | undefined) =>
    `/${ROUTES.INBOUND}/${ROUTES.PO_DASHBOARD}/${poId}/${ROUTES.REMOVE}`,
  STORE_SEARCH: `/${ROUTES.OUTBOUND}/${ROUTES.ORDER_REQUEST_BILLING}/${ROUTES.SEARCH}`,
  REPLENISHMENT: `/${ROUTES.OUTBOUND}/${ROUTES.ORDER_REQUEST_BILLING}/${ROUTES.REPLENISHMENT}`,
  WAVE_DETAILS: (waveId: string) =>
    `/${ROUTES.OUTBOUND}/${ROUTES.ORDER_REQUEST_BILLING}/${ROUTES.WAVES}/${waveId}`,
  GENERAL_PAGE: (section: string, subSection: string, page: string, pageId?: string) =>
    `/${section}/${subSection}/${page}${pageId && `/${pageId}`}`,
  COMPONENTS_TABS: `/${ROUTES.COMPONENTS}/${ROUTES.COMBINED_TABS}`,
  PREFERENCES: `/${ROUTES.PREFERENCES}`,
  HELP: `/${ROUTES.HELP}`,
  LOGOUT: `/${ROUTES.LOGOUT}`,
  RDM: `/${ROUTES.MDM}/${ROUTES.RDM}`,
  LOCATION_MANAGER: `/${ROUTES.MDM}/${ROUTES.RDM}/${ROUTES.LOCATION_MANAGER}`,
  FAQ: `/${ROUTES.MDM}/${ROUTES.RDM}/${ROUTES.FAQ}`,
  FAQ_GENERAL: `/${ROUTES.MDM}/${ROUTES.RDM}/${ROUTES.FAQ}/${ROUTES.GENERAL}`,
  FAQ_INBOUND: `/${ROUTES.MDM}/${ROUTES.RDM}/${ROUTES.FAQ}/${ROUTES.INBOUND}`,
  ZONE_LIST: `/${ROUTES.MDM}/${ROUTES.RDM}/${ROUTES.LOCATION_MANAGER}/${ROUTES.ZONE_LIST}`,
  ZONE_CREATE: `/${ROUTES.MDM}/${ROUTES.RDM}/${ROUTES.LOCATION_MANAGER}/${ROUTES.ZONE}/${ROUTES.CREATE}`,
  ZONE_DETAILS: (zoneId: string) =>
    `/${ROUTES.MDM}/${ROUTES.RDM}/${ROUTES.LOCATION_MANAGER}/${ROUTES.ZONE}/${zoneId}`,
  SUB_ZONE_LIST: `/${ROUTES.MDM}/${ROUTES.RDM}/${ROUTES.LOCATION_MANAGER}/${ROUTES.SUB_ZONE_LIST}`,
  SUB_ZONE_DETAILS: (subzoneId: string) =>
    `/${ROUTES.MDM}/${ROUTES.RDM}/${ROUTES.LOCATION_MANAGER}/${ROUTES.SUB_ZONE}/${subzoneId}`,
  OUTBOUND_CONTROL_DESK: `/${ROUTES.OUTBOUND}/${ROUTES.CONTROL_DESK}`,
  ORDER_RELEASE: `/${ROUTES.OUTBOUND}/${ROUTES.CONTROL_DESK}/${ROUTES.ORDER_RELEASE}`,
  SUB_ZONE_CREATE: `/${ROUTES.MDM}/${ROUTES.RDM}/${ROUTES.LOCATION_MANAGER}/${ROUTES.SUB_ZONE}/${ROUTES.CREATE}`,
  OPENING_AND_BACKUP: `/${ROUTES.OUTBOUND}/${ROUTES.ORDER_REQUEST_BILLING}/${ROUTES.OPENING_AND_BACKUP}`,
  CROSS_DOCK: `/${ROUTES.OUTBOUND}/${ROUTES.ORDER_REQUEST_BILLING}/${ROUTES.CROSS_DOCK}`,
  STORE_DETAILS: (storeId: number) =>
    `/${ROUTES.OUTBOUND}/${ROUTES.ORDER_REQUEST_BILLING}/${ROUTES.STORES}/${storeId}`,
  STORE_ORDER_DETAILS: (storeId: string) =>
    `/${ROUTES.OUTBOUND}/${ROUTES.STORE_DETAILS}/${storeId}`,
  LOCATION_LIST: `/${ROUTES.MDM}/${ROUTES.RDM}/${ROUTES.LOCATION_MANAGER}/${ROUTES.LOCATION}`,
  LOCATION_CREATE: `/${ROUTES.MDM}/${ROUTES.RDM}/${ROUTES.LOCATION_MANAGER}/${ROUTES.LOCATION}/${ROUTES.CREATE}`,
  LOCATION_DETAILS: (locationId: string) =>
    `/${ROUTES.MDM}/${ROUTES.RDM}/${ROUTES.LOCATION_MANAGER}/${ROUTES.LOCATION}/${locationId}`,
  CONSOLIDATION_LOCATION_LIST: `/${ROUTES.MDM}/${ROUTES.RDM}/${ROUTES.LOCATION_MANAGER}/${ROUTES.CONSOLIDATION_LOCATION}`,
  CONSOLIDATION_LOCATION_CREATE: `/${ROUTES.MDM}/${ROUTES.RDM}/${ROUTES.LOCATION_MANAGER}/${ROUTES.CONSOLIDATION_LOCATION}/${ROUTES.CREATE}`,
  CONSOLIDATION_LOCATION_DETAILS: (locationId: string) =>
    `/${ROUTES.MDM}/${ROUTES.RDM}/${ROUTES.LOCATION_MANAGER}/${ROUTES.CONSOLIDATION_LOCATION}/${locationId}`,
} as const;

export const ORDER_DETAILS_URLS = {
  ORDER_DETAILS: (orderId: string) => `/${ROUTES.ORDERS}/${orderId}`,
} as const;

export const PING_URLS = {
  AUTH_URL: '/as/authorization.oauth2',
  TOKEN_URL: '/as/token.oauth2',
  USER_INFO_URL: '/idp/userinfo.openid',
  REVOKE_TOKEN_URL: '/as/revoke_token.oauth2',
};

export const AUTH_ENDPOINTS = {
  TOKEN: '/as/token.oauth2',
  GET_USER_INFO: '/idp/userinfo.openid',
  REVOKE: '/as/revoke_token.oauth2',
};
