/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

export type SearchInputProps = {
  label: string;
  value?: string;
  onValueChange: (value: string) => void;
  onValueClear: () => void;
  onEnter?: (value: string) => void;
  className?: string;
};
