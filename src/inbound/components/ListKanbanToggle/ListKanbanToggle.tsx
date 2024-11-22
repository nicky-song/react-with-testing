/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Actionable, Tooltip, View, classNames } from '@az/starc-ui';
import { ListView } from '@az/starc-ui-icons';

import { Kanban } from '@inbound/assets/icons';

import { KANBAN, LIST } from '@inbound/constants/constants';

import * as T from './ListKanbanToggle.types';
import styles from './ListKanbanToggle.module.scss';

export const ListKanbanToggle = ({ onToggle }: T.Props) => {
  const { t } = useTranslation();

  const [currentView, setCurrentView] = useState<string>(LIST);

  const handleToggle = (selectedView: string) => {
    onToggle(selectedView);
    setCurrentView(selectedView);
  };

  return (
    <View
      attributes={{ 'data-testid': 'st-list-kanban-toggle' }}
      direction="row"
      justify="center"
      padding={1}
      borderRadius="small"
      className={styles['list-kanban-toggle']}
    >
      <View.Item>
        <View
          borderRadius="small"
          className={classNames(
            styles['list-kanban-toggle__item'],
            currentView === LIST && styles['active']
          )}
        >
          <Actionable onClick={() => handleToggle(LIST)}>
            <Tooltip
              bodyText={t('ListView')}
              placement="bottom"
              width={92}
              svg={ListView}
              svgSize={6}
            />
          </Actionable>
        </View>
      </View.Item>
      <View.Item>
        <View
          borderRadius="small"
          className={classNames(
            styles['list-kanban-toggle__item'],
            currentView === KANBAN && styles['active']
          )}
        >
          <Actionable onClick={() => handleToggle(KANBAN)}>
            <Tooltip
              bodyText={t('KanbanView')}
              placement="bottom"
              width={150}
              svg={Kanban}
              svgSize={6}
            />
          </Actionable>
        </View>
      </View.Item>
    </View>
  );
};
