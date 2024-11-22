/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { SidenavOptionProps } from './SidenavOption.types.ts';
import { Text, View, classNames } from '@az/starc-ui';
import styles from './SidenavOption.module.scss';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const SidenavOption = ({ link, title, isDisabled }: SidenavOptionProps) => {
  const { t } = useTranslation();

  return (
    <li className={styles['sidenav-option__item']} data-testid="sidenavOption-container">
      {isDisabled ? (
        <View className={styles['sidenav-option__link--disabled']}>
          <Text weight="bold" color="secondary" className={styles['sidenav-option__text']}>
            {t(title)}
          </Text>
        </View>
      ) : (
        <NavLink
          to={link}
          className={({ isActive }) =>
            classNames(
              styles['sidenav-option__link'],
              !isActive && styles['sidenav-option__link--inactive']
            )
          }
        >
          <Text weight="bold" color="secondary" className={styles['sidenav-option__text']}>
            {t(title)}
          </Text>
        </NavLink>
      )}
    </li>
  );
};
