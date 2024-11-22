/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useTranslation } from 'react-i18next';

import { Text, View, Button, classNames } from '@az/starc-ui';

import { Avatar } from '@shared/components/Avatar/Avatar';

import * as T from './RecommendedAssignees.types';
import styles from './RecommendedAssignees.module.scss';

export const RecommendedAssignees = ({ assignees, className, onButtonClick }: T.Props) => {
  /* Constants */
  const { t } = useTranslation();

  return (
    <View
      className={classNames(styles['recommended-assignees'], className)}
      attributes={{ 'data-testid': 'st-recommended-assignees' }}
    >
      <View padding={[4, 0]} className={styles['recommended-assignees__text']}>
        <Text color="600" size="100">
          {t('PODashboard.Assignees.NoAssignee')}
        </Text>
      </View>
      <View direction="column" className={styles['recommended-assignees__items_wrapper']}>
        {assignees.map((user, index) => (
          <View.Item key={t('PODashboard.ItemKey', { item: 'recommendedAssignees', key: index })}>
            <View
              direction="row"
              align="center"
              className={styles['recommended-assignees__items_wrapper__item']}
            >
              <View.Item grow>
                <Avatar name={user.firstName + ' ' + user.lastName} size="large" showText={true} />
              </View.Item>

              <View.Item>
                <Button
                  variant="pill"
                  className={styles['recommended-assignees__items_wrapper__item__button']}
                  onClick={() => onButtonClick?.(user)}
                >
                  {t('Add')}
                </Button>
              </View.Item>
            </View>
          </View.Item>
        ))}
      </View>
    </View>
  );
};
