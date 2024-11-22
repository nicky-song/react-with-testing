/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { classNames, View, Text } from '@az/starc-ui';

import { AvatarProps } from './Avatar.types';
import styles from './Avatar.module.scss';

export const Avatar = ({ name, iconUrl, size, showText, textCase, className }: AvatarProps) => {
  const getInitials = (name: string) => {
    if (!name) return '';
    const splitName = name.split(' ');
    if (splitName.length > 1) {
      return `${splitName[0][0]}${splitName[1][0]}`;
    }
    return name.slice(0, 2);
  };

  const icon = !iconUrl ? (
    <Text
      color="50"
      weight="light"
      textCase="uppercase"
      className={classNames(
        styles['avatar__icon__description'],
        styles[`avatar__icon__description--${size}`]
      )}
    >
      {getInitials(name)}
    </Text>
  ) : (
    <img
      className={classNames(styles['avatar__icon__image'], className)}
      src={iconUrl}
      alt={name}
      width="100%"
      height="100%"
    />
  );

  return (
    <View
      direction="row"
      align="center"
      gap={showText ? 2 : 0}
      className={classNames(styles['avatar'], className)}
      attributes={{ 'data-testid': 'st-avatar' }}
    >
      <View
        borderRadius="round"
        direction="row"
        wrap={false}
        align="center"
        justify="center"
        className={classNames(styles['avatar__icon'], styles[`avatar__icon--${size}`])}
      >
        {icon}
      </View>

      {showText && (
        <Text size={size == 'small' ? '087' : '100'} weight="light" textCase={textCase}>
          {name}
        </Text>
      )}
    </View>
  );
};
