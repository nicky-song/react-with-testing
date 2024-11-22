/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Add, Button, Export, Icon, SearchBar, Skeleton, Text, View } from '@az/starc-ui';
import s from '@ofm/pages/Outbound/OrderRequestsBilling/OrderRequestsBilling.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  hasNoPadding?: boolean;
  hasSearchSection?: boolean;
  hasSearchComponents?: boolean;
  hasTitle?: boolean;
  hasWillCallBtn?: boolean;
  hasExportBtn?: boolean;
  searchPlaceholder?: string;
};

export const DetailsTableSkeleton = ({
  hasNoPadding = false,
  hasSearchSection = false,
  hasSearchComponents = false,
  hasTitle = false,
  hasWillCallBtn = false,
  hasExportBtn = false,
  searchPlaceholder,
}: Props) => {
  const { t } = useTranslation();
  return (
    <View padding={hasNoPadding ? 0 : 6}>
      {hasTitle && (
        <View padding={[0, 0, 4, 0]}>
          <Skeleton
            borderRadius="small"
            width="calc(var(--st-unit-20) * 2)"
            height="var(--st-unit-4)"
          />
        </View>
      )}
      {hasSearchSection && (
        <View direction="row" justify="space-between" padding={[0, 0, 8, 0]}>
          <View.Item grow>
            {hasSearchComponents ? (
              <SearchBar
                defaultValue=""
                label={searchPlaceholder || ''}
                className={s['search-bar']}
                variant="pro"
              />
            ) : (
              <Skeleton borderRadius="small" height="var(--st-unit-13)" />
            )}
          </View.Item>
          <View.Item attributes={{ style: { marginLeft: 'var(--st-unit-4)' } }}>
            {hasSearchComponents ? (
              <>
                {hasWillCallBtn && (
                  <Button size="large" attributes={{ style: { height: 'var(--st-unit-13)' } }}>
                    <View direction="row" align="center" justify="center" gap={2}>
                      <Icon svg={Add} color="on-primary" />
                      <Text>{t('NewWillCall')}</Text>
                    </View>
                  </Button>
                )}
                {hasExportBtn && (
                  <Button
                    size="large"
                    variant="secondary"
                    attributes={{ style: { backgroundColor: 'transparent' } }}
                  >
                    <View direction="row" align="center" justify="center" gap={2}>
                      <Text>{t('OrderDetails.Export')}</Text>
                      <Icon svg={Export} color="on-secondary" />
                    </View>
                  </Button>
                )}
              </>
            ) : (
              <Skeleton
                borderRadius="small"
                width="calc(var(--st-unit-19) * 2)"
                height="var(--st-unit-13)"
              />
            )}
          </View.Item>
        </View>
      )}
      <View padding={[0, 0, 2, 0]}>
        <Skeleton borderRadius="small" height="var(--st-unit-6)" />
      </View>
      <View gap={2}>
        <Skeleton height="var(--st-unit-14)" />
        <Skeleton height="var(--st-unit-14)" />
        <Skeleton height="var(--st-unit-14)" />
        <Skeleton height="var(--st-unit-14)" />
        <Skeleton height="var(--st-unit-14)" />
        <Skeleton height="var(--st-unit-14)" />
      </View>
    </View>
  );
};
