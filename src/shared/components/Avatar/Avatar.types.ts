/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

export type AvatarProps = {
  name: string;
  iconUrl?: string;
  size: 'small' | 'large' | 'extraLarge';
  showText?: boolean;
  textCase?: 'lowercase' | 'uppercase' | 'capitalize';
  className?: string;
};
