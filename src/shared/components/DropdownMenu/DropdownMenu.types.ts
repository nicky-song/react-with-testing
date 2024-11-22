/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

export type DropdownOption = {
  id: string;
  name: string;
  country: string;
};

export type Props = {
  options: DropdownOption[];
  selectedId: string;
  onChange: (id: string) => void;
  isOpen?: boolean;
  width?: number;
};
