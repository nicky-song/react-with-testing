/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import * as T from './QuantityBadge.types';
import { Text, View, classNames } from '@az/starc-ui';
import s from './QuantityBadge.module.scss';

export const QuantityBadge = ({ variant, text }: T.Props) => {
  return (
    <View
      direction="row"
      justify-content="center"
      padding={[2, 4]}
      data-testid="quantity-badge-container"
      className={classNames(s[`quantity-badge`], s[`quantity-badge--${variant}`])}
    >
      <Text
        textCase="uppercase"
        size="087"
        weight="bold"
        data-testid="quantity-badge-text"
        className={s['quantity-badge__text']}
      >
        {text}
      </Text>
    </View>
  );
};
