/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useRef, useState } from 'react';
import { Card, Checkbox, Icon, classNames, Text, View, Actionable } from '@az/starc-ui';
import { ChevronRight } from '@az/starc-ui-icons';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import * as T from './CheckBoxCard.types';
import styles from './CheckBoxCard.module.scss';
import { Tag } from '@shared/components/Tag/Tag';
import { KEY, KEY_CODE } from '@shared/constants/keyConstants';

export const CheckBoxCard = ({
  title,
  label,
  statusBadge,
  isCheckboxDisabled,
  isCardDisabled,
  isInErrorState,
  shouldHideCheckbox,
  onChangeHandler,
  isChecked,
  onClick,
  tag,
}: T.Props) => {
  /* State variables */
  const [isFocused, setIsFocused] = useState(false);

  /* Constants */
  const actionRef = useRef<HTMLButtonElement>(null);

  /* Functions */
  const preventFocusOnClick = () => {
    if (actionRef.current) actionRef.current.blur();
  };

  const handleFocusChange = () => {
    setIsFocused(!isFocused);
  };

  const handleKeyDown = (e: { key: string; keyCode: number; preventDefault: () => void }) => {
    if (e.key === KEY.ENTER || e.keyCode === KEY_CODE.ENTER) {
      e.preventDefault();
      onClick && onClick();
    }
  };

  return (
    <label>
      <Card
        className={classNames(
          styles['card'],
          isCardDisabled && styles['card--disabled'],
          isInErrorState && styles['card--error'],
          isFocused && styles['card--focused']
        )}
        hasHoverEffect={false}
        attributes={{
          onClick: preventFocusOnClick,
        }}
      >
        {!shouldHideCheckbox && (
          <Checkbox
            value={title}
            disabled={isCheckboxDisabled || isCardDisabled}
            className={styles['card__checkbox']}
            onChange={onChangeHandler ? () => onChangeHandler(title) : undefined}
            checked={isChecked}
            aria-disabled={isCheckboxDisabled || isCardDisabled}
            name={title}
          />
        )}
        <Text variant="main-body" weight="medium" as="span" className={styles['card__title']}>
          {title}
        </Text>
        <Text
          variant="main-body"
          color="primary"
          size="087"
          as="span"
          className={styles['card__label']}
        >
          {label}
        </Text>
        <View direction="row" className={styles['card__edge']}>
          {tag && (
            <View className={styles['card__tag']} padding={[0, 4]}>
              <Tag text={tag.text} variant={tag.variant} />
            </View>
          )}
          {statusBadge && (
            <View padding={[0, 4]}>
              <StatusBadge variant={statusBadge.variant} text={statusBadge.text} />
            </View>
          )}
          <Actionable
            ref={actionRef}
            className={classNames(
              styles['card__link'],
              isCardDisabled && styles['card__link--disabled']
            )}
            onClick={onClick}
            attributes={{
              onFocus: handleFocusChange,
              onBlur: handleFocusChange,
              onKeyDown: handleKeyDown,
              onMouseDown: (e) => e.preventDefault(),
            }}
          >
            <Icon svg={ChevronRight} className={styles['card__chevron']} color="primary" />
          </Actionable>
        </View>
      </Card>
    </label>
  );
};
