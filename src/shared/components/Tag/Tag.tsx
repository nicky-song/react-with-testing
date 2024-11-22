/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { classNames, Icon, Tag as STag, Text, View, Warning } from '@az/starc-ui';
import * as T from './Tag.types';
import styles from './Tag.module.scss';

export const Tag = ({ variant = 'commodity', text, className }: T.Props) => {
  return (
    <STag className={classNames(styles['tag'], styles[`tag--${variant}`], className)}>
      <View direction="row" align="center" justify="center" width="fit-content">
        {variant === 'hazmat' && <Icon className={styles['tag__icon']} svg={Warning} />}
        <Text
          size="075"
          weight="bold"
          className={classNames(styles['tag__text'], styles[`tag__text--${variant}`])}
        >
          {text}
        </Text>
      </View>
    </STag>
  );
};
