/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ButtonProps, PaginationProps } from '@az/starc-ui';
import { Props as StatusBadgeType } from '@shared/components/StatusBadge/StatusBadge.types';
import { Props as ProgressProps } from '@ofm/components/ProgressBar/ProgressBar.types';
import { Dispatch, SetStateAction } from 'react';

export type Props = {
  items?: Array<Item>;
  selectedItems?: Array<string>;
  onItemSelect?: (item: string) => void;
  buttons?: Array<CTAButton>;
  emptyText?: string;
  emptySubtitle?: string;
  isLoading?: boolean;
  showProgressSkeleton?: boolean;
  progress?: ProgressProps[];
  itemsInProgress?: string[];
  paginationProps?: PaginationProps;
  setItemId?: Dispatch<SetStateAction<string>>;
  setShowOrderDetailsDrawer?: Dispatch<SetStateAction<boolean>>;
};

export type Item = {
  id: string;
  storeNumber?: string;
  statusBadge?: StatusBadgeType;
  secondaryStatus?: string | null;
};

type CTAButton = {
  title: string;
  clickHandler: () => void;
  isDisabled: boolean;
  variant?: Exclude<ButtonProps['variant'], 'icon'>;
  loading?: boolean;
};
