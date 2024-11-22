/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import {
  ThemeActionColor,
  ThemeFgColor,
  ThemeBgColor,
  Grayscale,
} from '@az/starc-ui/dist/types/global';

export type DropdownOption = {
  id: string;
  name: string;
  color?: ThemeActionColor | ThemeFgColor | ThemeBgColor | Grayscale | undefined;
};

export type Props = {
  options: DropdownOption[];
  onChange: (id: string) => void;
  isOpen?: boolean;
  width?: number;
};
