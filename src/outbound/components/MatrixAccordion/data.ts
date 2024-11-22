/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import {
  ThemeBgColor,
  ThemeFgColor,
  Grayscale,
  ThemeActionColor,
} from '@az/starc-ui/dist/types/global';

interface stateTextColorType {
  [x: string]: ThemeBgColor | ThemeFgColor | Grayscale | ThemeActionColor;
}

export const stateTextColor: stateTextColorType = {
  'un-assigned': 'primary',
  'not-started': 'secondary',
  'in-progress': 'primary',
  complete: 'secondary',
  error: 'error',
};

export const waves = [
  {
    id: 20181005,
    count: '825 / 3,349',
    cells: [
      [16, '003870'],
      [15, '003870'],
      [14, '003870'],
      [13, '003870'],
      [12, '003870'],
      [11, '003870'],
      [10, '003870'],
      [9, '003870'],
    ],
  },
  {
    id: 20181005,
    count: '825 / 3,349',
    cells: [
      [8, '003870'],
      [7, '003870'],
      [6, '003870'],
      [5, '003870'],
      [4, '003870'],
      [3, '003870'],
      [2, '003870'],
      [1, '003870'],
    ],
  },
];
