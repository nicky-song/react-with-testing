/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import type { ClassName } from '@az/starc-ui/dist/types/global';

import { User } from '@shared/components/AvatarGroup/AvatarGroup.types';

export type Props = {
  assignees: User[];
  className?: ClassName;
  onButtonClick: (user: User) => void;
};
