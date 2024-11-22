/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { View, Skeleton } from '@az/starc-ui';
import { useTranslation } from 'react-i18next';

import { Props } from './LocationSuggestionSkeleton.types.ts';

export const LocationSuggestionSkeleton = ({ className }: Props) => {
  const { t } = useTranslation();
  return (
    <View className={className} padding={[4, 4]} direction="column">
      <View direction="column" gap={5}>
        <View.Item grow>
          <Skeleton />
        </View.Item>
        <View.Item grow>
          <View direction="row" gap={5}>
            <View.Item grow>
              <View direction="row">
                <View.Item>{`${t('LocationDetails.Name')}:`} </View.Item>
                <View.Item grow>
                  <Skeleton />
                </View.Item>
              </View>
            </View.Item>
          </View>
        </View.Item>
      </View>
    </View>
  );
};