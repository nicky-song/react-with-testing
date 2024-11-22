/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';

import { t } from 'i18next';

import {
  releaseOrders,
  waveStatus,
} from '@outbound/pages/ControlDesk/ReleaseOrders/OrderTabs/data';

import { OrderReleaseAccordion } from './OrderReleaseAccordion';

describe('OrderReleaseAccordion Component', () => {
  const mockOrder = {
    id: 20094859,
    releaseBy: new Date('10/16/23 12:30:00'),
    pcs: 8495,
    status: waveStatus.unReleased,
    stores: [
      {
        storeNumber: '009453',
        pallets: 4,
        pieces: 121,
        route: 'Route 0321',
        status: waveStatus.replenishmentNotRun,
        activity: '',
      },
    ],
  };

  test('renders OrderReleaseAccordion component with mock data', () => {
    render(<OrderReleaseAccordion item={mockOrder} order={releaseOrders.storeOrders} />);
    expect(screen.getByText(`${t(releaseOrders.storeOrders.label)} ${mockOrder.id}`)).toBeDefined();
    expect(screen.getByText(`${mockOrder.stores.length} stores`)).toBeDefined();
  });
});
