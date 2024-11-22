/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Dropdown, Text, View, Button, classNames } from '@az/starc-ui';
import * as T from './DropdownMenu.types';
import styles from './DropdownMenu.module.scss';

export const DropdownMenu = ({ options, isOpen, width, selectedId, onChange }: T.Props) => {
  /* Functions */
  const handleChangeOption = (id: string) => {
    onChange(id);
  };

  const getLabelFromId = (id: string) => {
    const option = options?.find((option) => option.id === id);
    return option?.name;
  };

  return (
    <Dropdown width={width} open={isOpen} className={styles['dropdown-menu']}>
      <Dropdown.Button className={styles['dropdown-menu__button']}>
        <Text className={styles['dropdown-menu__button-text']}>{getLabelFromId(selectedId)}</Text>
      </Dropdown.Button>
      <Dropdown.Content className={styles['dropdown-menu__content']}>
        <View className={styles['dropdown-menu__view']}>
          {options &&
            options.map((option) => (
              <Button
                className={classNames(styles['item-button'], styles['dropdown-menu__item'])}
                key={option.id}
                animateOnClick={false}
                onClick={() => {
                  handleChangeOption(option.id);
                }}
              >
                <Text className={styles['dropdown-menu__item-text']}>{option.name}</Text>
              </Button>
            ))}
        </View>
      </Dropdown.Content>
    </Dropdown>
  );
};
