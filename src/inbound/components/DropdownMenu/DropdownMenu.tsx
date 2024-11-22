/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Dropdown, Icon, Text, View, Button, classNames } from '@az/starc-ui';

import { Ellipses } from '@shared/assets/icons';

import * as T from './DropdownMenu.types';
import styles from './DropdownMenu.module.scss';

export const DropdownMenu = ({ options, isOpen, width, onChange }: T.Props) => {
  const handleChangeOption = (id: string) => {
    onChange(id);
  };

  return (
    <Dropdown width={width} open={isOpen} className={styles['dropdown-menu']}>
      <Dropdown.Button className={styles['dropdown-menu__button']}>
        <Icon svg={Ellipses} color="primary" />
      </Dropdown.Button>
      <Dropdown.Content className={styles['dropdown-menu__content']}>
        <View direction="column" padding={[2, 0]} className={styles['dropdown-menu__view']}>
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
                <Text
                  size="087"
                  weight="regular"
                  fontFamily="body"
                  color={option.color ? option.color : 'primary'}
                  className={styles['dropdown-menu__item-text']}
                >
                  {option.name}
                </Text>
              </Button>
            ))}
        </View>
      </Dropdown.Content>
    </Dropdown>
  );
};
