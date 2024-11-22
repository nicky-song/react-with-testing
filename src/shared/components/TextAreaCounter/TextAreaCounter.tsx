/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Text, View } from '@az/starc-ui';
import * as T from './TextAreaCounter.types';
import { MAX_TEXTAREA_LENGTH } from '@shared/constants/constants';

export const TextAreaCounter = ({ count, maxCount = MAX_TEXTAREA_LENGTH }: T.Props) => {
  /* Constants */
  const initialCount = count || 0;

  return (
    <View direction="row" justify="end">
      <Text
        color={count > maxCount ? 'error' : '600'}
        size="087"
      >{`${initialCount}/${maxCount}`}</Text>
    </View>
  );
};
