/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { SearchBar } from '@az/starc-ui';
import { SearchInputProps } from './SearchInput.types';
import { KEY, KEY_CODE } from '@shared/constants/keyConstants';

export const SearchInput = ({
  label,
  value,
  className,
  onValueChange,
  onValueClear,
  onEnter,
}: SearchInputProps) => {
  /* Functions */
  const onKeyDown = (e: {
    key: string;
    keyCode: number;
    preventDefault: () => void;
    currentTarget: { value: string };
  }) => {
    if (e.key === KEY.ENTER || e.keyCode === KEY_CODE.ENTER) {
      e.preventDefault();

      if ((value || e.currentTarget.value) && onEnter) {
        onEnter(value || e.currentTarget.value);
      }
    }
  };

  return (
    <SearchBar
      label={label}
      value={value}
      onValueChange={(data) => onValueChange(data)}
      onValueClear={onValueClear}
      inputAttributes={{ onKeyDown: onKeyDown }}
      className={className}
      variant="pro"
    />
  );
};
