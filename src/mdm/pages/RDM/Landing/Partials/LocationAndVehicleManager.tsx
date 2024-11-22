/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from '@mdm/pages/RDM/Landing/RDMLanding.module.scss';
import { Divider, Text, View } from '@az/starc-ui';
import { PAGE_URLS } from '@shared/constants/routes.ts';
import { useNavigate } from 'react-router-dom';
import { NavigationCard } from '@mdm/pages/RDM/Landing/Partials/NavigationCard.tsx';

export const LandingAndVehicleManager = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [zoneCount, setZoneCount] = useState<number>(0);
  const [subzoneCount, setSubzoneCount] = useState<number>(0);
  const [locationCount, setLocationCount] = useState<number>(0);
  const [consolidationLocationCount, setConsolidationLocationCount] = useState<number>(0);
  const [vehicleCount, setVehicleCount] = useState<number>(0);
  const [skuSubzoneMinOrMaxCount, setSkuSubzoneMinOrMaxCount] = useState<number>(0);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigatonConfigs = [
    {
      title: t('MasterTitle.ZonesAndSubZones'),
      description: `${t('TotalZones', { count: zoneCount })} | ${t('TotalSubzones', {
        count: subzoneCount,
      })}`,
      onClickHandler: () => navigate(PAGE_URLS.ZONE_LIST),
    },
    {
      title: t('MasterTitle.Locations'),
      description: `${t('TotalLocations')}: ${locationCount}`,
      onClickHandler: () => navigate(PAGE_URLS.LOCATION_LIST),
    },
    {
      title: t('MasterTitle.ConsolidationLocations'),
      description: `${t('TotalConsolidationLocations')}: ${consolidationLocationCount}`,
      onClickHandler: () => navigate(PAGE_URLS.CONSOLIDATION_LOCATION_LIST),
    },
    {
      title: t('MasterTitle.Vehicles'),
      description: `${t('TotalVehicles')}: ${vehicleCount}`,
      onClickHandler: () => ({}),
    },
    {
      title: t('MasterTitle.SKUSubzoneMinOrMax'),
      description: `${t('TotalProducts')}: ${skuSubzoneMinOrMaxCount}`,
      onClickHandler: () => ({}),
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setZoneCount(41);
      setSubzoneCount(271);
      setVehicleCount(6);
      setConsolidationLocationCount(121);
      setLocationCount(693);
      setSkuSubzoneMinOrMaxCount(9);
      setLoading(false); // fake the api delay
    }, 2000);
  }, []);

  return (
    <>
      <View className={styles['landing__navigation-container']} padding={[6, 6, 3, 6]}>
        <Text className={styles['landing__navigation-title']} size="125" weight="bold">
          {t('RDMLanding.LocationAndVehiclesManager')}
        </Text>
        <View width="100%" direction="row" gap={4}>
          {navigatonConfigs.map((config) => (
            <View.Item className={styles['landing__navigation-card']} columns={{ s: 12, l: 4 }}>
              <NavigationCard
                isLoading={isLoading}
                title={config.title}
                description={config.description}
                onClickHandler={config.onClickHandler}
              />
            </View.Item>
          ))}
        </View>
      </View>

      <View padding={[3, 6]}>
        <Divider color="300" />
      </View>
    </>
  );
};
