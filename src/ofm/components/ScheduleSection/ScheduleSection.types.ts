/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { TooltipProps } from '@az/starc-ui';

export type ScheduleDay = {
  time: Date;
  wave: string;
};

export type ScheduleWeek = {
  monday?: ScheduleDay;
  tuesday?: ScheduleDay;
  wednesday?: ScheduleDay;
  thursday?: ScheduleDay;
  friday?: ScheduleDay;
  saturday?: ScheduleDay;
  sunday?: ScheduleDay;
};

export enum ScheduleDays {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

export type Props = {
  title: string;
  tooltipProps?: TooltipProps;
  tooltipClassName?: string;
  displayWaves?: boolean;
  schedule: ScheduleWeek;
};
