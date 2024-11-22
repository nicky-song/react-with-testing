/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Text, Card, Icon, classNames, Actionable, View } from '@az/starc-ui';
import { ChevronRight } from '@az/starc-ui-icons';
import styles from './ActionCard.module.scss';

export type ActionCardProps = {
  title: string;
  description: string;
  isDisabled?: boolean;
  searchValue: string;
  onClickHandler: (data: string) => void;
};

export const ActionCard = ({
  title,
  description,
  isDisabled,
  searchValue,
  onClickHandler,
}: ActionCardProps) => {
  return (
    <Actionable onClick={() => (!isDisabled ? onClickHandler(searchValue) : '')}>
      <Card className={classNames(styles['card'], isDisabled && styles['card--disabled'])}>
        <View className={styles['frame']}>
          <Text
            variant="display-4"
            align="start"
            className={classNames(styles['title'], isDisabled && styles['title--disabled'])}
            weight="bold"
          >
            {title}
          </Text>
          <Text
            variant="small-body"
            align="start"
            className={classNames(
              styles['description'],
              isDisabled && styles['description--disabled']
            )}
            weight="regular"
          >
            {description}
          </Text>
        </View>
        <View className={classNames(styles['icon'])}>
          <Icon svg={ChevronRight} size={4} color={isDisabled ? 'disabled' : 'primary'} />
        </View>
      </Card>
    </Actionable>
  );
};
