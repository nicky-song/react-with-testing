/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ReactNode } from 'react';

import { View, Text } from '@az/starc-ui';

import styles from './OrderSection.module.scss';

type Props = {
  title?: string;
  children: ReactNode;
};

export const OrderSection = ({ title, children }: Props) => {
  return (
    <View direction="column" className={styles['order-section']}>
      {title && (
        <Text size="125" weight="bold">
          {title}
        </Text>
      )}
      <View gap={2}>{children}</View>
    </View>
  );
};
