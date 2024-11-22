/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Divider, Text, View } from '@az/starc-ui';

import * as T from './TextDivider.types';

export const TextDivider = ({ label }: T.Props) => {
  return (
    <View
      direction="row"
      justify="center"
      align="center"
      gap={4}
      width="100%"
      attributes={{ 'data-testid': 'st-text-divider' }}
    >
      <View.Item grow>
        <Divider color="300" />
      </View.Item>
      <View.Item>
        <View textAlign="center">
          <Text size="075" weight="bold" textCase="uppercase">
            {label}
          </Text>
        </View>
      </View.Item>
      <View.Item grow>
        <Divider color="300" />
      </View.Item>
    </View>
  );
};
