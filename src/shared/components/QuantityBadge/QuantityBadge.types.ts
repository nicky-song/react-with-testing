/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

export enum QuantityVariants {
  DEFAULT = 'default',
  SELECTED = 'selected',
  ACTIVE = 'active',
}

export type Props = {
  variant: QuantityVariants;
  text: string;
};
