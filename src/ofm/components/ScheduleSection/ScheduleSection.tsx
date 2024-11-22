/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import * as T from './ScheduleSection.types';
import { Text, Tooltip, View, classNames } from '@az/starc-ui';
import { Tag } from '@shared/components/Tag/Tag';
import { generateDateString } from '@ofm/utils/utils';
import styles from './ScheduleSection.module.scss';
import { EMPTY_VALUE } from '@shared/constants/constants';
import { useTranslation } from 'react-i18next';

export const ScheduleSection = ({
  title,
  tooltipProps,
  tooltipClassName,
  schedule,
  displayWaves = true,
}: T.Props) => {
  /* Constants */
  // Sets the order in which each day will be rendered in the component
  const orderedSchedule: [string, T.ScheduleDay | undefined][] = [
    ['sunday', schedule.sunday],
    ['monday', schedule.monday],
    ['tuesday', schedule.tuesday],
    ['wednesday', schedule.wednesday],
    ['thursday', schedule.thursday],
    ['friday', schedule.friday],
    ['saturday', schedule.saturday],
  ];
  const { t } = useTranslation();

  /* Functions */
  const mapSchedule = () => {
    return orderedSchedule.map(([key, day]) => {
      return (
        <View direction="column" align="center" gap={2} key={key}>
          <Text
            color="500"
            textCase="uppercase"
            align="center"
            size="075"
            weight="bold"
            className={styles['schedule-section__day']}
          >
            {t(`Schedule.${key.charAt(0).toUpperCase().concat(key.slice(1))}`)}
          </Text>
          <Text
            align="center"
            size="100"
            weight="medium"
            className={styles['schedule-section__time']}
          >
            {day ? generateDateString(day.time, t('DateFormat.TimeHourMinutes')) : EMPTY_VALUE}
          </Text>
          {displayWaves && day && <Tag variant="order" text={day.wave} />}
        </View>
      );
    });
  };

  return (
    <View
      direction="column"
      width="100%"
      justify="end"
      align="center"
      padding={6}
      className={styles['schedule-section']}
    >
      <View direction="row" wrap={false} align="center" width="100%">
        <Text size="100" weight="bold" className={styles['schedule-section__title']}>
          {title}
        </Text>
        {tooltipProps && (
          <View className={classNames(styles['schedule-section__tooltip'], tooltipClassName)}>
            <Tooltip variant="alt" {...tooltipProps} />
          </View>
        )}
      </View>
      <View direction="row" width="100%" justify="space-between">
        {mapSchedule()}
      </View>
    </View>
  );
};
