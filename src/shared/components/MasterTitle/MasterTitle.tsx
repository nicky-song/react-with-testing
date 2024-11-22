/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import * as T from './MasterTitle.types';
import { Breadcrumbs, Button, Icon, Star, Text, View, classNames } from '@az/starc-ui';
import SvgClose from '@az/starc-ui-icons/dist/web/Close';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import { StarFillable } from '../../assets/icons';
import styles from './MasterTitle.module.scss';

export const MasterTitle = ({
  breadcrumbProps,
  title,
  subtitle,
  closeProps,
  statusBadgeProps,
  titleActionProps,
  children,
  className,
  titleClassName,
}: T.Props) => {
  return (
    <View
      direction="row"
      align="center"
      wrap={false}
      padding={6}
      backgroundColor="secondary"
      width="100%"
      className={classNames(styles['master-title'], className)}
    >
      <View className={classNames(styles['master-title__data-container'], className)}>
        <View direction="column" className={styles['master-title__title-section']}>
          {breadcrumbProps && (
            <Breadcrumbs className={styles['master-title__breadcrumbs']} {...breadcrumbProps} />
          )}
          <View direction="row" className={styles['master-title__title-wrapper']}>
            <Text
              size="175"
              weight="bold"
              as="h2"
              className={classNames(styles['master-title__title'], titleClassName)}
            >
              {title}
            </Text>

            {statusBadgeProps && (
              <View justify="center" className={styles['master-title__status-badge']}>
                <StatusBadge {...statusBadgeProps} />
              </View>
            )}

            {titleActionProps && (
              <View>
                <Button
                  variant="ghost"
                  title={titleActionProps.label}
                  onClick={titleActionProps.handleClick}
                  className={classNames(
                    styles['master-icon-button'],
                    styles['master-title__icon-button']
                  )}
                >
                  <Icon
                    size={8}
                    svg={titleActionProps.isActive ? StarFillable : Star}
                    className={classNames(
                      styles['master-title__fav-icon'],
                      titleActionProps.isActive && styles['master-title__fav-icon--active']
                    )}
                  />
                </Button>
              </View>
            )}
          </View>
          {subtitle && (
            <Text
              color="500"
              size="100"
              weight="regular"
              className={styles['master-title__subtitle']}
            >
              {subtitle}
            </Text>
          )}
        </View>
        {children}
      </View>
      {closeProps && (
        <View height="100%" justify="start">
          <Button
            className={classNames(
              styles['master-icon-button'],
              styles['master-title__icon-button']
            )}
            title={closeProps.ariaLabel}
            variant="ghost"
            onClick={closeProps.handleClick}
          >
            <Icon svg={SvgClose} color="primary" className={styles['master-title__close-icon']} />
          </Button>
        </View>
      )}
    </View>
  );
};
