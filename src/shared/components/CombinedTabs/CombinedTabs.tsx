/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Props } from './CombinedTabs.types';
import { Tabs, Text, View, classNames } from '@az/starc-ui';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './CombinedTabs.module.scss';

export const CombinedTabs = ({ tabs, rootPath, isTest }: Props) => {
  /* Constants */
  const location = useLocation();
  const navigate = useNavigate();
  const hasTabAfterRoot = new RegExp(`${rootPath}/.+`).test(location.pathname);
  const defaultTab = hasTabAfterRoot ? location.pathname.split('/').at(-1) : tabs[0]?.value;

  /* State variables */
  const [selectedTab, setSelectedTab] = useState<string | undefined>(defaultTab);

  useEffect(() => {
    if (!hasTabAfterRoot) {
      !isTest && navigate(`${location.pathname}/${defaultTab}`, { replace: true });
    } else {
      setSelectedTab(defaultTab);
    }
  }, [isTest, hasTabAfterRoot, defaultTab, location, navigate]);

  const renderTabContent = (value: string, name: string, items: number) => (
    <View
      direction="row"
      align="center"
      gap={2}
      className={value === selectedTab && styles['combined-tabs__container--active']}
    >
      <View
        className={classNames(
          styles['combined-tabs__badge'],
          value === selectedTab && styles['combined-tabs__badge--selected']
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
    <View backgroundColor="secondary" className={styles['combined-tabs__container']}>
      <Tabs
        zeroBorder
        onTabChange={(value) => {
          setSelectedTab(value);
          navigate(`${rootPath}/${value}`);
        }}
        className={styles['combined-tabs']}
        defaultTab={selectedTab}
      >
        {tabs.map((tab) => {
          return (
            <Tabs.Item
              value={tab.value}
              key={tab.value}
              content={renderTabContent(tab.value, tab.name, tab.numberOfItems)}
            >
              <></>
            </Tabs.Item>
          );
        })}
      </Tabs>
    </View>
  );
};
