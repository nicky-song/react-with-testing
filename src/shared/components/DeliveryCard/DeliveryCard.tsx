/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Button, Card, Radio, Text, View } from '@az/starc-ui';
import { DeliveryCardProps } from './Delivery.types';
import styles from './DeliveryCard.module.scss';
import { DeliveryOption } from './DeliveryOption/DeliveryOption';
import { useTranslation } from 'react-i18next';
import { DeliveryMethod } from '@ofm/constants/constants';

export const DeliveryCard = ({
  warehouseId,
  isPrimary = false,
  itemQuantity,
  deliveryList,
  radioGroupName,
  onValueChange,
  onButtonClick,
}: DeliveryCardProps) => {
  const { t } = useTranslation();

  return (
    <Card hasHoverEffect={false} className={styles['delivery-card__card']}>
      <View align="start" direction="column" className={styles['delivery-card__container']}>
        <View gap={1} align="start">
          <Text
            textCase="uppercase"
            size="062"
            weight="bold"
            color="500"
            className={styles['delivery-card__subtitle']}
          >
            {t('DeliveryCard.ShippingFrom')}
          </Text>
          <Text size="125" weight="bold" data-testid="main-title">
            {t('DeliveryCard.DC', { dc: warehouseId })}
            {isPrimary && ` - ${t('DeliveryCard.Primary')}`}
          </Text>
          <Text color="500">{t('DeliveryCard.Item', { count: itemQuantity })}</Text>
        </View>
        <Button
          onClick={() => onButtonClick?.(warehouseId)}
          variant="secondary"
          className={styles['delivery-card__button']}
          data-testid="main-button"
        >
          {t('DeliveryCard.ViewItems')}
        </Button>
      </View>
      <View
        align="start"
        direction="column"
        className={styles['delivery-card__container--option']}
        data-testid="delivery-container"
      >
        <View gap={4} padding={[2, 0]} align="start">
          <Text
            textCase="uppercase"
            size="062"
            weight="bold"
            color="500"
            className={styles['delivery-card__subtitle']}
          >
            {t('DeliveryCard.Delivery')}
          </Text>
          <Radio.Group
            name={radioGroupName}
            onValueChange={(value) => {
              onValueChange?.({ warehouseId, deliveryOption: value as DeliveryMethod });
            }}
          >
            {deliveryList.map((item) => (
              <DeliveryOption
                value={item.value}
                title={item.title}
                deliveryDays={item.deliveryDays}
                hasOutboundAlert={item.hasOutboundAlert}
                key={`${warehouseId}-${item.value}`}
              />
            ))}
          </Radio.Group>
        </View>
      </View>
    </Card>
  );
};
