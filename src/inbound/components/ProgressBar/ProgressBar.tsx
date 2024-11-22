/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { View, ProgressBar as StarcProgressBar } from '@az/starc-ui';

import { Props } from './ProgressBar.types';
import styles from './ProgressBar.module.scss';

export const ProgressBar = ({ max, value, label }: Props) => {
  return (
    <View className={styles['root']} attributes={{ 'data-testid': 'st-progress-bar' }}>
      <StarcProgressBar
        label={label}
        labelAlign="right"
        value={value}
        max={max}
        className={styles['root__progress']}
        containerClassName={styles['root__progress-container']}
        valueColor="600"
        barColor="300"
      />
    </View>
  );
};
