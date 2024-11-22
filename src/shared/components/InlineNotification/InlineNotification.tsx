/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Notification, View, Text, NotificationProps } from '@az/starc-ui';
import * as T from './InlineNotification.types';
import style from './InlineNotification.module.scss';
import { generateDateString } from '@ofm/utils/utils';
import { useTranslation } from 'react-i18next';
import { WMSInlineNotification } from '../Notification/Notification';

export const InlineNotification = (props: T.Props) => {
  /* Constants */
  const { t } = useTranslation();
  const DAY_IN_MILLISECONDS = 8640000;
  const today = new Date();
  let title,
    text,
    secondaryText,
    lastAttemptDay = '',
    customNotification: {
      type: NotificationProps['type'];
      customNotification: NotificationProps['customNotification'];
    } = WMSInlineNotification.info;

  if (props.variant === 'csr-error' || props.variant === 'store-error') {
    customNotification = WMSInlineNotification.error;
    if (props.date.getTime() === today.getTime()) {
      lastAttemptDay = t('InlineNotification.Today');
    } else if (today.getTime() - props.date.getTime() <= DAY_IN_MILLISECONDS) {
      lastAttemptDay = t('InlineNotification.Yesterday');
    } else {
      lastAttemptDay = generateDateString(props.date, 'MM/DD/YYYY');
    }
  }

  if (props.variant === 'hold-order') {
    title = t('InlineNotification.HoldOrderDetails.Title');
    text = t('InlineNotification.HoldOrderDetails.Text');
    customNotification = WMSInlineNotification.info;
  } else if (props.variant === 'quantity-anomaly') {
    const percentageDifference =
      ((props.requestedPieces - props.averageRequestedPieces) /
        ((props.requestedPieces + props.averageRequestedPieces) / 2)) *
      100;
    title = t('InlineNotification.QuantityAnomaly.Title');
    text = t('InlineNotification.QuantityAnomaly.Text', {
      requestedPieces: props.requestedPieces,
    });
    secondaryText = t('InlineNotification.QuantityAnomaly.SecondaryText', {
      percentageDifference: percentageDifference.toFixed(),
      averagePieces: props.averageRequestedPieces,
    });
    customNotification = WMSInlineNotification.warning;
  } else if (props.variant === 'store-error') {
    title = t('InlineNotification.StoreError.Title');
    text = t('InlineNotification.StoreError.Text', {
      attemptDay: lastAttemptDay,
      attemptHour: generateDateString(props.date, 'H:mm:ss'),
      tries: props.timesTried,
    });
    customNotification = WMSInlineNotification.error;
  } else if (props.variant === 'csr-error') {
    title = t('InlineNotification.CSRError.Title');
    text = t('InlineNotification.CSRError.Text', {
      attemptDay: lastAttemptDay,
      attemptHour: generateDateString(props.date, 'H:mm:ss'),
      tries: props.timesTried,
    });
    customNotification = WMSInlineNotification.error;
  } else if (props.variant === 'hold-store') {
    title = t('InlineNotification.HoldStoreDetails.Title');
    text = t('InlineNotification.HoldStoreDetails.Text', {
      date: generateDateString(props.suggestedDate, t('DateFormat.Long')),
    });
  }

  return (
    <View className={style['inline-notification']}>
      {props.variant === 'quantity-anomaly' ? (
        <Notification
          {...customNotification}
          title={title}
          children={
            <View className={style['inline-notification__text-container']}>
              <Text size="087">
                {text}
                <span className={style['inline-notification__bold-text']}>{`${t(
                  'InlineNotification.SKU'
                )} ${props.part}`}</span>
                {secondaryText}
              </Text>
            </View>
          }
        />
      ) : (
        <Notification {...customNotification} title={title} text={text} />
      )}
    </View>
  );
};
