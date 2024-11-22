/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import {
  useEffect,
  useRef,
  useState,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from 'react';

import { classNames, Dropdown, Icon, View } from '@az/starc-ui';

import { Ellipses } from '@shared/assets/icons';
import { KEY } from '@shared/constants/keyConstants';

import { ActionDropdownProps } from '@shared/components/ActionDropdownMenu/ActionDropdownMenu.types.ts';
import styles from '@shared/components/ActionDropdownMenu/ActionDropdownMenu.module.scss';

export const ActionDropdownMenu = ({ children, isOpen }: ActionDropdownProps) => {
  /* State variables */
  const [open, setOpen] = useState<boolean>(false);
  const actioDropdownRef = useRef<HTMLDivElement | null>(null);

  /* Functions */
  const toggleDropdown = () => setOpen(!open);

  const handleDopdownButtonClick = (
    e: ReactKeyboardEvent<HTMLElement> | ReactMouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    toggleDropdown();
  };

  /* Hooks */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = (event as MouseEvent).target || (event as TouchEvent).targetTouches[0];
      if (actioDropdownRef.current && !actioDropdownRef.current.contains(target as Node) && open) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === KEY.ESCAPE && open) {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    isOpen ? setOpen(isOpen) : setOpen(false);
  }, [isOpen]);

  return (
    <View
      attributes={{
        ref: actioDropdownRef,
      }}
    >
      <Dropdown
        width={250}
        open={open}
        className={styles['action-dropdown']}
        placement="bottom-end"
      >
        <Dropdown.Button
          className={classNames(
            styles['action-dropdown__button'],
            styles['action-dropdown__button-icon']
          )}
          onClick={(e) => handleDopdownButtonClick(e)}
        >
          <Icon svg={Ellipses} />
        </Dropdown.Button>
        <Dropdown.Content>{children}</Dropdown.Content>
      </Dropdown>
    </View>
  );
};
