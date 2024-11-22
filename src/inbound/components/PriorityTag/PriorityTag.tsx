/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Icon, PriorityHigh, Tag, View } from '@az/starc-ui';
import styles from './PriorityTag.module.scss';

export const PriorityTag = () => {
  return (
    <Tag className={styles['priority-tag']} attributes={{ 'data-testid': 'st-priority-tag' }}>
      <View direction="row" align="center" justify="center" width="fit-content">
        <Icon svg={PriorityHigh} color="white" size={4} />
      </View>
    </Tag>
  );
};
