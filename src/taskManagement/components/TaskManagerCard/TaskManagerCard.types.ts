/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Props as TagProps } from '@shared/components/Tag/Tag.types';
import { Props as StatusBadgeProps } from '@shared/components/StatusBadge/StatusBadge.types';
export type TagItemsProps = { variant: TagProps['variant']; text: string };

export type Props = {
  id: number;
  name?: string;
  username?: string;
  assigned?: boolean;
  lastTransaction?: string;
  workingDepartment?: boolean;
  clocked_in?: boolean;
  detailText?: string;
  priority?: boolean;
  tagItems?: TagItemsProps[];
  statusBadge?: StatusBadgeProps;
  poNumber?: string;
  subZone?: string;
  piecesData?: {
    value: number;
    max: number;
    label: string;
  };
  dateTime?: string;
  userStatus?: string;
  onClickAssignTask: (userId: number) => void;
  setOpenActionMenu?: boolean | null;
};
