/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect, useRef, useState } from 'react';

import { Dropdown, View, Checkbox, Divider, Text, Actionable } from '@az/starc-ui';

import * as T from './DropdownSelectMenu.types';
import styles from './DropdownSelectMenu.module.scss';
import { useTranslation } from 'react-i18next';
import { KEY } from '@shared/constants/keyConstants';

export const DropdownSelectMenu = ({ options, width, name, label, onChange, onReset }: T.Props) => {
  /* State variables */
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  /* Constants */
  const { t } = useTranslation();

  /* Functions */
  const toggleDropdown = () => setIsOpen(!isOpen);

  const onOptionsChange = (value: string[]) => {
    onChange?.(value);
    setSelectedOptions(value);
  };

  const onResetAll = () => {
    onReset?.();
    setSelectedOptions([]);
  };

  /* Hooks */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = (event as MouseEvent).target || (event as TouchEvent).targetTouches[0];
      if (dropdownRef.current && !dropdownRef.current.contains(target as Node) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === KEY.ESCAPE && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <Dropdown
      attributes={{
        ref: dropdownRef,
      }}
      width={width}
      open={isOpen}
      className={styles['dropdown-select-menu']}
    >
      <Dropdown.Button label={label} onClick={toggleDropdown} />
      <Dropdown.Content>
        <View gap={1} padding={[2, 0]}>
          <Checkbox.Group name={name} onValueChange={onOptionsChange} value={selectedOptions}>
            <View gap={4}>
              {options.map((option: T.DropdownOption, index: number) => (
                <Checkbox key={index} label={option.label} value={option.value} />
              ))}
            </View>
          </Checkbox.Group>
          <Divider color="300" />
          <View padding={4}>
            <Actionable onClick={onResetAll}>
              <Text size="087" weight="medium" variant="text-link">
                {t('PODashboard.ResetAll')}
              </Text>
            </Actionable>
          </View>
        </View>
      </Dropdown.Content>
    </Dropdown>
  );
};
