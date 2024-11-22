/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Radio, View, Text, Tooltip } from '@az/starc-ui';
import styles from './DeliveryOption.module.scss';
import { useTranslation } from 'react-i18next';
import { DeliveryOptionType } from '../Delivery.types';
import { IconError } from '@az/starc-ui-icons';

export const DeliveryOption = ({
  value,
  title,
  deliveryDays,
  hasOutboundAlert,
}: DeliveryOptionType) => {
  const { t } = useTranslation();

  return (
    <View direction="row">
      <Radio value={value} label="" />
      <View gap={1} align="start" justify="center">
        <Text size="100" color="primary">
          {title}
        </Text>
        {deliveryDays && (
          <Text size="100" color="primary">
            {t('DeliveryCard.ArrivesIn')} {t('DeliveryCard.Day', { count: deliveryDays })}
          </Text>
        )}
        {hasOutboundAlert && (
          <View
            direction="row"
            align="center"
            justify="center"
            gap={1}
            className={styles['delivery-option__alert']}
          >
            <View
              width="fit-content"
              direction="row"
              align="center"
              height="var(--st-unit-5)"
              className={styles['delivery-option__alert-background']}
            >
              <Text
                color="primary"
                size="075"
                weight="bold"
                className={styles['delivery-option__alert-text']}
              >
                {t('DeliveryCard.VerifyOutboundTiming')}
              </Text>
            </View>
            <View textAlign="start">
              <Tooltip
                headerText={t('DeliveryCard.WhatIsIt')}
                bodyText={t('DeliveryCard.CallOutbound')}
                variant="alt"
                svg={IconError}
                placement="bottom"
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
