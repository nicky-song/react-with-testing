/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from '@mdm/pages/RDM/Landing/RDMLanding.module.scss';
import { Text, View } from '@az/starc-ui';
import { NavigationCard } from '@mdm/pages/RDM/Landing/Partials/NavigationCard.tsx';

export const Miscellaneous = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [priorityCount, setPriorityCount] = useState<number>(0);
  const [ucc128QCParameterCount, setUcc128QCParameterCount] = useState<number>(0);
  const [ucc128VendorCount, setUcc128VendorCount] = useState<number>(0);
  const [addressAppendixCount, setAddressAppendixCount] = useState<number>(0);

  const { t } = useTranslation();

  const navigatonConfigs = [
    {
      title: t('MasterTitle.Priorities'),
      description: `${t('TotalPriorities')}:  ${priorityCount}`,
      onClickHandler: () => ({}),
    },
    {
      title: t('MasterTitle.UCC128QCParameters'),
      description: `${t('TotalParameters')}: ${ucc128QCParameterCount}`,
      onClickHandler: () => ({}),
    },
    {
      title: t('MasterTitle.UCC128Vendors'),
      description: `${t('TotalVendors')}: ${ucc128VendorCount}`,
      onClickHandler: () => ({}),
    },
    {
      title: t('MasterTitle.AddressAppendix'),
      description: `${t('TotalAddresses')}: ${addressAppendixCount}`,
      onClickHandler: () => ({}),
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setPriorityCount(4);
      setUcc128QCParameterCount(5);
      setUcc128VendorCount(6);
      setAddressAppendixCount(7);
      setLoading(false); // fake the api delay
    }, 2000);
  }, []);

  return (
    <>
      <View className={styles['landing__navigation-container']} padding={[3, 6]}>
        <Text className={styles['landing__navigation-title']} size="125" weight="bold">
          {t('RDMLanding.Miscellaneous')}
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
    </>
  );
};
