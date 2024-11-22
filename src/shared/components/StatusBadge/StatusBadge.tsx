/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import * as T from './StatusBadge.types';
import { Text, View, classNames } from '@az/starc-ui';
import s from './StatusBadge.module.scss';

export const StatusBadge = ({ variant, text }: T.Props) => {
  return (
    <View
      direction="row"
      justify="center"
      align="center"
      min-height="var(--st-unit-6)"
      width="fit-content"
      borderRadius="small"
      data-testid="status-badge-container"
      className={classNames(s[`status-badge`], s[`status-badge--${variant}`])}
    >
      <Text
        textCase="uppercase"
        size="075"
        weight="bold"
        data-testid="status-badge-text"
        className={s['status-badge__text']}
      >
        {text}
      </Text>
    </View>
  );
};
