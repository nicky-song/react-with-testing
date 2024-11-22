/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { FooterProps } from './Footer.types';
import s from './Footer.module.scss';
import { View, classNames } from '@az/starc-ui';

export const Footer = ({ children, className }: FooterProps) => {
  return (
    <View
      direction="row"
      align="center"
      justify="end"
      padding={[4, 6, 4, 0]}
      className={classNames(s['footer'], className)}
    >
      {children}
    </View>
  );
};
