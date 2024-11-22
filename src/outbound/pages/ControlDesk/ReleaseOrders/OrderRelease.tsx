/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { t } from 'i18next';

import { Button, Text, View } from '@az/starc-ui';

import { MasterTitle } from '@shared/components/MasterTitle/MasterTitle';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { PAGE_URLS } from '@shared/constants/routes';

import {
  inLaneConfirmationAtom,
  selectedStoresAtom,
  selectedSubzonesAtom,
} from '@outbound/atoms/releaseOrder/releaseOrderAtom';

import { OrderTabs } from './OrderTabs';

export const OrderRelease = () => {
  /*Atoms*/
  const [selectedStores] = useAtom(selectedStoresAtom);
  const [selectedSubzones] = useAtom(selectedSubzonesAtom);
  const [inLaneConfirmation, setInLaneConfirmation] = useAtom(inLaneConfirmationAtom);

  /* Constants */
  const navigate = useNavigate();
  const { handleNotification } = useNotificationHandler();

  /* Functions */
  const onProceesToLaneConfirmation = () => {
    setInLaneConfirmation(true);
  };

  const onRelease = () => {
    handleNotification(
      NOTIFICATION_TYPES.SUCCESS,
      t('OutboundMatrix.OrderRelease.OrderReleased', {
        //Regular expression to split store numbers by comma and 'and' in notification (Remove after api integration)
        orders: selectedStores.join(', ').replace(/, ([^,]*)$/, ` ${t('OutboundMatrix.And')} $1`),
      })
    );
    navigate(PAGE_URLS.OUTBOUND_CONTROL_DESK);
  };

  return (
    <>
      <MasterTitle
        title={
          inLaneConfirmation
            ? t('OutboundMatrix.OrderRelease.LaneConfirmation')
            : t('OutboundMatrix.OrderRelease.Title')
        }
        subtitle={
          <View direction="row" gap={4}>
            <Text>
              {t('OutboundMatrix.OrderRelease.ShiftGoalStoresReleased', { count: 15, max: 80 })}
            </Text>
          </View>
        }
        breadcrumbProps={{
          data: [
            {
              label: t('Sidenav.OutboundControlDesk'),
              onClick: () => navigate(PAGE_URLS.OUTBOUND_CONTROL_DESK),
            },
            { label: t('OutboundMatrix.OrderRelease.Title'), onClick: () => void 0 },
          ],
        }}
      >
        <View direction="row" justify="end" align="center" gap={4}>
          {inLaneConfirmation ? (
            <Button
              size="large"
              variant="primary"
              disabled={!selectedStores.length && !selectedSubzones?.length}
              onClick={onRelease}
            >
              <View direction="row" align="center" justify="center" gap={2}>
                <Text>{t('OutboundMatrix.OrderRelease.Release')}</Text>
              </View>
            </Button>
          ) : (
            <Button
              size="large"
              variant="primary"
              disabled={!selectedStores.length && !selectedSubzones?.length}
              onClick={onProceesToLaneConfirmation}
            >
              <View direction="row" align="center" justify="center" gap={2}>
                <Text>{t('OutboundMatrix.OrderRelease.ProceedToLaneConfirmation')}</Text>
              </View>
            </Button>
          )}
        </View>
      </MasterTitle>
      <View direction="column" width="100%">
        <OrderTabs />
      </View>
    </>
  );
};
