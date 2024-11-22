/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { CrossDock } from '@ofm/pages/Outbound/OrderRequestsBilling/CrossDock/CrossDock';
import { OpeningAndBackup } from '@ofm/pages/Outbound/OrderRequestsBilling/OpeningAndBackup/OpeningAndBackup';
import { OrderRequestsBilling } from '@ofm/pages/Outbound/OrderRequestsBilling/OrderRequestsBilling';
import { Replenishment } from '@ofm/pages/Outbound/OrderRequestsBilling/Replenishment/Replenishment';
import { Flagged } from '@ofm/pages/Outbound/OrderRequestsBilling/Replenishment/WaveDetails/Flagged/Flagged';
import { ReadyToBill } from '@ofm/pages/Outbound/OrderRequestsBilling/Replenishment/WaveDetails/ReadyToBill/ReadyToBill';
import { ReadyToRequest } from '@ofm/pages/Outbound/OrderRequestsBilling/Replenishment/WaveDetails/ReadyToRequest/ReadyToRequest';
import { SentToOutbound } from '@ofm/pages/Outbound/OrderRequestsBilling/Replenishment/WaveDetails/SentToOutbound/SentToOutbound';
import { WaveDetails } from '@ofm/pages/Outbound/OrderRequestsBilling/Replenishment/WaveDetails/WaveDetails';
import { StoreSearch } from '@ofm/pages/Outbound/OrderRequestsBilling/StoreSearch/StoreSearch';
import { StoreDetails } from '@ofm/pages/Stores/StoreDetails/StoreDetails';
import { ROUTES } from '@shared/constants/routes';
import { RouteObject } from 'react-router-dom';

export const ofmRoutes: RouteObject = {
  path: ROUTES.ORDER_REQUEST_BILLING,
  element: <OrderRequestsBilling />,
  children: [
    {
      path: ROUTES.REPLENISHMENT,
      element: <Replenishment />,
    },
    {
      path: ROUTES.OPENING_AND_BACKUP,
      element: <OpeningAndBackup />,
      children: [
        {
          path: `${ROUTES.ORDERS}/:orderId`,
          element: <OpeningAndBackup />,
        },
      ],
    },
    {
      path: ROUTES.CROSS_DOCK,
      element: <CrossDock />,
      children: [
        {
          path: `${ROUTES.ORDERS}/:orderId`,
          element: <CrossDock />,
        },
      ],
    },
    {
      path: `${ROUTES.STORES}/:storeId`,
      element: <StoreDetails />,
      children: [
        {
          path: `${ROUTES.ORDERS}/:orderId/:orderType`,
          element: <StoreDetails />,
        },
      ],
    },
    {
      path: ROUTES.SEARCH,
      element: <StoreSearch />,
    },
    {
      path: `${ROUTES.WAVES}/:waveId`,
      element: <WaveDetails />,
      children: [
        {
          path: ROUTES.READY_TO_REQUEST,
          element: <ReadyToRequest />,
          children: [
            {
              path: `${ROUTES.ORDERS}/:orderId`,
              element: <ReadyToRequest />,
            },
          ],
        },
        {
          path: ROUTES.FLAGGED,
          element: <Flagged />,
          children: [
            {
              path: `${ROUTES.ORDERS}/:orderId/:orderType`,
              element: <Flagged />,
            },
          ],
        },
        {
          path: ROUTES.READY_TO_BILL,
          element: <ReadyToBill />,
          children: [
            {
              path: `${ROUTES.ORDERS}/:orderId`,
              element: <ReadyToBill />,
            },
          ],
        },
        {
          path: ROUTES.SENT_TO_OUTBOUND,
          element: <SentToOutbound />,
          children: [
            {
              path: `${ROUTES.ORDERS}/:orderId`,
              element: <SentToOutbound />,
            },
          ],
        },
      ],
    },
  ],
};
