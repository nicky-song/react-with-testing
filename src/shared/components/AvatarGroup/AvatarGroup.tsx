/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { classNames, Text, View } from '@az/starc-ui';

import { Avatar } from '@shared/components/Avatar/Avatar';
import { MAX_VISIBLE_AVATARS } from '@shared/constants/constants';

import { AvatarGroupProps } from './AvatarGroup.types';
import styles from './AvatarGroup.module.scss';

export const AvatarGroup = ({ users, size, maxDisplay, className }: AvatarGroupProps) => {
  const avatarMaxCount = maxDisplay ? maxDisplay : MAX_VISIBLE_AVATARS,
    avatarCount = users.length;

  return (
    <View
      direction="row"
      align="center"
      gap={1}
      className={classNames(styles['avatar-group'], className)}
      attributes={{ 'data-testid': 'st-avatar-group' }}
    >
      <View.Item>
        <View direction="row" className={styles['avatar-group__item']} gap={0}>
          {users.slice(0, avatarMaxCount).map((user, key) => {
            return (
              <div
                className={classNames(styles['avatar-group__item__wrapper'], className)}
                style={{ zIndex: avatarMaxCount - key }}
              >
                <Avatar
                  key={'avatar' + key}
                  name={user.firstName + ' ' + user.lastName}
                  iconUrl={user.iconUrl}
                  size={size}
                  className={classNames(styles['avatar-group__item-avatar'], className)}
                />
              </div>
            );
          })}
        </View>
      </View.Item>
      {avatarCount > avatarMaxCount && (
        <View.Item>
          <Text color="primary" size={size == 'small' ? '087' : '100'}>
            +{avatarCount - avatarMaxCount}
          </Text>
        </View.Item>
      )}
    </View>
  );
};
