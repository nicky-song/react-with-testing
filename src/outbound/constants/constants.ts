/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

export enum OrderReleaseStatus {
  RELEASED = 'RELEASED',
  UNRELEASED = 'UNRELEASED',
  PARTIALLY_RELEASED = 'PARTIALLY_RELEASED',
  READY_FOR_RELEASE = 'READY_FOR_RELEASE',
  RPLENISHMENT_NOT_RUN = 'RPLENISHMENT_NOT_RUN',
}

export const OrderReleaseTabTitles = {
  REPLENISHMENT: 'OutboundMatrix.OrderTabs.Replenishment',
  WILL_CALL: 'OutboundMatrix.OrderTabs.WillCallOrders',
  NEW_STORE: 'OutboundMatrix.OrderTabs.NewStoreOrders',
  LTD: 'OutboundMatrix.OrderTabs.LongTailDistribution',
  TRANSFER: 'OutboundMatrix.OrderTabs.TransferOrders',
  CROSS_DOCK: 'OutboundMatrix.OrderTabs.CrossDock',
};

export const TrailerStatus = {
  NOT_STARTED: 'OutBoundShipments.NotStarted',
  IN_PROGRESS: 'OutBoundShipments.InProgress',
  CT_DOCK_LANE_CLOSED: 'OutBoundShipments.CtDockLaneClosed',
  SHIPPED: 'OutBoundShipments.Shipped',
};

export const ShipmentTimeTypes = {
  DSD: 'dsd',
  PO: 'po',
  LTL: 'ltl',
  LTD: 'ltd',
};
