/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { RouteObject } from 'react-router-dom';

import { PAGE_URLS, ROUTES } from '@shared/constants/routes';
import { ControlDesk } from '@outbound/pages/ControlDesk/ControlDesk';
import { OrderRelease } from '@outbound/pages/ControlDesk/ReleaseOrders/OrderRelease';
import { ReplenishmentOrders } from '@outbound/pages/ControlDesk/ReleaseOrders/OrderTabs/Replenishment';
import { WillCallOrders } from '@outbound/pages/ControlDesk/ReleaseOrders/OrderTabs/WillCallOrders';
import { NewStore } from '@outbound/pages/ControlDesk/ReleaseOrders/OrderTabs/NewStoreOrders/NewStore';
import { LongTailDistribution } from '@outbound/pages/ControlDesk/ReleaseOrders/OrderTabs/LongTailDistribution/LongTailDistribution';
import { TransferOrders } from '@outbound/pages/ControlDesk/ReleaseOrders/OrderTabs/TransferOrders';
import { Shipments } from '@outbound/pages/Shipments/Shipments';
import { StoreDetails } from '@outbound/pages/ControlDesk/StoreDetails/StoreDetails';

export const outboundRoutes: RouteObject = {
  path: ROUTES.OUTBOUND,
  children: [
    {
      path: ROUTES.CONTROL_DESK,
      element: <ControlDesk />,
    },
    {
      path: PAGE_URLS.ORDER_RELEASE,
      element: <OrderRelease />,
      children: [
        {
          path: ROUTES.REPLENISHMENT,
          element: <ReplenishmentOrders />,
        },
        {
          path: ROUTES.Will_CAll,
          element: <WillCallOrders />,
        },
        {
          path: ROUTES.New_Store,
          element: <NewStore />,
        },
        {
          path: ROUTES.Long_Tail_Distribution,
          element: <LongTailDistribution />,
        },
        {
          path: ROUTES.Transfer,
          element: <TransferOrders />,
        },
        {
          path: ROUTES.CROSS_DOCK,
          element: <TransferOrders />,
        },
      ],
    },
    {
      path: ROUTES.SHIPMENTS,
      element: <Shipments />,
    },
    {
      path: `${ROUTES.STORE_DETAILS}/:storeId`,
      element: <StoreDetails />,
      children: [
        {
          path: `${ROUTES.ORDERS}/:orderId/:orderType`,
          element: <StoreDetails />,
        },
      ],
    },
  ],
};
