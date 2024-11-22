/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ComponentType, ReactElement, SVGProps } from 'react';

export type Props = {
  icon: ReactElement<SVGProps<SVGSVGElement>> | ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  buttonText?: string;
  className?: string;
  type?: 'default' | 'warning';
  onClick?: () => void;
};
