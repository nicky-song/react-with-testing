/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from '@mdm/pages/RDM/Landing/RDMLanding.module.scss';
import { Divider, Text, View } from '@az/starc-ui';
import { NavigationCard } from '@mdm/pages/RDM/Landing/Partials/NavigationCard.tsx';

export const OutboundConfiguration = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [orderTypeCount, setOrderTypeCount] = useState<number>(0);

  const { t } = useTranslation();

  const navigatonConfigs = [
    {
      title: t('MasterTitle.OrderTypes'),
      description: `${t('TotalOrderTypes')}:  ${orderTypeCount}`,
      onClickHandler: () => ({}),
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setOrderTypeCount(11);
      setLoading(false); // fake the api delay
    }, 2000);
  }, []);

  return (
    <>
      <View className={styles['landing__navigation-container']} padding={[3, 6]}>
        <Text className={styles['landing__navigation-title']} size="125" weight="bold">
          {t('RDMLanding.OutboundConfiguration')}
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
