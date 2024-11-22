/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

/**
 *
 * @param weekday The day of the week to calculate for (starts at 0 (sunday) ends at 6 (saturday))
 * @param startDay Which day of the week the waves start
 * @returns Wave number for the given weekday
 */
const calculateWaveNumber = (weekday: number, startDay: number) => {
  // Amount of days in the week
  const itemAmount = 7;

  const sumA = 1 - startDay;
  const sumB = sumA + itemAmount;

  if (startDay > weekday) {
    return weekday + sumB;
  } else {
    return weekday + sumA;
  }
};

/**
 *
 * @param hour Hour to calculate wave for (range from 0 to 23)
 * @param extraWaveHour Extra wave time, has to be greater than 12
 * @returns Wave letter (A, B or C)
 */
const calculateWaveLetter = (hour: number, extraWaveHour?: number) => {
  if (extraWaveHour && extraWaveHour > 12) {
    if (hour < 12) {
      return 'A';
    }
    if (hour < extraWaveHour) {
      return 'B';
    } else {
      return 'C';
    }
  } else {
    if (hour < 12) {
      return 'A';
    } else {
      return 'B';
    }
  }
};

/**
 *
 * @param weekday The day of the week to calculate for (starts at 0 (sunday) ends at 6 (saturday))
 * @param hour Hour to calculate wave for (range from 0 to 23)
 * @param startDay Which day of the week the waves start
 * @param extraWaveHour Extra wave time, has to be greater than 12
 * @returns Wave string
 */
export const getWave = (
  weekday: number,
  hour: number,
  startDay: number,
  extraWaveHour?: number
) => {
  const waveNumber = calculateWaveNumber(weekday, startDay);
  const waveLetter = calculateWaveLetter(hour, extraWaveHour);

  return `${waveNumber}${waveLetter}`;
};
