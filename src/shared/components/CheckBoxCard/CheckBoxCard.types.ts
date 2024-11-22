/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { StatusVariants } from '@shared/components/StatusBadge/StatusBadge.types';
import { Props as TagProps } from '@shared/components/Tag/Tag.types';

export type Props = {
  title: string;
  displayValue?: string;
  label?: string;
  statusBadge?: {
    variant: StatusVariants;
    text: string;
  };
  tag?: {
    variant: TagProps['variant'];
    text: string;
  };
  isCheckboxDisabled?: boolean;
  isCardDisabled?: boolean;
  isInErrorState?: boolean;
  shouldHideCheckbox?: boolean;
  onChangeHandler?: (title: string) => void;
  isChecked?: boolean;
  onClick?: () => void | undefined;
};

export const hasFunctionalCheckbox = (card: Props) => {
  return !(card.isCheckboxDisabled || card.isCardDisabled || card.shouldHideCheckbox);
};
