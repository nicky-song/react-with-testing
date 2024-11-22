/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Accordion as StarcAccordion, View, Text, Icon, Actionable } from '@az/starc-ui';
import { ChevronDown, ChevronUp } from '@az/starc-ui-icons';
import { DragIndicator } from '@shared/assets/icons';

import { Cell } from './Cell';
import { MatrixAccordionProps } from './MatrixAccordion.types';

import styles from './MatrixAccordion.module.scss';

export const MatrixAccordion = ({ row, open, displayOptions }: MatrixAccordionProps) => {
  return (
    <StarcAccordion
      className={styles['matrix-accordion']}
      name={row.location}
      headerOptions={{
        headerElement: (
          <View direction="row" align="center">
            <View.Item>
              <View
                direction="row"
                align="center"
                gap={2}
                padding={4}
                className={styles['matrix__location']}
              >
                <Icon size={6} svg={DragIndicator} color="400" />
                <View.Item grow>
                  <Text
                    size="087"
                    weight="medium"
                    color="primary"
                    className={styles['cell__section-text']}
                  >
                    {row.location}
                  </Text>
                </View.Item>
                <Actionable>
                  <Icon size={4} svg={open.includes(row.location) ? ChevronUp : ChevronDown} />
                </Actionable>
              </View>
            </View.Item>
            {[row.tile1, row.tile2].map((tile, index) => (
              <View.Item key={index} grow className={styles['matrix__tiles']}>
                <View direction="row" align="stretch" gap={2} padding={2} height="100%">
                  {tile.map((cell, index) => (
                    <Cell key={index} cell={cell} />
                  ))}
                </View>
              </View.Item>
            ))}
          </View>
        ),
      }}
    >
      <View className={styles['matrix__subzones']}>
        {row.subzones.map((zone, index) => {
          return (
            <View key={index} direction="row" align="center" justify="center">
              <View.Item>
                <View
                  direction="row"
                  align="center"
                  justify="end"
                  padding={[4, 8]}
                  width="calc((var(--st-unit-22) * 2) - 5px)"
                >
                  <Text size="100" weight="regular" align="center">
                    {zone.location}
                  </Text>
                </View>
              </View.Item>
              {[zone.tile1, zone.tile2].map((tile, index) => (
                <View.Item key={index} grow className={styles['matrix__tiles']}>
                  <View direction="row" align="stretch" gap={2} padding={2} height="100%">
                    {tile.map((cell, index) => (
                      <Cell key={index} cell={cell} displayOptions={displayOptions} />
                    ))}
                  </View>
                </View.Item>
              ))}
            </View>
          );
        })}
      </View>
    </StarcAccordion>
  );
};
