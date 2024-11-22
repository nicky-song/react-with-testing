/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import * as T from './Profile.types';
import { Dropdown, Icon, Text, View, classNames } from '@az/starc-ui';
import { ChevronDown } from '@az/starc-ui-icons';
import { ProfileIcon } from './ProfileIcon/ProfileIcon';
import { useState } from 'react';
import styles from './Profile.module.scss';

export const Profile = ({ name, title, iconUrl, children }: T.Props) => {
  /* State variables */
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Dropdown
      open={isExpanded}
      className={styles['profile']}
      onClose={() => setIsExpanded(false)}
      onOpen={() => setIsExpanded(true)}
    >
      <Dropdown.Button className={styles['profile__button']}>
        <View className={styles['profile__button-view']}>
          <ProfileIcon
            className={styles['profile__icon']}
            name={name}
            iconUrl={iconUrl}
            textClassName={styles['profile__icon-description']}
          />
          <View className={styles['profile__user-info']} direction="column" justify="center">
            <Text color="on-primary" size="100" weight="bold" className={styles['profile__name']}>
              {name}
            </Text>
            <Text
              color="100"
              fontFamily="body"
              size="087"
              weight="regular"
              className={styles['profile__title']}
            >
              {title}
            </Text>
          </View>
          <View
            height="var(--st-unit-10)"
            width="var(--st-unit-10)"
            className={styles['profile-caret-icon__wrapper']}
          >
            <View
              direction="row"
              align="center"
              justify="center"
              height="100%"
              width="100%"
              className={styles['profile-caret-icon']}
            >
              <Icon
                svg={ChevronDown}
                color="secondary"
                className={classNames(
                  styles['profile__chevron'],
                  isExpanded && styles['profile__chevron--expanded']
                )}
              />
            </View>
          </View>
        </View>
      </Dropdown.Button>
      <Dropdown.Content className={styles['profile__content']}>{children}</Dropdown.Content>
    </Dropdown>
  );
};
