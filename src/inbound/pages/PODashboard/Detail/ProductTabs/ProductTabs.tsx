/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Props } from './ProductTabs.types';
import { Tabs, Text, View, classNames } from '@az/starc-ui';
import { useState } from 'react';
import styles from './ProductTabs.module.scss';

import { EmptyStatePage } from '@outbound/components/EmptyState/EmptyStatePage';

export const ProductTabs = ({ tabs }: Props) => {
  /* State variables */
  const [selectedTab, setSelectedTab] = useState<string | undefined>(tabs[0]?.value);

  const renderTabContent = (value: string, name: string, items: number) => (
    <View
      direction="row"
      align="center"
      gap={2}
      className={value === selectedTab && styles['product-tabs__container--active']}
    >
      <View
        className={classNames(
          styles['product-tabs__badge'],
          value === selectedTab && styles['product-tabs__badge--selected']
        )}
        padding={[0.5, 2]}
        borderRadius="round"
      >
        <Text color="secondary" size="087">
          {items}
        </Text>
      </View>
      <Text weight="bold">{name}</Text>
    </View>
  );

  return (
    <View className={styles['product-tabs']}>
      <Tabs
        zeroBorder
        onTabChange={(value) => {
          setSelectedTab(value);
        }}
        className={styles['product-tabs__tab-item']}
        defaultTab={selectedTab}
      >
        {tabs.map((tab) => {
          return (
            <Tabs.Item
              value={tab.value}
              key={tab.value}
              content={renderTabContent(tab.value, tab.name, tab.numberOfItems)}
            >
              {tab.numberOfItems > 0 ? <tab.item /> : <EmptyStatePage />}
            </Tabs.Item>
          );
        })}
      </Tabs>
    </View>
  );
};
