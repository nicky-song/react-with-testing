/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Icon, View, classNames } from '@az/starc-ui';
import { ChevronLeft, ChevronRight } from '@az/starc-ui-icons';
import { useState } from 'react';
import { navigation } from '../../constants/navigation';
import { SidenavOptionGroup } from './SidenavOptionGroup/SidenavOptionGroup';
import { SidenavOption } from './SidenavOption/SidenavOption';
import styles from './Sidenav.module.scss';
import { useLocation } from 'react-router-dom';

export const Sidenav = () => {
  /* State variables */
  const [isExpanded, setIsExpanded] = useState(true);

  /* Constants */
  const location = useLocation();
  const chevronSidenav = !isExpanded ? ChevronRight : ChevronLeft;
  const iconAriaLabel = !isExpanded ? 'Open Side Menu' : 'Close Side Menu';
  const containerClass = classNames(
    styles.sidenav__container,
    !isExpanded ? styles['sidenav__container--collapsed'] : null
  );

  /* Functions */
  const getSectionFromUrl = (value: string): boolean => {
    const section = location.pathname.split(`/`)[1];
    return !!section && section === value;
  };

  return (
    <View backgroundColor="primary" className={containerClass}>
      <button
        aria-expanded="true"
        className={styles['sidenav__expand-button']}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={iconAriaLabel}
        data-testid="sidenav-expand-button"
      >
        <Icon svg={chevronSidenav} size={4} color="primary" />
      </button>
      <nav className={styles['sidenav__nav-container']}>
        <ul className={styles['sidenav__main-list']}>
          {/* Map through the navigation items */}
          {navigation.map((item) => (
            <SidenavOptionGroup
              key={item.name}
              title={item.name}
              icon={item.icon}
              link={item.link}
              isParentExpanded={isExpanded}
              setParentExpanded={setIsExpanded}
              isSectionExpanded={getSectionFromUrl(item.value)}
            >
              <ul className={styles['sidenav__secondary-list']}>
                {/* Map through the secondary navigation items */}
                {item.secondaryLinks.map((secondaryItem) => (
                  <SidenavOption
                    title={secondaryItem.name}
                    link={secondaryItem.link}
                    key={secondaryItem.name}
                    isDisabled={secondaryItem.isDisabled}
                  />
                ))}
              </ul>
            </SidenavOptionGroup>
          ))}
        </ul>
      </nav>
    </View>
  );
};
