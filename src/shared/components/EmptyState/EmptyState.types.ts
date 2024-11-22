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

import { ComponentType, ReactElement, SVGProps } from 'react';

type LinkProps = {
  label: string;
  url: string;
};

export type Props = {
  iconColor?: ThemeBgColor | ThemeFgColor | Grayscale | ThemeActionColor;
  svg: ReactElement<SVGProps<SVGSVGElement>> | ComponentType<SVGProps<SVGSVGElement>>;
  subtitle: string;
  text: string;
  linkProps?: LinkProps;
  type?: 'default' | 'warning';
};
