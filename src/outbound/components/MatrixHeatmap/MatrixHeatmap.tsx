/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { View, classNames } from '@az/starc-ui';

import variant from '../MatrixAccordion/MatrixAccordion.module.scss';

import styles from './MatrixHeatmap.module.scss';

export type MatrixHeatmapProps = {
  data: { state: string }[][];
};

export const MatrixHeatmap = ({ data }: MatrixHeatmapProps) => {
  return (
    <View className={styles['matrix-heatmap']}>
      <View direction="row" className={styles['matrix-heatmap__row']}>
        {data.map((item) =>
          item.map((item, index) => (
            <View.Item
              key={index}
              attributes={{ 'data-testid': 'heatmap-cell' }}
              className={classNames(styles['matrix-heatmap__cell'], variant[`cell--${item.state}`])}
            />
          ))
        )}
      </View>
    </View>
  );
};
