/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import * as T from './EmptyState.types';
import { Icon, Link, Text, View, classNames } from '@az/starc-ui';
import styles from './EmptyState.module.scss';
import { useNavigate } from 'react-router-dom';

export const EmptyState = ({ svg, subtitle, text, linkProps, type = 'default' }: T.Props) => {
  /* Constants */
  const navigate = useNavigate();

  return (
    <View
      align="center"
      justify="center"
      direction="column"
      width="100%"
      height="100%"
      padding={8}
      className={classNames(styles['empty-state'])}
      data-testid="empty-state-container"
    >
      <Icon
        attributes={{
          style: {
            height: 'var(--st-unit-10)',
            width: 'var(--st-unit-10)',
          },
        }}
        color={type === 'warning' ? 'error' : 'on-secondary'}
        svg={svg}
      />
      <View direction="column" className={classNames(styles['empty-state__text-container'])}>
        <Text
          weight="medium"
          color="primary"
          className={classNames(styles['empty-state__subtitle'])}
          data-testid="empty-state-subtitle"
        >
          {subtitle}
        </Text>
        <Text
          color="600"
          className={classNames(styles['empty-state__text'])}
          data-testid="empty-state-text"
        >
          {text}
        </Text>
      </View>
      {linkProps && (
        <Link onClick={() => navigate(linkProps.url)}>
          <Text
            size="087"
            weight="medium"
            color="600"
            className={classNames(styles['empty-state__link-text'])}
          >
            {linkProps.label}
          </Text>
        </Link>
      )}
    </View>
  );
};
