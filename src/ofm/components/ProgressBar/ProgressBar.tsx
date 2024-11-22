/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Text, View, ProgressBar as StarcProgressBar } from '@az/starc-ui';
import styles from './ProgressBar.module.scss';
import { Props } from './ProgressBar.types';

export const ProgressBar = ({ max, value, dateString, title, text }: Props) => {
  return (
    <View data-testid="progress-bar" direction="row" className={styles['root']}>
      <View direction="column" className={styles['root__title-container']} gap={4}>
        <Text className={styles['root__title']}>{`${max} ${title}`}</Text>
        <View.Item grow className={styles['root__progress-bar-container']}>
          <StarcProgressBar
            label=""
            value={value}
            max={max}
            className={styles['root__progress']}
            valueColor="600"
          />
        </View.Item>
      </View>
      <View direction="column" className={styles['root__text-container']} align="end">
        <Text className={styles['root__date']}>{dateString}</Text>
        <Text className={styles['root__text']}>
          {value} / {max} {text}
        </Text>
      </View>
    </View>
  );
};
