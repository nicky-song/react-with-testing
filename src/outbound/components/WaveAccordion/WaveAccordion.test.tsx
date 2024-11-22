/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';

import { Table } from '@shared/components/Table/Table';
import {
  ORDER_RELEASE_STORE_ORDERS_TABLE_COLUMNS,
  TableStylingVariants,
} from '@shared/components/Table/tableConstants';

import {
  releaseOrders,
  waveStatus,
} from '@outbound/pages/ControlDesk/ReleaseOrders/OrderTabs/data';
import { WaveAccordion } from './WaveAccordion';

describe('WaveAccordion Component', () => {
  const mockOrder = {
    id: 20181194,
    due: '01/29/23 10:30',
    comment: 'DSD, Mega/Area 6',
    status: waveStatus.partiallyReleased,
    pcs: 8495,

    stores: [
      {
        storeNumber: '000100',
        pallets: 4,
        pieces: 121,
        comments: '',
      },
      {
        storeNumber: '000101',
        pallets: 2,
        pieces: 105,
        comments: 'DSD',
      },
      {
        storeNumber: '000102',
        pallets: 3,
        pieces: 150,
        comments: 'Mega/Area 6',
      },
      {
        storeNumber: '000103',
        pallets: 1,
        pieces: 100,
        comments: '',
      },
      {
        storeNumber: '000104',
        pallets: 4,
        pieces: 121,
        comments: '',
      },
      {
        storeNumber: '000105',
        pallets: 2,
        pieces: 105,
        comments: 'DSD',
      },
      {
        storeNumber: '000106',
        pallets: 3,
        pieces: 150,
        comments: 'Mega/Area 6',
      },
      {
        storeNumber: '000107',
        pallets: 1,
        pieces: 100,
        comments: '',
      },
    ],
  };

  test('renders WaveAccordion component with mock data', () => {
    render(<WaveAccordion item={mockOrder} order={releaseOrders.storeOrders} />);
    expect(screen.getByText(`Wave ${mockOrder.id}`)).toBeDefined();
    expect(screen.getByText(`${mockOrder.stores.length} stores`)).toBeDefined();
    expect(screen.getByText(`Due ${mockOrder.due}`)).toBeDefined();
    expect(screen.getByText(mockOrder.comment)).toBeDefined();
    expect(screen.getByText(mockOrder.status.label)).toBeDefined();
    expect(screen.getByText(`${mockOrder.pcs} pcs`)).toBeDefined();
  });
});

describe('Table Component', () => {
  const PAGE_SIZE = 10;
  const DEFAULT_PAGE = 1;

  // Mock data and functions
  const mockOrderRows = [
    {
      id: '0',
      cells: [{ value: 0 }, { value: 1 }, { value: '2' }, { value: '23' }, { value: 'fgsa' }],
    },
  ];
  const mockOnSort = vi.fn();
  test('renders Table component with mock data', () => {
    render(
      <Table
        columns={ORDER_RELEASE_STORE_ORDERS_TABLE_COLUMNS}
        rows={mockOrderRows}
        isPaginated={false}
        pageSize={PAGE_SIZE}
        defaultPage={DEFAULT_PAGE}
        isCreditItem={false}
        isCheckboxTable={false}
        styleVariant={TableStylingVariants.SIMPLE}
        totalPages={0}
        onSort={mockOnSort}
      />
    );
    expect(screen.getByText('Store Number')).toBeDefined();
    expect(screen.getByText('Pallets')).toBeDefined();
    expect(screen.getByText('Pieces')).toBeDefined();
    expect(screen.getByText('Comments')).toBeDefined();
  });
});
