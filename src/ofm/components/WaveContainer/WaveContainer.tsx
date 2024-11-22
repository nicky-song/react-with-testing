/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import * as T from './WaveContainer.types';
import { ExtendedCard } from '../../../shared/components/ExtendedCard/ExtendedCard';
import { generateDateString } from '../../utils/utils';
import dayjs from 'dayjs';
import { Text, TextProps, View } from '@az/starc-ui';
import styles from './WaveContainer.module.scss';
import { PAGE_URLS } from '@shared/constants/routes';
import { BFF_REQUEST_DATE_FORMAT } from '@ofm/constants/constants';
import { useTranslation } from 'react-i18next';

export const WaveContainer = ({ data, withWaveDisplay = true, isDefaultSort = true }: T.Props) => {
  /* Constants */
  const sortedData = data.sort(
    (first, second) => dayjs(first.date).valueOf() - dayjs(second.date).valueOf()
  );

  const textProps: Pick<TextProps, 'color' | 'size' | 'weight'> = {
    color: 'primary',
    size: '125',
    weight: 'bold',
  };

  const { t } = useTranslation();

  /* Functions */
  const groupWavesByDate = (waves: T.WaveData[]) => {
    const mappedWaves = waves.map((wave) => ({
      group: generateDateString(wave.date, BFF_REQUEST_DATE_FORMAT),
      waveData: wave,
    }));

    const records = mappedWaves.reduce<Record<string, typeof mappedWaves>>((previous, current) => {
      previous[current.group] = previous[current.group] || [];
      previous[current.group].push(current);
      return previous;
    }, {});

    return Object.entries(records);
  };

  const generateWave = (waveData: T.WaveData, isErrorState = false) => {
    return (
      <ExtendedCard
        className={styles['wave-container__card']}
        key={waveData.id}
        url={PAGE_URLS.WAVE_DETAILS(waveData.id)}
        tag={
          waveData.flaggedCount
            ? {
                variant: 'hazmat',
                text: t('WaveContainer.FlaggedOrder', { count: waveData.flaggedCount }),
              }
            : undefined
        }
        title={
          withWaveDisplay
            ? waveData.wave
            : generateDateString(waveData.date, t('DateFormat.WaveTitle'))
        }
        label={`${t('RequestBy')} ${generateDateString(
          waveData.date,
          withWaveDisplay ? t('DateFormat.ShortTime') : t('DateFormat.TimeHoursMinutes')
        )}`}
        subtext={`${waveData.storeCount}/${waveData.storeMax}`}
        statusBadge={{
          variant: waveData.status,
          text: waveData.statusText,
        }}
        isErrorState={isErrorState}
      />
    );
  };

  if (isDefaultSort) {
    // Sort by Past Due, Today and Upcoming
    const startOfToday = dayjs().startOf('day');
    const startOfTomorrow = startOfToday.add(1, 'day');

    const todayGroup = sortedData.filter((wave) => {
      const currentDate = dayjs(wave.date);
      return currentDate.isBefore(startOfTomorrow) && currentDate.isAfter(startOfToday);
    });

    const upcomingGroup = groupWavesByDate(
      sortedData.filter((wave) => {
        const currentDate = dayjs(wave.date);
        return currentDate.isAfter(startOfTomorrow.subtract(1, 'second'));
      })
    );

    const pastDueGroup = groupWavesByDate(
      sortedData.filter((wave) => {
        const currentDate = dayjs(wave.date);
        return currentDate.isBefore(startOfToday.add(1, 'second'));
      })
    );

    return (
      <View
        gap={10}
        className={styles['wave-container']}
        attributes={{
          'data-testid': 'default-sorted-cards',
        }}
      >
        {pastDueGroup.length > 0 && (
          <View>
            <Text className={styles['wave-container__group-heading']} as="h2" {...textProps}>
              {t('WaveContainer.PastDue')}
            </Text>
            <View gap={4}>
              {pastDueGroup.map(([date, group]) => (
                <View key={date}>{group.map((wave) => generateWave(wave.waveData, true))}</View>
              ))}
            </View>
          </View>
        )}
        {todayGroup.length > 0 && (
          <View>
            <Text className={styles['wave-container__group-heading']} {...textProps} as="h2">
              {t('WaveContainer.Today')}
            </Text>
            <View>{todayGroup.map((wave) => generateWave(wave))}</View>
          </View>
        )}
        {upcomingGroup.length > 0 && (
          <View>
            <Text className={styles['wave-container__group-heading']} {...textProps} as="h2">
              {t('WaveContainer.Upcoming')}
            </Text>
            <View gap={4}>
              {upcomingGroup.map(([date, group]) => (
                <View key={date}>{group.map((wave) => generateWave(wave.waveData))}</View>
              ))}
            </View>
          </View>
        )}
      </View>
    );
  } else {
    // Sort by Date
    const dateGroup = groupWavesByDate(sortedData);
    return (
      <View
        gap={10}
        className={styles['wave-container']}
        attributes={{
          'data-testid': 'date-sorted-cards',
        }}
      >
        {dateGroup.map(([date, group]) => (
          <View key={date}>
            <Text
              className={styles['wave-container__group-heading']}
              {...textProps}
              as="h2"
            >{`${generateDateString(dayjs(date).toDate(), t('DateFormat.SortedTitle'))}`}</Text>
            <View>{group.map((wave) => generateWave(wave.waveData))}</View>
          </View>
        ))}
      </View>
    );
  }
};
