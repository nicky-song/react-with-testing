/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ChangeEvent, useEffect, useState } from 'react';

import { t } from 'i18next';
import * as T from './Shipments.types';

import { Button, Checkbox, Select, View, Text, Icon, Add, SelectOptionProps } from '@az/starc-ui';

import { MasterTitle } from '@shared/components/MasterTitle/MasterTitle';
import { QuantityBadge } from '@shared/components/QuantityBadge/QuantityBadge';
import { QuantityVariants } from '@shared/components/QuantityBadge/QuantityBadge.types';

import { MasterCard } from '@inbound/components/MasterCard/MasterCard';

import { Download } from '@shared/assets/icons';

import { ShipmentMasterCardTypes } from './Shipments.types';
import { SHIPMENT_TIME_TYPES, TRAILER_MASTERCARD_ROWS } from './data';

import { generateDateString } from '@ofm/utils/utils';
import styles from './Shipments.module.scss';
import { TrailerStatus, ShipmentTimeTypes } from '@outbound/constants/constants';

export const Shipments = () => {
  /* State variables */
  const [sortData, setSortData] = useState(TRAILER_MASTERCARD_ROWS);
  const [filter, setFilter] = useState({ showNotStarted: true, showShipped: true });

  /* Functions */
  const onSelectionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: checked }));
  };

  const renderShipmentMasterCards = (shipmentData: ShipmentMasterCardTypes[]) => {
    return shipmentData.map((trailer) => (
      <MasterCard
        title={trailer.trailer}
        tagItems={
          trailer.hazmat ? [{ variant: 'hazmat', text: t('OutBoundShipments.Hazmat') }] : []
        }
        priority={trailer.priority}
        label={t('OutBoundShipments.Dispatch', {
          date:
            trailer.trailerDispatchTime &&
            generateDateString(trailer.trailerDispatchTime, t('DateFormat.TimeHoursMinutes')),
        })}
        detailsData={{
          data: [
            {
              label: trailer.route,
            },
          ],
        }}
        {...(trailer.users
          ? {
              avatarGroupData: {
                users: trailer.users && trailer.users.length > 0 ? trailer.users : [],
                size: 'small',
                maxDisplay: 2,
              },
            }
          : {})}
        picesData={{
          count: trailer.numberLoaded,
          total: trailer.totalLoaded,
          label: t('OutBoundShipments.Loaded'),
        }}
      />
    ));
  };

  const sortOptionsByTime = (selectedOption: T.SHIPMENT_TIME_TYPES) => {
    if (
      selectedOption.value === ShipmentTimeTypes.DSD ||
      selectedOption.value === ShipmentTimeTypes.PO
    ) {
      const sortedArray = [...TRAILER_MASTERCARD_ROWS].sort((rowA, rowB) =>
        selectedOption.value === ShipmentTimeTypes.DSD
          ? rowA.trailerDispatchTime.getTime() - rowB.trailerDispatchTime.getTime()
          : rowB.trailerDispatchTime.getTime() - rowA.trailerDispatchTime.getTime()
      );
      setSortData(sortedArray);
    } else {
      const sortedArrayPallets = [...TRAILER_MASTERCARD_ROWS].sort((rowA, rowB) =>
        selectedOption.value === ShipmentTimeTypes.LTD
          ? rowA.numberLoaded - rowB.numberLoaded
          : rowB.numberLoaded - rowA.numberLoaded
      );
      setSortData(sortedArrayPallets);
    }
  };

  /* Hooks */
  useEffect(() => {
    // Sort the data by earliest trailerDispatchTime during initialization
    const sortedArray = [...TRAILER_MASTERCARD_ROWS].sort(
      (rowA, rowB) => rowA.trailerDispatchTime.getTime() - rowB.trailerDispatchTime.getTime()
    );
    setSortData(sortedArray);
  }, []);

  return (
    <View
      direction="column"
      backgroundColor="secondary"
      className={styles['shipments__board-wrapper']}
    >
      <MasterTitle
        title={t('MasterTitle.OutboundShipments')}
        // TODO: Add functionality to save page to favorites column
        titleActionProps={{
          label: t('MasterTitle.Favourite'),
          handleClick: () => {
            return;
          },
        }}
      >
        <View direction="row" justify="end" align="center" gap={4}>
          <View.Item>
            <Button variant="secondary" size="large">
              <View direction="row" align="center" justify="center" gap={2}>
                <Text>{t('MasterTitle.Download')}</Text>
                <Icon svg={Download} color="on-primary" />
              </View>
            </Button>
          </View.Item>
          <View.Item>
            <Button size="large">
              <View direction="row" align="center" justify="center" gap={2}>
                <Icon svg={Add} color="on-primary" />
                <Text>{t('MasterTitle.AddNew')}</Text>
              </View>
            </Button>
          </View.Item>
        </View>
      </MasterTitle>
      <View
        direction="row"
        padding={[4, 8]}
        justify="space-between"
        backgroundColor="secondary"
        align="center"
        className={styles['shipments_page-heading']}
      >
        <View direction="row" gap={4} attributes={{ 'data-type': 'checkbox-group' }}>
          <Checkbox
            key="trailerStatus"
            label={t('OutBoundShipments.ShowNotStarted')}
            name="showNotStarted"
            value="notStarted"
            checked={filter.showNotStarted}
            onChange={onSelectionChange}
          />
          <Checkbox
            key="trailerStatus"
            label={t('OutBoundShipments.ShowShipped')}
            name="showShipped"
            value="shipped"
            checked={filter.showShipped}
            onChange={onSelectionChange}
          />
        </View>

        <Select
          label=""
          variant="no-label"
          id="shipment-type"
          placeholder={t('OutBoundShipments.SortByDispatchTime')}
          name="shipmentType"
          options={SHIPMENT_TIME_TYPES}
          className={styles['shipments__dropdown']}
          onValueChange={(value: SelectOptionProps | null) => {
            if (value) {
              sortOptionsByTime(value as T.SHIPMENT_TIME_TYPES);
            }
          }}
        />
      </View>

      <View
        direction="row"
        padding={[0, 6]}
        backgroundColor="secondary"
        className={styles['shipments__board-wrapper']}
        gap={4}
      >
        {filter.showNotStarted && (
          <View.Item
            columns={{
              s: 12,
              m: 12,
              l: 6,
              xl: filter.showShipped && filter.showNotStarted ? 3 : 4,
            }}
          >
            <View gap={2} direction="row" padding={[4, 0]} align="center">
              <QuantityBadge variant={QuantityVariants.SELECTED} text="6" />
              <View.Item>
                <Text weight="bold" size="125">
                  {t('OutBoundShipments.NotStarted')}
                </Text>
              </View.Item>
            </View>
            <View
              direction="column"
              gap={2}
              padding={[4, 4]}
              className={styles['shipments_not-started']}
            >
              {renderShipmentMasterCards(
                sortData.filter(
                  (trailerStatus) => trailerStatus.status === t(TrailerStatus.NOT_STARTED)
                )
              )}
            </View>
          </View.Item>
        )}

        <View.Item
          columns={{
            s: 12,
            m: 12,
            l: 6,
            xl:
              filter.showShipped && filter.showNotStarted
                ? 3
                : (!filter.showShipped && filter.showNotStarted) ||
                  (filter.showShipped && !filter.showNotStarted)
                ? 4
                : 6,
          }}
        >
          <View gap={2} direction="row" padding={[4, 0]} align="center">
            <QuantityBadge variant={QuantityVariants.SELECTED} text="4" />
            <View.Item>
              <Text weight="bold" size="125">
                {t('OutBoundShipments.InProgress')}
              </Text>
            </View.Item>
          </View>
          <View
            direction="column"
            gap={2}
            padding={[4, 4]}
            className={styles['shipments_in-progress']}
          >
            {renderShipmentMasterCards(
              sortData.filter(
                (trailerStatus) => trailerStatus.status === t(TrailerStatus.IN_PROGRESS)
              )
            )}
          </View>
        </View.Item>

        <View.Item
          columns={{
            s: 12,
            m: 12,
            l: 6,
            xl:
              filter.showShipped && filter.showNotStarted
                ? 3
                : (!filter.showShipped && filter.showNotStarted) ||
                  (filter.showShipped && !filter.showNotStarted)
                ? 4
                : 6,
          }}
        >
          <View gap={2} direction="row" padding={[4, 0]} align="center">
            <QuantityBadge variant={QuantityVariants.SELECTED} text="2" />
            <View.Item>
              <Text weight="bold" size="125">
                {t('OutBoundShipments.CtDockLaneClosed')}
              </Text>
            </View.Item>
          </View>
          <View
            direction="column"
            gap={2}
            padding={[4, 4]}
            className={styles['shipments_dock-lane']}
          >
            {renderShipmentMasterCards(
              sortData.filter(
                (trailerStatus) => trailerStatus.status === t(TrailerStatus.CT_DOCK_LANE_CLOSED)
              )
            )}
          </View>
        </View.Item>
        {filter.showShipped && (
          <View.Item columns={{ s: 12, m: 12, l: 6, xl: filter.showNotStarted ? 3 : 4 }}>
            <View gap={2} direction="row" padding={[4, 0]} align="center">
              <QuantityBadge variant={QuantityVariants.SELECTED} text="4" />
              <View.Item>
                <Text weight="bold" size="125">
                  {t('OutBoundShipments.Shipped')}
                </Text>
              </View.Item>
            </View>
            <View
              direction="column"
              gap={2}
              padding={[4, 4]}
              className={styles['shipments_shipped']}
            >
              {renderShipmentMasterCards(
                sortData.filter(
                  (trailerStatus) => trailerStatus.status === t(TrailerStatus.SHIPPED)
                )
              )}
            </View>
          </View.Item>
        )}
      </View>
    </View>
  );
};
