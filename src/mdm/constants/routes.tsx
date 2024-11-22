/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { General as FAQGeneral } from '@mdm/pages/RDM/FAQ/General/General.tsx';

import { ROUTES } from '@shared/constants/routes';
import { RouteObject } from 'react-router-dom';
import { ZoneList } from '@mdm/pages/RDM/LocationManager/Zone/ZoneList.tsx';
import { ZoneDetail } from '@mdm/pages/RDM/LocationManager/Zone/Detail/ZoneDetail.tsx';
import { SubzoneList } from '@mdm/pages/RDM/LocationManager/Subzone/SubzoneList.tsx';
import { SubzoneDetail } from '@mdm/pages/RDM/LocationManager/Subzone/Detail/SubzoneDetail.tsx';
import { ZoneSubzoneHeader } from '@mdm/pages/RDM/LocationManager/Partials/ZoneSubzoneHeader.tsx';
import { RDMLanding } from '@mdm/pages/RDM/Landing/RDMLanding.tsx';
import { LocationList } from '@mdm/pages/RDM/LocationManager/Location/LocationList.tsx';
import { LocationDetail } from '@mdm/pages/RDM/LocationManager/Location/Detail/LocationDetail.tsx';
import { ConsolidationLocationList } from '@mdm/pages/RDM/LocationManager/ConsolidationLocation/ConsolidationLocationList.tsx';
import { ConsolidationLocationDetail } from '@mdm/pages/RDM/LocationManager/ConsolidationLocation/Detail/ConsolidationLocationDetail.tsx';

export const mdmRoutes: RouteObject = {
  path: ROUTES.RDM,
  children: [
    {
      path: '',
      element: <RDMLanding />,
    },
    {
      path: ROUTES.FAQ,
      children: [
        {
          path: ROUTES.GENERAL,
          element: <FAQGeneral />,
        },
        {
          path: ROUTES.INBOUND,
          element: <FAQGeneral />,
        },
      ],
    },
    {
      path: ROUTES.LOCATION_MANAGER,
      children: [
        {
          path: ROUTES.ZONE_LIST,
          element: <ZoneSubzoneHeader />,
          children: [
            {
              path: '',
              element: <ZoneList />,
            },
          ],
        },
        {
          path: ROUTES.ZONE,
          children: [
            {
              path: ROUTES.CREATE,
              element: <ZoneDetail />,
            },
            {
              path: ':zoneId',
              element: <ZoneDetail />,
            },
          ],
        },
        {
          path: ROUTES.SUB_ZONE_LIST,
          element: <ZoneSubzoneHeader />,
          children: [
            {
              path: '',
              element: <SubzoneList />,
            },
          ],
        },
        {
          path: ROUTES.SUB_ZONE,
          children: [
            {
              path: ROUTES.CREATE,
              element: <SubzoneDetail />,
              children: [
                {
                  path: ':selectedZoneId',
                },
              ],
            },
            {
              path: ':subzoneId',
              element: <SubzoneDetail />,
            },
          ],
        },
        {
          path: ROUTES.LOCATION,
          children: [
            {
              path: '',
              element: <LocationList />,
            },
            {
              path: ROUTES.CREATE,
              element: <LocationDetail />,
            },
            {
              path: ':locationId',
              element: <LocationDetail />,
            },
          ],
        },
        {
          path: ROUTES.CONSOLIDATION_LOCATION,
          children: [
            {
              path: '',
              element: <ConsolidationLocationList />,
            },
            {
              path: ROUTES.CREATE,
              element: <ConsolidationLocationDetail />,
            },
            {
              path: ':locationId',
              element: <ConsolidationLocationDetail />,
            },
          ],
        },
      ],
    },
  ],
};
