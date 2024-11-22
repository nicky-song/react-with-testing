/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';

import { View, Notification } from '@az/starc-ui';

import { WMSInlineNotification } from '@shared/components/Notification/Notification';

import {
  inLaneConfirmationAtom,
  laneConfirmationItemAtom,
  ltdGroupedStoresAtom,
  ltdGroupingRecommendationsAtom,
} from '@outbound/atoms/releaseOrder/releaseOrderAtom';
import { OrderReleaseAccordion } from '@outbound/components/OrderReleaseAccordion/OrderReleaseAccordion';
import { OrderSection } from '@outbound/components/OrderSection/OrderSection';
import { Modal } from '@outbound/components/Modal/Modal';

import { ltdOrders, releaseOrders } from '../data';
import { Group } from './Group';

import styles from '../OrderTabs.module.scss';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';

export const LongTailDistribution = () => {
  /*Atoms*/
  const [laneConfirmationItem] = useAtom(laneConfirmationItemAtom);
  const [inLaneConfirmation] = useAtom(inLaneConfirmationAtom);
  const [groupedStores, setLtdGroupedStores] = useAtom(ltdGroupedStoresAtom);
  const [groupingRecommendations, setLtdGroupingRecemmendations] = useAtom(
    ltdGroupingRecommendationsAtom
  );

  /* State variables */
  const [groupingRecommendationsOpen, setGroupingRecommendationsOpen] = useState(false);
  const [grouped, setGrouped] = useState<string[][]>([]);

  /* Constants */
  const { t } = useTranslation();
  const { handleNotification } = useNotificationHandler();
  const customNotification = WMSInlineNotification.warning;

  /* Functions */
  const onRecommendationsClose = () => {
    setGroupingRecommendationsOpen(false);
    setGrouped([]);
  };

  const onGroupSave = () => {
    handleNotification(NOTIFICATION_TYPES.SUCCESS, t('OutboundMatrix.Grouping.OrdersGrouped'));
    setGroupingRecommendationsOpen(false);
    setLtdGroupedStores((groupedStores) => [...groupedStores, ...grouped]);
    setLtdGroupingRecemmendations(
      groupingRecommendations.filter(
        (group) => ![...groupedStores, ...grouped].flat().includes(group[0])
      )
    );
    setGrouped([]);
  };

  const orders = useMemo(() => {
    return (
      <View direction="column" className={styles['order-release__content']}>
        <OrderSection>
          {(!inLaneConfirmation || laneConfirmationItem) &&
            ltdOrders.map((wave) => (
              <OrderReleaseAccordion item={wave} order={releaseOrders.ltdOrders} />
            ))}
        </OrderSection>
      </View>
    );
  }, [inLaneConfirmation, laneConfirmationItem]);

  return (
    <View>
      {!inLaneConfirmation && groupingRecommendations.length && (
        <View padding={[0, 0, 6, 0]}>
          <Notification
            {...customNotification}
            text={t('OutboundMatrix.Grouping.NotificationText')}
            ctaLabel={t('OutboundMatrix.Grouping.Title')}
            ctaType="button"
            ctaOnClick={() => {
              setGroupingRecommendationsOpen(true);
            }}
          />
        </View>
      )}
      {orders}
      {groupingRecommendationsOpen && (
        <Modal
          title={t('OutboundMatrix.Grouping.Title')}
          subTitle={t('OutboundMatrix.Grouping.Subtitle')}
          open={groupingRecommendationsOpen}
          size="small"
          isCancelBtn={true}
          isPrimaryBtnDisabled={Boolean(!grouped.length)}
          onClose={onRecommendationsClose}
          onSuccess={onGroupSave}
        >
          <View gap={6}>
            {ltdOrders.map((dc) => (
              <Group item={dc} grouped={grouped} setGrouped={setGrouped} />
            ))}
          </View>
        </Modal>
      )}
    </View>
  );
};
