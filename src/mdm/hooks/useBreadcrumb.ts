/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useLocation } from 'react-router-dom';
import { PAGE_URLS } from '@shared/constants/routes.ts';
import { useTranslation } from 'react-i18next';
import { BreadcrumbsUrl } from '@shared/components/MasterTitle/MasterTitle.types.ts';

export const useBreadcrumb = (pathname = '') => {
  const location = useLocation();
  const { t } = useTranslation();

  const matchingPathname = pathname || location.pathname;
  const breadcrumbs: BreadcrumbsUrl = {
    data: [
      {
        label: t('Sidenav.ReferenceDataManager'),
        url: PAGE_URLS.RDM,
      },
    ],
  };

  switch (matchingPathname) {
    case PAGE_URLS.ZONE_LIST:
    case PAGE_URLS.SUB_ZONE_LIST:
      breadcrumbs.data.push({
        label: t('MasterTitle.ZonesAndSubZones'),
        url: '',
      });

      break;

    case PAGE_URLS.ZONE_CREATE:
      breadcrumbs.data.push(
        {
          label: t('MasterTitle.ZonesAndSubZones'),
          url: PAGE_URLS.ZONE_LIST,
        },
        {
          label: t('ZoneDetails.Title'),
          url: '',
        }
      );

      break;

    case PAGE_URLS.SUB_ZONE_CREATE:
      breadcrumbs.data.push(
        {
          label: t('MasterTitle.ZonesAndSubZones'),
          url: PAGE_URLS.SUB_ZONE_LIST,
        },
        {
          label: t('SubzoneDetails.Title'),
          url: '',
        }
      );

      break;

    case PAGE_URLS.LOCATION_LIST:
      breadcrumbs.data.push({
        label: t('MasterTitle.Locations'),
        url: PAGE_URLS.SUB_ZONE_LIST,
      });
      break;

    case PAGE_URLS.LOCATION_CREATE:
      breadcrumbs.data.push(
        {
          label: t('MasterTitle.Locations'),
          url: PAGE_URLS.LOCATION_LIST,
        },
        {
          label: t('LocationDetails.Title'),
          url: '',
        }
      );

      break;

    case PAGE_URLS.CONSOLIDATION_LOCATION_LIST:
      breadcrumbs.data.push({
        label: t('MasterTitle.ConsolidationLocations'),
        url: PAGE_URLS.CONSOLIDATION_LOCATION_LIST,
      });
      break;

    case PAGE_URLS.CONSOLIDATION_LOCATION_CREATE:
      breadcrumbs.data.push(
        {
          label: t('MasterTitle.ConsolidationLocations'),
          url: PAGE_URLS.CONSOLIDATION_LOCATION_LIST,
        },
        {
          label: t('ConsolidationLocationDetails.Name'),
          url: '',
        }
      );

      break;
  }

  return breadcrumbs;
};
