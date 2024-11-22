/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { View, Text, classNames } from '@az/starc-ui';

import { t } from 'i18next';

import { cell, DisplayOptionsType } from './MatrixAccordion.types';
import { stateTextColor } from './data';

import styles from './MatrixAccordion.module.scss';

type CellProps = {
  cell: cell;
  displayOptions?: DisplayOptionsType;
};

export const Cell = ({ cell, displayOptions }: CellProps) => {
  return (
    <View.Item
      grow
      attributes={{ 'data-testid': 'matrix-cell' }}
      className={classNames(styles[`cell`], styles[`cell--${cell.state}`])}
    >
      <View align="center" padding={2}>
        {cell.state !== 'empty' && (
          <>
            <Text
              size="087"
              weight="medium"
              className={styles[`line-height22`]}
              color={stateTextColor[cell.state]}
            >
              {cell?.count}
            </Text>
            <Text
              size="075"
              weight="medium"
              className={styles[`line-height20`]}
              color={stateTextColor[cell.state]}
            >
              {cell?.assigned && t('OutboundMatrix.Assigned', { count: cell.assigned })}
            </Text>
            {displayOptions?.vehicleCode && (
              <Text
                size="075"
                weight="medium"
                className={styles[`line-height20`]}
                color={stateTextColor[cell.state]}
              >
                {cell?.vehicle}
              </Text>
            )}
            {displayOptions?.orderSelector && (
              <Text
                size="075"
                weight="medium"
                className={styles[`line-height20`]}
                color={stateTextColor[cell.state]}
              >
                {cell?.selector}
              </Text>
            )}
          </>
        )}
      </View>
    </View.Item>
  );
};
