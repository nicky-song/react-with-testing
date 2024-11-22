/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import * as T from './ExtendedStepper.types';
import { Stepper, Text, View, classNames } from '@az/starc-ui';
import { ChangeEvent, useCallback, useState } from 'react';
import styles from './ExtendedStepper.module.scss';

export const ExtendedStepper = ({
  withButtons = true,
  isEditable = true,
  correctOnBlur = true,
  isValueRounded = false,
  helperText,
  errorText,
  value,
  defaultValue,
  minValue = 0,
  maxValue = 99,
  maxTextValue,
  step = 1,
  onValueChange,
  onChange,
  className,
  ...rest
}: T.Props) => {
  /* State variables */
  const [currentValue, setCurrentValue] = useState(defaultValue || 0);

  /* Constants */
  const isControlled = value !== undefined;
  const internalValue = isControlled ? value : currentValue;
  const buttonStyles = {
    padding: '0',
    border: 'none',
    width: 'var(--st-unit-8)',
    outlineOffset: '0',
  };
  const buttonAttributes = withButtons ? buttonStyles : { ...buttonStyles, display: 'none' };

  /* Functions */
  const handleChangeValue = useCallback(
    (newValue: number) => {
      const correctedValue = newValue;

      if (onValueChange) {
        onValueChange(correctedValue);
      }

      if (!isControlled) {
        setCurrentValue(correctedValue);
      }
    },
    [isControlled, onValueChange]
  );

  const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.valueAsNumber;
    const correctedValue = newValue;
    event.currentTarget.value = correctedValue.toString();

    if (onChange) {
      onChange(event);
    }

    if (!isControlled) {
      setCurrentValue(event.currentTarget.valueAsNumber);
    }
  };

  const correctValue = useCallback(
    (inputValue: number = internalValue) => {
      let correctedValue = isNaN(inputValue) ? minValue : inputValue;

      // Round value based on the step
      if (isValueRounded) {
        correctedValue = Math.round(correctedValue / step) * step;
      }

      // Make sure the value does not go out of bounds
      if (correctOnBlur) {
        if (correctedValue < minValue) {
          correctedValue = minValue;
        } else if (correctedValue > maxValue) {
          correctedValue = maxValue;
        }
      }

      handleChangeValue(correctedValue);
    },
    [handleChangeValue, internalValue, correctOnBlur, isValueRounded, maxValue, minValue, step]
  );

  const handleStepperClick = (type: 'increment' | 'decrement') => {
    const hasInternalValue = internalValue !== undefined;
    let incrementValue = 0;
    switch (type) {
      case 'increment':
        incrementValue = hasInternalValue ? internalValue + step : minValue;
        break;
      case 'decrement':
        incrementValue = hasInternalValue ? internalValue - step : minValue;
        break;
    }
    correctValue(incrementValue);
  };

  return (
    <View direction="row" align="center" className={styles['extended-stepper']}>
      {isEditable ? (
        <View direction="column" align="center" gap={1}>
          <Text className={styles['extended-stepper__error-text']} size="087" color="error">
            {errorText}
          </Text>
          <View className={styles['extended-stepper__rows']} direction="row" align="center">
            <Stepper
              inputAttributes={{
                'data-testid': 'stepper-input',
              }}
              minValue={minValue}
              maxValue={maxValue}
              decrementButtonAttributes={{
                className: 'testingclass',
                style: { ...buttonAttributes, marginRight: 'var(--st-unit-1)' },
              }}
              incrementButtonAttributes={{
                className: 'testingclass',
                style: { ...buttonAttributes, marginLeft: 'var(--st-unit-1)' },
              }}
              onIncrement={() => handleStepperClick('increment')}
              onDecrement={() => handleStepperClick('decrement')}
              onValueChange={handleChangeValue}
              onChange={handleChangeEvent}
              onBlur={() => correctValue()}
              defaultValue={undefined}
              value={internalValue}
              className={classNames(className, styles['extended-stepper--has-buttons'])}
              {...rest}
            />
            {maxTextValue && (
              <View>
                <Text
                  color="500"
                  size="100"
                  weight="regular"
                  className={styles['extended-stepper__max-value']}
                >{`/ ${maxTextValue}`}</Text>
              </View>
            )}
          </View>
          <Text className={styles['extended-stepper__helper-text']} color="500" size="075">
            {helperText}
          </Text>
        </View>
      ) : (
        <View>
          <Text>{internalValue}</Text>
        </View>
      )}
    </View>
  );
};
