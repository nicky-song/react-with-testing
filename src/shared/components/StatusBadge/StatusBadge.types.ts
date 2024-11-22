/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

export enum StatusVariants {
  NOT_STARTED = 'not-started',
  IN_PROGRESS = 'in-progress',
  READY_FOR_ACTION = 'ready-for-action',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export type Props = {
  variant: StatusVariants;
  text: string;
};
