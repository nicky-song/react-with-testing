/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { SidenavOptionGroupProps } from './SidenavOptionGroup.types';
import { Icon, Text, classNames } from '@az/starc-ui';
import { ChevronDown, ChevronUp } from '@az/starc-ui-icons';
import { useEffect, useState } from 'react';
import styles from './SidenavOptionGroup.module.scss';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export const SidenavOptionGroup = ({
  title,
  link,
  icon,
  isSectionExpanded,
  isParentExpanded,
  setParentExpanded,
  children,
}: SidenavOptionGroupProps) => {
  /* State variables */
  const [isExpanded, setIsExpanded] = useState(false);

  /* Constants */
  const { t } = useTranslation();
  const textClass = classNames(
    styles['sidenav-option-group__text'],
    !isParentExpanded ? styles['sidenav-option-group__text--collapsed'] : null
  );

  const itemClass = classNames(
    styles['sidenav-option-group__item'],
    !isExpanded ? styles['sidenav-option-group__item--inactive'] : null
  );

  const containerClass = classNames(
    styles['sidenav-option-group__container'],
    !isParentExpanded ? styles['sidenav-option-group__container--collapsed'] : null
  );

  /* Functions */
  const handleClick = () => {
    // Parent is collapsed and submenu is collapsed, then submenu and parent are expanded
    if (!isParentExpanded && !isExpanded) {
      setParentExpanded(true);
      setIsExpanded(true);
    }
    // Parent is collapsed but submenu is expanded, then only expand the parent
    else if (!isParentExpanded && isExpanded) {
      setParentExpanded(true);
    }
    // Parent is expanded, then collapse or expand the submenu depending on state
    else {
      setIsExpanded(!isExpanded);
    }
  };

  /* Hooks */
  // Expands the correct section based on the url
  useEffect(() => {
    isSectionExpanded && setIsExpanded(true);
  }, [isSectionExpanded]);

  return (
    <li className={containerClass} data-testid="sidenavOptionGroup-container">
      {/* This is a special NavLink for the Home button of the Sidenav since this one doesn't open up */}
      {title === 'Sidenav.Home' ? (
        <NavLink
          to={link}
          className={({ isActive }) => {
            return !isActive
              ? classNames(
                  styles['sidenav-option-group__item'],
                  styles['sidenav-option-group__item--inactive']
                )
              : styles['sidenav-option-group__item'];
          }}
        >
          <Icon svg={icon} color="secondary" />
          <Text weight="bold" color="secondary" className={textClass}>
            {t(title)}
          </Text>
        </NavLink>
      ) : (
        <button className={itemClass} onClick={handleClick} data-testid="sidenavOptionGroup-button">
          <Icon svg={icon} color="secondary" className={styles['sidenav-option-group__icon']} />
          <Text weight="bold" color="secondary" className={textClass}>
            {t(title)}
          </Text>
          {isParentExpanded && (
            <Icon
              svg={isExpanded ? ChevronUp : ChevronDown}
              color="secondary"
              className={styles['sidenav-option-group__right-arrow']}
              size={4}
            />
          )}
        </button>
      )}
      {isParentExpanded && isExpanded && children}
    </li>
  );
};
