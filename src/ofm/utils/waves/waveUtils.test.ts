/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ScheduleDays } from '../../components/ScheduleSection/ScheduleSection.types';
import { getWave } from './waveUtils';

describe('Wave Utils', () => {
  const mockMonday = new Date(Date.UTC(2023, 7, 7, 10, 0, 0, 0));
  const mockTuesday = new Date(Date.UTC(2023, 7, 8, 17, 0, 0, 0));
  const mockWednesday = new Date(Date.UTC(2023, 7, 9, 21, 0, 0, 0));

  it('Should get the wave for Monday 10AM, Tuesday 5PM, Wednesday 9PM with wave starting on Friday', () => {
    expect(getWave(mockMonday.getUTCDay(), mockMonday.getUTCHours(), ScheduleDays.FRIDAY)).toEqual(
      '4A'
    );
    expect(
      getWave(mockTuesday.getUTCDay(), mockTuesday.getUTCHours(), ScheduleDays.FRIDAY)
    ).toEqual('5B');
    expect(
      getWave(mockWednesday.getUTCDay(), mockWednesday.getUTCHours(), ScheduleDays.FRIDAY)
    ).toEqual('6B');
  });

  it('Should get the wave for Monday 10AM, Tuesday 5PM, Wednesday 9PM with wave starting on Sunday', () => {
    expect(getWave(mockMonday.getUTCDay(), mockMonday.getUTCHours(), ScheduleDays.SUNDAY)).toEqual(
      '2A'
    );
    expect(
      getWave(mockTuesday.getUTCDay(), mockTuesday.getUTCHours(), ScheduleDays.SUNDAY)
    ).toEqual('3B');
    expect(
      getWave(mockWednesday.getUTCDay(), mockWednesday.getUTCHours(), ScheduleDays.SUNDAY)
    ).toEqual('4B');
  });

  it('Should get the waves for Monday 10AM, Tuesday 5PM, Wednesday 9PM, with wave starting on Friday, and extra wave from 6PM', () => {
    expect(
      getWave(mockMonday.getUTCDay(), mockMonday.getUTCHours(), ScheduleDays.FRIDAY, 18)
    ).toEqual('4A');
    expect(
      getWave(mockTuesday.getUTCDay(), mockTuesday.getUTCHours(), ScheduleDays.FRIDAY, 18)
    ).toEqual('5B');
    expect(
      getWave(mockWednesday.getUTCDay(), mockWednesday.getUTCHours(), ScheduleDays.FRIDAY, 18)
    ).toEqual('6C');
  });
});
