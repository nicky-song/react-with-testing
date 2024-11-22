/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { View, Store } from '@az/starc-ui';

import { t } from 'i18next';

import { EmptyState } from '@shared/components/EmptyState/EmptyState';

import s from './EmptyStatePage.module.scss';

export const EmptyStatePage = ({ text = t('CombinedTabs.Waves.ReadyToRequest') }) => {
  return (
    <View height="100%" className={s['empty-state']}>
      <EmptyState
        svg={Store}
        subtitle={t('Empty.Store.Subtitle')}
        text={t('Empty.Store.Text', { orderType: text })}
      />
    </View>
  );
};
