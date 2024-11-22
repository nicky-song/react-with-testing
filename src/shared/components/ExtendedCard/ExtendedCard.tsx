/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Actionable, Card, ChevronRight, Icon, Text, View } from '@az/starc-ui';
import styles from './ExtendedCard.module.scss';
import classnames from 'classnames';
import * as T from './ExtendedCard.types';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import { Tag } from '../Tag/Tag';
import { useNavigate } from 'react-router-dom';

export const ExtendedCard = ({
  title,
  label,
  subtext,
  statusBadge,
  isCardDisabled = false,
  isErrorState,
  className,
  tag,
  url,
}: T.Props) => {
  /* Constants */
  const navigate = useNavigate();

  return (
    <Actionable
      disabled={isCardDisabled}
      onClick={() => url && navigate(url)}
      className={classnames(styles['card-link'], isCardDisabled && styles['card-link--disabled'])}
    >
      <Card
        className={classnames(
          styles['card'],
          isCardDisabled && styles['card--disabled'],
          isErrorState && styles['card--error'],
          className
        )}
        hasHoverEffect={false}
      >
        <View className={styles['card__info-container']} height="100%" width="100%" direction="row">
          <Text variant="main-body" weight="medium" as="span" className={styles['card__title']}>
            {title}
          </Text>
          <Text variant="main-body" color="500" as="span" className={styles['card__label']}>
            {label}
          </Text>
          {tag && (
            <View className={styles['card__tag']}>
              <Tag text={tag.text} variant={tag.variant} />
            </View>
          )}
          <View direction="row" align="center" className={styles['card__edge']}>
            {statusBadge && <StatusBadge variant={statusBadge.variant} text={statusBadge.text} />}
            <Text variant="text-link" as="span" className={styles['card__subtext']}>
              {subtext}
            </Text>
            <View />
          </View>
        </View>
        <Icon svg={ChevronRight} className={styles['card-link__chevron']} color="primary" />
      </Card>
    </Actionable>
  );
};
