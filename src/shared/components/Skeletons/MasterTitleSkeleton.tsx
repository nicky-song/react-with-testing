/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Add, Button, Icon, SearchBar, Skeleton, Text, View, classNames } from '@az/starc-ui';
import s from '@ofm/pages/Outbound/OrderRequestsBilling/OrderRequestsBilling.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  hideSomeOptions?: boolean;
  hasBreadcrumbs?: boolean;
  hasTopSearch?: boolean;
  hasWideTitle?: boolean;
};

export const MasterTitleSkeleton = ({
  hideSomeOptions = false,
  hasBreadcrumbs = false,
  hasTopSearch = false,
  hasWideTitle = false,
}: Props) => {
  const { t } = useTranslation();
  return (
    <View direction="row" justify={hasTopSearch ? 'space-between' : 'start'}>
      <View.Item columns={hasWideTitle ? 5 : undefined}>
        <View gap={2} padding={[0, 6, 2, 0]}>
          {hasBreadcrumbs && (
            <View>
              <Skeleton
                borderRadius="small"
                width="calc(var(--st-unit-30) * 2)"
                height="var(--st-unit-8)"
              />
            </View>
          )}
          <Skeleton
            borderRadius="small"
            width="calc(var(--st-unit-22) * 2)"
            height="var(--st-unit-8)"
          />
          <Skeleton borderRadius="small" width="var(--st-unit-26)" height="var(--st-unit-5)" />
        </View>
      </View.Item>
      <View.Item grow>
        <View direction="row" gap={2} justify={hasTopSearch ? 'end' : 'start'}>
          {hasTopSearch ? (
            <View direction="row" align="end" justify="end" width="100%" gap={2} wrap>
              <View.Item grow>
                <View align="end">
                  <SearchBar
                    defaultValue=""
                    label={t('Search.StoreNumber')}
                    className={classNames(s['search-bar'], s['search-bar__skeleton'])}
                  />
                </View>
              </View.Item>
              <View.Item attributes={{ style: { marginLeft: 'var(--st-unit-4)' } }}>
                <Button
                  variant="secondary"
                  size="large"
                  attributes={{ style: { height: 'var(--st-unit-13)' } }}
                >
                  <View direction="row" align="center" justify="center" gap={2}>
                    <Text>{t('Export')}</Text>
                  </View>
                </Button>
              </View.Item>
              <View.Item attributes={{ style: { marginLeft: 'var(--st-unit-4)' } }}>
                <Button size="large" attributes={{ style: { height: 'var(--st-unit-13)' } }}>
                  <View direction="row" align="center" justify="center" gap={2}>
                    <Icon svg={Add} color="on-primary" />
                    <Text>{t('NewWillCall')}</Text>
                  </View>
                </Button>
              </View.Item>
            </View>
          ) : (
            <>
              <Skeleton
                borderRadius="small"
                width="calc(var(--st-unit-25) * 2)"
                height="var(--st-unit-17)"
              />
              <Skeleton
                borderRadius="small"
                width="calc(var(--st-unit-25) * 2)"
                height="var(--st-unit-17)"
              />
              {!hideSomeOptions && (
                <>
                  <Skeleton
                    borderRadius="small"
                    width="var(--st-unit-16)"
                    height="var(--st-unit-17)"
                  />
                  <Skeleton
                    borderRadius="small"
                    width="calc(var(--st-unit-19) * 2)"
                    height="var(--st-unit-17)"
                  />
                </>
              )}
            </>
          )}
        </View>
      </View.Item>
    </View>
  );
};
