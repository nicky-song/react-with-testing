/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Star, DeliveryTruck, Receipt, Box, Locked } from '@az/starc-ui-icons';
import { Home, Inbound, Outbound } from '../assets/icons';
import { ROUTES } from './routes';

export const navigation = [
  {
    name: 'Sidenav.Home',
    value: ROUTES.HOME,
    link: '/',
    icon: Home,
    secondaryLinks: [],
  },
  {
    name: 'Sidenav.Favorites',
    value: ROUTES.FAVORITES,
    link: `/${ROUTES.FAVORITES}`,
    icon: Star,
    secondaryLinks: [
      {
        name: 'Sidenav.PODashboard',
        link: `/${ROUTES.FAVORITES}/${ROUTES.PO_DASHBOARD}`,
        isDisabled: false,
      },
      {
        name: 'Sidenav.OutboundControlDesk',
        link: `/${ROUTES.FAVORITES}/${ROUTES.CONTROL_DESK}`,
        isDisabled: false,
      },
    ],
  },
  {
    name: 'Sidenav.Inbound',
    value: ROUTES.INBOUND,
    link: `/${ROUTES.INBOUND}`,
    icon: Inbound,
    secondaryLinks: [
      {
        name: 'Sidenav.PODashboard',
        link: `/${ROUTES.INBOUND}/${ROUTES.PO_DASHBOARD}`,
        isDisabled: false,
      },
      {
        name: 'Sidenav.CompletedPOs',
        link: `/${ROUTES.INBOUND}/${ROUTES.COMPLETED_PO}`,
        isDisabled: true,
      },
      {
        name: 'Sidenav.InboundTaskManager',
        link: `/${ROUTES.INBOUND}/${ROUTES.TASK_MANAGER}`,
        isDisabled: false,
      },
    ],
  },
  {
    name: 'Sidenav.Outbound',
    value: ROUTES.OUTBOUND,
    link: `/${ROUTES.OUTBOUND}`,
    icon: Outbound,
    secondaryLinks: [
      {
        name: 'Sidenav.OutboundControlDesk',
        link: `/${ROUTES.OUTBOUND}/${ROUTES.CONTROL_DESK}`,
        isDisabled: false,
      },
      {
        name: 'Sidenav.OutboundShipments',
        link: `/${ROUTES.OUTBOUND}/${ROUTES.SHIPMENTS}`,
        isDisabled: false,
      },
      {
        name: 'Sidenav.ControlTower',
        link: `/${ROUTES.OUTBOUND}/${ROUTES.CONTROL_TOWER}`,
        isDisabled: true,
      },
      {
        name: 'Sidenav.OutboundTaskManager',
        link: `/${ROUTES.OUTBOUND}/${ROUTES.TASK_MANAGER}`,
        isDisabled: true,
      },
      {
        name: 'Sidenav.StoreOrderRequestBilling',
        link: `/${ROUTES.OUTBOUND}/${ROUTES.ORDER_REQUEST_BILLING}`,
        isDisabled: false,
      },
    ],
  },
  {
    name: 'Sidenav.Transportation',
    value: ROUTES.TRANSPORTATION,
    link: `/${ROUTES.TRANSPORTATION}`,
    icon: DeliveryTruck,
    secondaryLinks: [
      {
        name: 'Sidenav.DispatchReport',
        link: `/${ROUTES.TRANSPORTATION}/${ROUTES.DISPATCH_REPORT}`,
        isDisabled: true,
      },
    ],
  },
  {
    name: 'Sidenav.ReturnsRecalls',
    value: ROUTES.RETURNS_RECALLS,
    link: `/${ROUTES.RETURNS_RECALLS}`,
    icon: Receipt,
    secondaryLinks: [
      {
        name: 'Sidenav.PackingLists',
        link: `/${ROUTES.RETURNS_RECALLS}/${ROUTES.PACKING_LISTS}`,
        isDisabled: true,
      },
    ],
  },
  {
    name: 'Sidenav.InventoryControl',
    value: ROUTES.INVENTORY_CONTROL,
    link: `/${ROUTES.INVENTORY_CONTROL}`,
    icon: Box,
    secondaryLinks: [
      {
        name: 'Sidenav.InboundDiscrepancyChecks',
        link: `/${ROUTES.INVENTORY_CONTROL}/${ROUTES.DISCREPANCY_CHECKS}`,
        isDisabled: true,
      },
      {
        name: 'Sidenav.QCS',
        link: `/${ROUTES.INVENTORY_CONTROL}/${ROUTES.QCS}`,
        isDisabled: true,
      },
      {
        name: 'Sidenav.QCSReport',
        link: `/${ROUTES.INVENTORY_CONTROL}/${ROUTES.QCS_REPORTS}`,
        isDisabled: true,
      },
      {
        name: 'Sidenav.SlotCreation',
        link: `/${ROUTES.INVENTORY_CONTROL}/${ROUTES.SLOT_CREATION}`,
        isDisabled: true,
      },
    ],
  },
  {
    name: 'Sidenav.WarehouseManagement',
    value: ROUTES.MDM,
    link: `/${ROUTES.MDM}`,
    icon: Locked,
    secondaryLinks: [
      {
        name: 'Sidenav.ReferenceDataManager',
        link: `/${ROUTES.MDM}/${ROUTES.RDM}`,
        isDisabled: false,
      },
    ],
  },
];
