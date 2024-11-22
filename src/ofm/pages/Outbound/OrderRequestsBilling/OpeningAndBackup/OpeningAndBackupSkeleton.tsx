/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { View, Skeleton as StarcSkeleton } from '@az/starc-ui';
import s from './OpeningAndBackup.module.scss';

type Props = {
  items?: number;
};

const OrdersGridSkeleton = ({ items = 6 }: Props) => {
  return (
    <View gap={6}>
      <StarcSkeleton borderRadius="small" width="30%" height="var(--st-unit-7)" />
      <View as="ul" gap={4} className={s['orders-list']}>
        {Array(items)
          .fill(null)
          .map((_, index) => (
            <View.Item as="li" className={s['orders-list__item']} key={index}>
              <StarcSkeleton height="var(--st-unit-18)" />
            </View.Item>
          ))}
      </View>
    </View>
  );
};

export const OpeningAndBackupSkeleton = () => {
  return (
    <View gap={10}>
      <StarcSkeleton width="100%" height="var(--st-unit-20)" />
      <OrdersGridSkeleton />
      <OrdersGridSkeleton />
    </View>
  );
};
