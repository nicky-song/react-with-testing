/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { View, Text, Actionable } from '@az/starc-ui';

import { t } from 'i18next';

import { waves } from './data';
import { MatrixHeaderProps } from './MatrixAccordion.types';

import styles from './MatrixAccordion.module.scss';

export const MatrixHeader = ({ displayOptions, onExpand, onCollapse }: MatrixHeaderProps) => {
  return (
    <View direction="row" align="stretch" className={styles['matrix-header']}>
      <View
        padding={[4, 6, 2, 6]}
        align="center"
        justify="space-between"
        className={styles['matrix__location']}
      >
        <Text size="100" weight="bold" className={styles[`line-height22`]}>
          {t('OutboundMatrix.Locations')}
        </Text>
        <View direction="row" gap={4}>
          <Actionable onClick={onExpand}>
            <Text variant="text-link" color="400" decoration="underline">
              {t('OutboundMatrix.Expand')}
            </Text>
          </Actionable>
          <Actionable onClick={onCollapse}>
            <Text variant="text-link" color="400" decoration="underline">
              {t('OutboundMatrix.Collapse')}
            </Text>
          </Actionable>
        </View>
      </View>
      {waves.map((wave, index) => (
        <View.Item key={index} grow className={styles['matrix__tiles']}>
          <View gap={2} padding={[4, 0]}>
            {displayOptions?.waveDetails && (
              <View
                direction="row"
                padding={[0, 4]}
                align="center"
                justify="space-between"
                attributes={{ 'data-testid': 'wave-details' }}
              >
                <Text
                  size="087"
                  weight="medium"
                  align="center"
                  className={styles[`line-height22`]}
                >{`Wave ${wave.id}`}</Text>
                <Text size="087" weight="medium" align="center" className={styles[`line-height22`]}>
                  {wave.count}
                </Text>
              </View>
            )}
            <View direction="row" gap={2} padding={[0, 2]}>
              {wave.cells.map((cell, index) => (
                <View.Item key={index} grow attributes={{ 'data-testid': 'matrix-header-storeid' }}>
                  <Text
                    size="075"
                    weight="bold"
                    align="center"
                    color="400"
                    textCase="uppercase"
                    className={styles[`line-height20`]}
                  >
                    {cell[0]}
                  </Text>
                  <Text
                    size="100"
                    weight="medium"
                    align="center"
                    className={styles[`line-height22`]}
                  >
                    {cell[1]}
                  </Text>
                </View.Item>
              ))}
            </View>
          </View>
        </View.Item>
      ))}
    </View>
  );
};
