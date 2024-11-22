/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { View, classNames } from '@az/starc-ui';

import { EmptyStatePage } from '@outbound/components/EmptyState/EmptyStatePage';

import styles from './OrderTabs.module.scss';

export const TransferOrders = () => {
  return (
    <>
      <View
        direction="column"
        padding={6}
        className={classNames(styles['tab--bg-color'], styles['tab__content'])}
      >
        <EmptyStatePage />
      </View>
    </>
  );
};
