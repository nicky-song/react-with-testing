/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import * as T from './ProfileIcon.types';
import { Text, View, classNames } from '@az/starc-ui';
import styles from './ProfileIcon.module.scss';

export const ProfileIcon = ({ name, iconUrl, className, textClassName }: T.Props) => {
  /* Functions */
  const getInitials = () => {
    if (!name) return '';
    const splitName = name.split(' ');
    if (splitName.length > 1) {
      return `${splitName[0][0]}${splitName[1][0]}`;
    }
    return name.slice(0, 2);
  };

  /* Constants */
  const icon = !iconUrl ? (
    <View
      width="var(--st-unit-12)"
      height="var(--st-unit-12)"
      backgroundColor="accent"
      direction="row"
      wrap={false}
      align="center"
      justify="center"
      className={classNames(styles['profile-icon__no-icon'], className)}
    >
      <Text textCase="uppercase" className={classNames(textClassName)}>
        {getInitials()}
      </Text>
    </View>
  ) : (
    <img
      className={classNames(styles['profile-icon__rounded-icon'], className)}
      src={iconUrl}
      alt={name}
    />
  );

  return <View className={styles['profile-icon']}>{icon}</View>;
};
