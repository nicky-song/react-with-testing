/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { View, ProgressBar as StarcProgressBar, Text } from '@az/starc-ui';

import { Props } from './ProgressBar.types';
import styles from './ProgressBar.module.scss';

export const ProgressBar = ({ max, value, label }: Props) => {
  return (
    <>
      <View className={styles['root']} attributes={{ 'data-testid': 'st-progress-bar' }}>
        <View direction="row" className={styles['root']}>
          <View direction="column" className={styles['root__title-container']} gap={4}>
            <View.Item grow className={styles['root__progress-bar-container']}>
              <StarcProgressBar
                label=""
                value={value}
                max={max}
                className={styles['root__progress']}
                containerClassName={styles['root__progress-container']}
                valueColor="600"
              />
            </View.Item>
          </View>
          <View direction="column" className={styles['root__text-container']} align="end">
            <Text className={styles['root__text']}>
              {value} / {max} {label}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};
