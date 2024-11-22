/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { View } from '@az/starc-ui';
import s from './MainContainer.module.scss';

export const MainContainer = ({ children }: { children?: React.ReactElement }) => {
  return (
    <View.Item grow className={s['main']}>
      {children}
    </View.Item>
  );
};
