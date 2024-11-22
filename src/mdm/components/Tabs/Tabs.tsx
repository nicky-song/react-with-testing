/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect, useState } from 'react';

import { Props } from './Tabs.types';
import { Tabs as StarcTabs, Text, View, classNames } from '@az/starc-ui';
import styles from '@mdm/components/Tabs/Tabs.module.scss';

export const Tabs = ({ tabs }: Props) => {
  /* Constants */
  const defaultTab = tabs[0]?.value;

  /* State variables */
  const [selectedTab, setSelectedTab] = useState<string | undefined>(defaultTab);

  useEffect(() => {
    setSelectedTab(defaultTab);
  }, [defaultTab]);

  const renderTabContent = (value: string, name: string, items: number) => (
    <View
      direction="row"
      align="center"
      gap={2}
      className={value === selectedTab && styles['tabs__container--active']}
    >
      <View
        className={classNames(
          styles['tabs__badge'],
          value === selectedTab && styles['tabs__badge--selected']
        )}
        padding={[0.5, 2]}
      >
        <Text color="secondary" size="087">
          {items}
        </Text>
      </View>
      <Text weight="bold">{name}</Text>
    </View>
  );

  return (
    <View backgroundColor="secondary" className={styles['tabs__container']}>
      <StarcTabs
        zeroBorder
        onTabChange={(value) => {
          setSelectedTab(value);
        }}
        className={styles['tabs']}
      >
        {tabs.map((tab) => {
          return (
            <StarcTabs.Item
              value={tab.value}
              key={tab.value}
              content={renderTabContent(tab.value, tab.name, tab.numberOfItems)}
            >
              {tab.content}
            </StarcTabs.Item>
          );
        })}
      </StarcTabs>
    </View>
  );
};
