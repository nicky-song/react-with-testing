/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Text, View } from '@az/starc-ui';

import s from './EmptySuggestions.module.scss';
import { useTranslation } from 'react-i18next';

export const EmptySuggestions = () => {
  /* Constants */
  const { t } = useTranslation();
  return (
    <View className={s['empty-suggestions']}>
      <Text className={s['empty-suggestions__text']}>{t('Empty.Search.NoSuggestions')}</Text>
    </View>
  );
};
