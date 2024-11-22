/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Button, Icon, Text, View, classNames } from '@az/starc-ui';
import s from './EmptyPage.module.scss';
import * as T from './EmptyPage.types';

export const EmptyPage = ({
  icon,
  title,
  description,
  buttonText,
  className,
  type = 'default',
  onClick,
}: T.Props) => {
  return (
    <View height="100%" width="100%" direction="column" align="center" justify="center" gap={10}>
      <View align="center" justify="center" gap={6}>
        <Icon svg={icon} size={12} color={type === 'warning' ? 'error' : 'on-secondary'} />
        <View gap={2} align="center" justify="center" textAlign="center">
          <Text size="200" weight="bold">
            {title}
          </Text>
          <View className={s['empty-page__description']}>
            <Text size="100" weight="regular">
              {description}
            </Text>
          </View>
        </View>
      </View>
      {buttonText && (
        <View>
          <Button
            variant="secondary"
            onClick={onClick}
            className={classNames(s['empty-page__button'], s['action-button'], className)}
          >
            <Text>{buttonText}</Text>
          </Button>
        </View>
      )}
    </View>
  );
};
