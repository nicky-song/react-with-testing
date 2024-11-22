/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useTranslation } from 'react-i18next';

import { classNames, Text, View } from '@az/starc-ui';

import { AvatarGroup } from '@shared/components/AvatarGroup/AvatarGroup';
import { StatusBadge } from '@shared/components/StatusBadge/StatusBadge';
import { Tag } from '@shared/components/Tag/Tag';
import { Props as TagItemProps } from '@shared/components/Tag/Tag.types';

import { ProgressBar } from '@inbound/components/ProgressBar/ProgressBar';
import { PriorityTag } from '@inbound/components/PriorityTag/PriorityTag';

import * as T from './MasterCard.types';
import styles from './MasterCard.module.scss';

export const MasterCard = ({
  title,
  priority,
  tagItems,
  statusBadgeProps,
  label,
  detailsData,
  avatarGroupData,
  picesData,
  linesData,
  className,
  titleClassName,
}: T.Props) => {
  const { t } = useTranslation();

  return (
    <View
      direction="column"
      wrap={false}
      padding={4}
      backgroundColor="secondary"
      width="100%"
      className={classNames(styles['master-card'], className)}
      attributes={{ 'data-testid': 'st-master-card' }}
    >
      <View direction="row" align="center" className={styles['master-card__top-section']}>
        <View.Item grow>
          <View direction="row" align="center" className={styles['master-card__title-wrapper']}>
            <Text
              size="100"
              weight="bold"
              className={classNames(styles['master-card__title'], titleClassName)}
            >
              {title}
            </Text>

            {priority && <PriorityTag />}

            {tagItems && (
              <View className={styles['master-card__tags-wrapper']}>
                {tagItems.map((tagItem: TagItemProps) => (
                  <Tag text={tagItem.text} variant={tagItem.variant} />
                ))}
              </View>
            )}

            {statusBadgeProps && (
              <View justify="center" className={styles['master-title__status-badge']}>
                <StatusBadge {...statusBadgeProps} />
              </View>
            )}
          </View>
        </View.Item>

        {label && (
          <View.Item>
            <Text
              size="087"
              color="500"
              className={classNames(styles['master-card__label'], titleClassName)}
            >
              {label}
            </Text>
          </View.Item>
        )}
      </View>

      <View direction="column" className={styles['master-card__bottom-section']}>
        {(detailsData || avatarGroupData) && (
          <View direction="row" className={styles['master-card__details-wrapper']}>
            {detailsData && (
              <View.Item grow>
                <View direction="row" className={styles['master-card__detail-item']}>
                  {detailsData.data.map((detailItem: T.DetailProps) => (
                    <View.Item>
                      <Text
                        size="087"
                        color="600"
                        className={styles['master-card__detail-item__text']}
                      >
                        {detailItem.label}
                      </Text>
                    </View.Item>
                  ))}
                </View>
              </View.Item>
            )}
            {avatarGroupData &&
              (avatarGroupData.users.length > 0 ? (
                <AvatarGroup {...avatarGroupData} />
              ) : (
                <Text size="087">{t('PODashboard.NoSelectorsAssigned')}</Text>
              ))}
          </View>
        )}

        {(picesData || linesData) && (
          <View direction="row" className={styles['master-card__statistics-wrapper']}>
            {picesData && (
              <View.Item grow>
                <ProgressBar
                  label={t('PODashboard.PicesDataLabel', {
                    count: picesData.count,
                    total: picesData.total,
                    label: picesData.label,
                  })}
                  value={picesData.count}
                  max={picesData.total}
                />
              </View.Item>
            )}
            {linesData && (
              <View.Item>
                <Text size="087" className={styles['master-card__lines']}>
                  {t('PODashboard.LinesData', {
                    count: linesData.count,
                    total: linesData.total,
                  })}
                  &nbsp;
                  {t('PODashboard.Item.Lines')}
                </Text>
              </View.Item>
            )}
          </View>
        )}
      </View>
    </View>
  );
};
