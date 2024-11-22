/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { RouteObject } from 'react-router-dom';

import { ROUTES } from '@shared/constants/routes';

import { PODashboard } from '@inbound/pages/PODashboard/PODashboard';
import { PODashboardSearch } from '@inbound/pages/PODashboard/Search/PODashboardSearch';
import { PODetail } from '@inbound/pages/PODashboard/Detail/PODetail';

import { TaskManager } from '@taskManagement/pages/Inbound/TaskManager';

export const inboundRoutes: RouteObject = {
  children: [
    {
      path: ROUTES.PO_DASHBOARD,
      children: [
        {
          path: '',
          element: <PODashboard />,
        },
        {
          path: ROUTES.SEARCH,
          element: <PODashboardSearch />,
        },
        {
          path: ':poId',
          element: <PODetail />,
          children: [
            {
              path: ROUTES.EDIT,
            },
            {
              path: ROUTES.PUT_ON_HOLD,
            },
            {
              path: ROUTES.REMOVE,
            },
          ],
        },
      ],
    },
    {
      path: ROUTES.TASK_MANAGER,
      element: <TaskManager />,
    },
  ],
};
