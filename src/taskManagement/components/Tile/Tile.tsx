/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { View, Text, ActionViewAll, Actionable, Icon } from '@az/starc-ui';
import { StatusBadge } from '@shared/components/StatusBadge/StatusBadge';
import { TileProps } from './Tile.types';

export const Tile = ({ title, description, statusBadge, action }: TileProps) => {
  return (
    <>
      <View direction="row" width="100%" align="center" justify="space-between">
        <View.Item columns={{ s: 12, m: 8, l: 8, xl: 8 }}>
          {title && (
            <View direction="row" justify="start">
              <Text size="125" variant="subtitle-bold">
                {title}
              </Text>
            </View>
          )}
        </View.Item>
        <View.Item columns={{ s: 12, m: 4, l: 4, xl: 4 }}>
          <View direction="row" align="center" justify="end" gap={2} wrap={false}>
            {description && (
              <View>
                <Text color="600">{description}</Text>
              </View>
            )}
            {statusBadge && (
              <View>
                <StatusBadge variant={statusBadge.variant} text={statusBadge.text} />
              </View>
            )}
            {action === 'view-all' ? (
              <View>
                <Actionable href="#">
                  <Icon svg={ActionViewAll} />
                </Actionable>
              </View>
            ) : (
              ''
            )}
          </View>
        </View.Item>
      </View>
    </>
  );
};
