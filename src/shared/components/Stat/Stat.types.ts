/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Responsive } from '@az/starc-ui/dist/types/global';

export type Props = {
  title: string;
  primaryText: string;
  width?: Responsive<string>;
  editAction?: () => void;
  size?: 'small' | 'medium' | 'large';
  type?: 'default' | 'error';
  secondaryTextProps?: {
    secondaryText: string;
    url?: string;
  };
};
