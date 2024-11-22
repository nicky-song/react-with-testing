/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useTranslation } from 'react-i18next';

import { Skeleton, View } from '@az/starc-ui';

import { CombinedTabsSkeleton } from '@shared/components/Skeletons/CombinedTabsSkeleton';
import { DetailsTableSkeleton } from '@shared/components/Skeletons/DetailsTableSkeleton';

import styles from './PODetail.module.scss';

export const PODetailSkeleton = () => {
  /* Constants */
  const { t } = useTranslation();

  const tabTitles = {
    QUANTITY_UNMATCHED: t('CombinedTabs.PODetails.QuantityUnmatched'),
    QUANTITY_MATCHED: t('CombinedTabs.PODetails.QuantityMatched'),
  };

  /* Functions */
  const renderPOStatisticItems = () => {
    const items = [];

    for (let i = 0; i < 4; i++) {
      items.push(
        <View.Item
          key={t('PODashboard.ItemKey', { item: 'poDetailStat', key: i })}
          grow
          backgroundColor="secondary"
        >
          <Skeleton width="100%" height="var(--st-unit-16)" />
        </View.Item>
      );
    }

    return items;
  };

  const renderSidebarItems = () => {
    const items = [];

    for (let i = 0; i < 4; i++) {
      items.push(
        <View
          key={t('PODashboard.ItemKey', { item: 'poDetailSidebarItem', key: i })}
          className={styles['po-detail__left-column__accordion']}
        >
          <Skeleton borderRadius="small" width="100%" height="var(--st-unit-11)" />
        </View>
      );
    }

    return items;
  };

  return (
    <View direction="column" height="100%" className={styles['po-detail']}>
      <View
        padding={6}
        backgroundColor="secondary"
        className={styles['po-detail__skeleton__master-title']}
      >
        <View direction="row" justify="start" align="center">
          <View.Item>
            <View gap={2} padding={[0, 6, 2, 0]}>
              <View>
                <Skeleton
                  borderRadius="small"
                  width="calc(var(--st-unit-21) * 2)"
                  height="var(--st-unit-3)"
                />
              </View>

              <Skeleton
                borderRadius="small"
                width="calc(var(--st-unit-28) * 4)"
                height="var(--st-unit-9)"
              />

              <Skeleton
                borderRadius="small"
                width="calc(var(--st-unit-32) * 2)"
                height="var(--st-unit-6)"
              />
            </View>
          </View.Item>

          <View.Item grow>
            <View direction="row" justify="end" align="center" gap={4}>
              <View.Item>
                <Skeleton
                  borderRadius="small"
                  width="var(--st-unit-27)"
                  height="var(--st-unit-6)"
                />
              </View.Item>

              <View.Item>
                <Skeleton
                  borderRadius="small"
                  width="var(--st-unit-32)"
                  height="var(--st-unit-12)"
                />
              </View.Item>

              <View.Item>
                <View direction="row">
                  <Skeleton
                    borderRadius="small"
                    width="var(--st-unit-6)"
                    height="var(--st-unit-6)"
                  />
                </View>
              </View.Item>
            </View>
          </View.Item>
        </View>
      </View>

      <View direction="row" width="100%" height="100%" wrap={false}>
        <View.Item
          columns={{ s: 4, m: 4, l: 4, xl: 3 }}
          className={styles['po-detail__left-column']}
          attributes={{
            'data-testid': 'po-details-left-column',
          }}
        >
          <View>{renderSidebarItems()}</View>
        </View.Item>

        <View.Item
          grow
          className={styles['po-detail__right-column']}
          attributes={{
            'data-testid': 'po-details-right-column',
          }}
        >
          <View
            direction="row"
            padding={[4, 6]}
            className={styles['po-detail__right-column__statistics']}
          >
            {renderPOStatisticItems()}
          </View>

          <View
            direction="row"
            padding={[4, 6]}
            className={styles['po-detail__right-column__search-wrapper']}
          >
            <View.Item>
              <Skeleton width="calc(var(--st-unit-25) * 4)" height="var(--st-unit-12)" />
            </View.Item>
          </View>

          <View>
            <CombinedTabsSkeleton tabs={Object.values(tabTitles)} />
            <DetailsTableSkeleton />
          </View>
        </View.Item>
      </View>
    </View>
  );
};
