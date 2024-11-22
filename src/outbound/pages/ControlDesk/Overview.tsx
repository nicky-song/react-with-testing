/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useState } from 'react';

import { t } from 'i18next';

import { Actionable, Icon, Modal, Text, View } from '@az/starc-ui';
import { Add } from '@az/starc-ui-icons';

import { MatrixHeatmap } from '@outbound/components/MatrixHeatmap/MatrixHeatmap';

import styles from './ControlDesk.module.scss';
import { heatMapData } from './data';

export const Overview = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Actionable className={styles['overview']} onClick={() => setOpen(true)}>
        <View direction="row" padding={6} align="center" justify="space-between">
          <Text size="125" weight="bold">
            {t('OutboundMatrix.Overview')}
          </Text>
          <Icon size={6} svg={Add} />
        </View>
      </Actionable>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size="medium"
        headerTitle={t('OutboundMatrix.Overview')}
        hasCloseButton={true}
        headerColor="secondary"
        className={styles['overview__modal']}
      >
        <MatrixHeatmap data={heatMapData} />
      </Modal>
    </>
  );
};
