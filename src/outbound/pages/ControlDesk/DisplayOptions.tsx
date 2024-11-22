/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { t } from 'i18next';

import { Checkbox, Divider, Dropdown, Text, Toggle, View } from '@az/starc-ui';

import { DisplayOptionsType } from '@outbound/components/MatrixAccordion/MatrixAccordion.types';

import styles from './ControlDesk.module.scss';

export type DisplayOptionsProps = {
  options: DisplayOptionsType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function DisplayOptions({ options, onChange }: DisplayOptionsProps) {
  return (
    <Dropdown contentGap={0} className={styles['dropdown']}>
      <Dropdown.Button
        label={t('OutboundMatrix.DisplayOptions.Label')}
        className={styles['dropdown__button']}
      />
      <Dropdown.Content className={styles['dropdown__content']}>
        <View padding={6} gap={6}>
          <View.Item>
            <View gap={5}>
              <Text size="087" weight="medium">
                {t('OutboundMatrix.DisplayOptions.GeneralInformation')}
              </Text>
              <View gap={4}>
                <Checkbox
                  label={t('OutboundMatrix.DisplayOptions.CompletedStores')}
                  name="completedStores"
                  value="completedStores"
                  checked={options.completedStores}
                  onChange={onChange}
                />
                <Checkbox
                  label={t('OutboundMatrix.DisplayOptions.WaveDetails')}
                  name="waveDetails"
                  value="waveDetails"
                  checked={options.waveDetails}
                  onChange={onChange}
                />
              </View>
            </View>
          </View.Item>
          <View.Item>
            <Divider color="300" />
          </View.Item>
          <View.Item>
            <View gap={5}>
              <Text size="087" weight="medium">
                {t('OutboundMatrix.DisplayOptions.TileInformation')}
              </Text>
              <View gap={4}>
                <Checkbox
                  label={t('OutboundMatrix.DisplayOptions.VehicleCode')}
                  name="vehicleCode"
                  value="vehicleCode"
                  checked={options.vehicleCode}
                  onChange={onChange}
                />
                <Checkbox
                  label={t('OutboundMatrix.DisplayOptions.OrderSelector')}
                  name="orderSelector"
                  value="orderSelector"
                  checked={options.orderSelector}
                  onChange={onChange}
                />
                <View
                  direction="row"
                  align="center"
                  wrap={false}
                  className={styles['dropdown__switch']}
                >
                  <Toggle name="tileInfo" checked={options.tileInfo} onChange={onChange} />
                  <View className={styles['dropdown__switch--label']}>
                    <Text size="100" weight="medium" color="600">
                      {t('OutboundMatrix.DisplayOptions.ShowTileInformation')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View.Item>
        </View>
      </Dropdown.Content>
    </Dropdown>
  );
}
