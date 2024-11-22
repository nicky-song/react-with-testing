/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  iconUrl?: string;
};

export type AvatarGroupProps = {
  users: User[];
  size: 'small' | 'large';
  maxDisplay?: number;
  className?: string;
};
