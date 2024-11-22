/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import * as T from './Stat.types';
import { Button, Icon, Link, Text, View, classNames } from '@az/starc-ui';
import { Edit } from '../../assets/icons';
import styles from './Stat.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Stat = ({
  title,
  primaryText,
  secondaryTextProps,
  width,
  size = 'large',
  type = 'default',
  editAction,
}: T.Props) => {
  /* Constants */
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <View
      direction="column"
      padding={[2, 4]}
      justify="center"
      align="start"
      borderRadius="small"
      className={classNames(styles['stat'], styles[`stat--${type}`])}
      width={width || 'fit-content'}
    >
      <Text color="500" size="075" weight="medium" lineHeight="125">
        {title}
      </Text>
      <View direction="row" align="end" height="fit-content" width="100%" justify="space-between">
        <View
          direction="row"
          wrap={false}
          align="end"
          className={classNames(styles['stat__count-wrapper'])}
        >
          <Text
            className={classNames(
              styles['stat__info'],
              styles[`stat__info--${size}`],
              styles[`stat__info--${type}`]
            )}
          >
            {primaryText}
          </Text>
          <View>
            {editAction && (
              <Button
                title={t('Edit')}
                onClick={editAction}
                className={classNames(styles['stat-button'], styles['stat__edit-button'])}
                variant="ghost"
              >
                <Icon svg={Edit} className={classNames(styles['stat__edit-icon'])} />
              </Button>
            )}
          </View>
        </View>
        {secondaryTextProps &&
          (secondaryTextProps.url ? (
            <Link
              className={classNames(styles['stat__link-button'])}
              onClick={() => secondaryTextProps.url && navigate(secondaryTextProps.url)}
            >
              <Text className={classNames(styles['stat__text'])}>
                {secondaryTextProps.secondaryText}
              </Text>
            </Link>
          ) : (
            <Text className={classNames(styles['stat__text'])}>
              {secondaryTextProps.secondaryText}
            </Text>
          ))}
      </View>
    </View>
  );
};
