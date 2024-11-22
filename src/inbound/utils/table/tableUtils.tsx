/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { t } from 'i18next';

import { View, Text, Actionable } from '@az/starc-ui';

import { AvatarGroup } from '@shared/components/AvatarGroup/AvatarGroup';
import { StatusBadge } from '@shared/components/StatusBadge/StatusBadge';
import { Tag } from '@shared/components/Tag/Tag';
import { ActionDropdownMenu } from '@shared/components/ActionDropdownMenu/ActionDropdownMenu';
import { EMPTY_VALUE } from '@shared/constants/constants';

import { generateDateString } from '@ofm/utils/utils';

import { PriorityTag } from '@inbound/components/PriorityTag/PriorityTag';
import { POActions } from '@inbound/constants/constants';
import {
  PODashboardDataRowType,
  PODashboardDividerRowType,
  PODetailProductRowType,
} from '@inbound/types/types';
import {
  calculatePercentage,
  calculatePercentageWithSign,
  replaceAll,
  statusToBadgeVariant,
} from '@inbound/utils/utils';

const generatePODashboardTableCells = (
  order: PODashboardDataRowType | PODashboardDividerRowType,
  onActionMenuClick: (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    poNumber: number,
    action: string
  ) => void
) => {
  return [
    {
      value: order.priority && <PriorityTag />,
      sortValue: order.priority,
    },
    {
      value: order.arrivalTime && generateDateString(order.arrivalTime, t('DateFormat.ShortTime')),
      sortValue:
        order.arrivalTime && generateDateString(order.arrivalTime, t('DateFormat.ShortTime')),
    },
    {
      value: <Text>{order.vendorName || EMPTY_VALUE}</Text>,
      sortValue: order.vendorName,
    },
    { value: order.poNumber, sortValue: order.poNumber },
    {
      value: <Text>{order.door || EMPTY_VALUE}</Text>,
      sortValue: order.door,
    },
    {
      value: <Text>{order.location || EMPTY_VALUE}</Text>,
      sortValue: order.location,
    },
    {
      value: t('PODashboard.LinesDataSummary', {
        count: order.lines,
        total: order.totalLines,
      }),
      sortValue: order.lines,
    },
    {
      value: t('PODashboard.PicesData', {
        count: order.pieces,
        total: order.totalPices,
      }),
      sortValue: order.pieces,
    },
    {
      value: order.commodity && <Tag variant="order" text={order.commodity} />,
      sortValue: order.commodity,
    },
    {
      value: order.poType && <Tag variant="order" text={order.poType} />,
      sortValue: order.poType,
    },
    {
      value: order.skusWithFPS && order.totalSkusWithFPS && (
        <Text
          color={
            calculatePercentage(order.skusWithFPS, order.totalSkusWithFPS) < 100
              ? 'error'
              : 'primary'
          }
          weight={
            calculatePercentage(order.skusWithFPS, order.totalSkusWithFPS) < 100
              ? 'bold'
              : 'regular'
          }
        >
          {calculatePercentageWithSign(order.skusWithFPS, order.totalSkusWithFPS) || EMPTY_VALUE}
        </Text>
      ),
      sortValue: order.skusWithFPS,
    },
    {
      value: (order.users && <AvatarGroup users={order.users} size="small" />) || EMPTY_VALUE,
    },
    {
      value: order.status && (
        <StatusBadge
          text={replaceAll(order.status, '_', ' ')}
          variant={statusToBadgeVariant(order.status)}
        />
      ),
      sortValue: order.status,
    },
    {
      value: (
        <ActionDropdownMenu>
          <View padding={[1, 0]}>
            <View.Item>
              <View padding={[3, 4]}>
                <Actionable
                  fullWidth
                  onClick={(
                    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
                  ) => onActionMenuClick(event, order.poNumber, POActions.VIEW_DETAILS)}
                >
                  <Text>{t('PODashboard.Actions.ViewPODetails')}</Text>
                </Actionable>
              </View>
            </View.Item>
            <View.Item>
              <View padding={[3, 4]}>
                <Actionable
                  fullWidth
                  onClick={(
                    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
                  ) => onActionMenuClick(event, order.poNumber, POActions.EDIT_DETAILS)}
                >
                  <Text>{t('PODashboard.Actions.EditPODetails')}</Text>
                </Actionable>
              </View>
            </View.Item>
            <View.Item>
              <View padding={[3, 4]}>
                <Actionable
                  fullWidth
                  onClick={(
                    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
                  ) => onActionMenuClick(event, order.poNumber, POActions.PUT_ON_HOLD)}
                >
                  <Text>{t('PODashboard.Actions.PutPOOnHold')}</Text>
                </Actionable>
              </View>
            </View.Item>
            <View.Item>
              <View padding={[3, 4]}>
                <Actionable
                  fullWidth
                  onClick={(
                    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
                  ) => onActionMenuClick(event, order.poNumber, POActions.REMOVE)}
                >
                  <Text color="error">{t('PODashboard.Actions.RemovePONotOnTrailer')}</Text>
                </Actionable>
              </View>
            </View.Item>
          </View>
        </ActionDropdownMenu>
      ),
    },
  ];
};

/**
 *
 * @param rows: The rows to populate the table, that are raw data.
 * @returns Rows mapped to the Table STARC format and specific for the Store Details Table
 */
export const mapPODashboardTableRows = (
  rows: PODashboardDataRowType[],
  onActionMenuClick: (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    poNumber: number,
    action: string
  ) => void
) => {
  const today = new Date();
  today.setHours(0, 0, 0);

  return rows.map((order) => ({
    id: order.poNumber.toString(),
    cells: generatePODashboardTableCells(order, onActionMenuClick),
  }));
};

/**
 *
 * @param rows: The rows to populate the table, that are raw data.
 * @returns Rows mapped to the Table STARC format and specific for the Store Details Table
 */
export const mapPODashboardTableAgeBreakdownRows = (
  rows: PODashboardDividerRowType[],
  onActionMenuClick: (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    poNumber: number,
    action: string
  ) => void
) => {
  const today = new Date();
  today.setHours(0, 0, 0);

  return rows.map((order) => ({
    id: order.poNumber.toString(),
    dividerLabel: order.dividerLabel ? order.dividerLabel : '',
    cells: order.dividerLabel ? [] : generatePODashboardTableCells(order, onActionMenuClick),
  }));
};

export const mapPODetailProductTabelRows = (rows: PODetailProductRowType[]) => {
  return rows.map((product, index) => ({
    id: index.toString(),
    cells: [
      {
        value: product.productName && <Text weight="bold">{product.productName}</Text>,
        sortValue: product.productName,
      },
      {
        value: product.putLocations,
        sortValue: product.putLocations,
      },
      {
        value: product.sku,
        sortValue: product.sku,
      },
      {
        value: product.partNumber,
        sortValue: product.partNumber,
      },
      {
        value: product.lines && (
          <Text weight="bold">
            {t('PODashboard.LinesData', {
              count: product.lines,
              total: product.totalLines,
            })}
          </Text>
        ),
        sortValue: product.lines,
      },
      {
        value: product.pieces && (
          <Text weight="bold">
            {t('PODashboard.PicesData', {
              count: product.pieces,
              total: product.totalPices,
            })}
          </Text>
        ),
        sortValue: product.pieces,
      },
    ],
  }));
};
