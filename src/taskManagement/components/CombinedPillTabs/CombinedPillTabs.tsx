/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Button, Dropdown, Text } from '@az/starc-ui';
import { CombinedPillTabsProps } from './CombinedPillTabs.types';
import styles from './CombinedPillTabs.module.scss';

export const CombinedPillTabs = ({ TabsFilterData }: CombinedPillTabsProps) => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(TabsFilterData[0]);
  const MaxTabCount = TabsFilterData.length;

  return (
    <>
      <View
        gap={3}
        direction="row"
        align="center"
        attributes={{ 'data-testid': 'st-combined-pill-tabs' }}
      >
        {TabsFilterData.slice(0, 3).map((filter) => (
          <>
            <View.Item>
              <Button
                className={styles['combined-pill-tabs__button']}
                onClick={() => setSelectedTab(filter)}
                variant={selectedTab.value === filter.value ? 'pill' : 'pill-secondary'}
                attributes={{ style: { width: 'fit-content' } }}
              >
                {t(filter.value)}
              </Button>
            </View.Item>
          </>
        ))}
        <View.Item>
          <Dropdown className={styles['combined-pill-tabs__dropdown']}>
            <Dropdown.Button className={[styles['combined-pill-tabs__dropdown-button']]}>
              <View align="center" gap={0}>
                {t('MoreOptions')}
              </View>
            </Dropdown.Button>
            <Dropdown.Content className={styles['combined-pill-tabs__dropdown-content']}>
              {TabsFilterData.slice(3, MaxTabCount).map((filter) => (
                <Button
                  className={styles['combined-pill-tabs__content-button']}
                  onClick={() => setSelectedTab(filter)}
                  variant={selectedTab.value === filter.value ? 'pill' : 'pill-secondary'}
                  attributes={{ style: { width: 'fit-content' } }}
                >
                  {t(filter.value)}
                </Button>
              ))}
            </Dropdown.Content>
          </Dropdown>
        </View.Item>
      </View>

      <View gap={2} direction="row" align="start" width="100%" padding={[0, 6]}>
        <View padding={0} direction="row">
          <Text>{selectedTab.value}</Text>
        </View>
      </View>
    </>
  );
};
