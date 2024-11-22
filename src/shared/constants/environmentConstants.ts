/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

export const USE_REACT_DEV_TOOLS = !!window.env.REACT_DEV_TOOLS;
export const USE_JOTAI_DEV = !!window.env.DEBUG_JOTAI;

export const BFF_URL = window.env.BFF_URL;

export const FRONTEND_BASE_URL = window.env.BASE_URL;

export const PING_REDIRECT_URL = `${FRONTEND_BASE_URL}/auth/callback`;
export const PING_CLIENT_ID = window.env.PING_CLIENT_ID;
export const PING_FEDERATE_RUNTIME_URL = window.env.PING_FEDERATE_RUNTIME_URL;
