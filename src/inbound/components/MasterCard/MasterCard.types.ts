/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import * as StatusBadgeTypes from '@shared/components/StatusBadge/StatusBadge.types';
import { Props as TagItemProps } from '@shared/components/Tag/Tag.types';
import { AvatarGroupProps } from '@shared/components/AvatarGroup/AvatarGroup.types';

type StatisticsProps = { count: number; total: number; label?: string };

export type DetailProps = { label: string };

type DetailsDataProps = {
  data: DetailProps[];
};

export type Props = {
  title: string;
  priority?: boolean;
  tagItems?: TagItemProps[];
  statusBadgeProps?: StatusBadgeTypes.Props;
  label?: string;
  detailsData?: DetailsDataProps;
  avatarGroupData?: AvatarGroupProps;
  picesData?: StatisticsProps;
  linesData?: StatisticsProps;
  className?: string;
  titleClassName?: string;
};
