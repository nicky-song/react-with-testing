/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

export type DropdownOption = {
  label: string;
  value: string;
};

export type Props = {
  options: DropdownOption[];
  width: number;
  name: string;
  label: string;
  onChange?: (value: string[]) => void;
  onReset?: () => void;
};
