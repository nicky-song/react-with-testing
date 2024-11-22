/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { StatusVariants } from '@shared/components/StatusBadge/StatusBadge.types';
import { Props as TagProps } from '../Tag/Tag.types';

export type Props = {
  title: string;
  label: string;
  subtext: string;
  url?: string;
  statusBadge?: {
    variant: StatusVariants;
    text: string;
  };
  tag?: {
    variant: TagProps['variant'];
    text: string;
  };
  isCardDisabled?: boolean;
  isErrorState?: boolean;
  className?: string;
};
