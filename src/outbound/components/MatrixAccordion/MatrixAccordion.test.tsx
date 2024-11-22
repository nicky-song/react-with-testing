/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { unknown } from 'zod';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { MatrixAccordion } from '@outbound/components/MatrixAccordion/MatrixAccordion';
import { MatrixHeader } from '@outbound/components/MatrixAccordion/MatrixHeader';

const row = {
  location: 'Aerosol',
  tile1: [
    { count: '0/4', assigned: 1, state: 'empty' },
    { count: '1/4', assigned: 1, state: 'not-started' },
    { count: '0/4', assigned: 1, state: 'empty' },
    { count: '0/4', assigned: 0, state: 'empty' },
    { count: '1/4', assigned: 0, state: 'empty' },
    { count: '0/4', assigned: 1, state: 'empty' },
    { count: '0/4', assigned: 0, state: 'empty' },
    { count: '4/4', assigned: 4, state: 'empty' },
  ],
  tile2: [
    { count: '0/4', assigned: 1, state: 'in-progress' },
    { count: '4/4', assigned: 4, state: 'empty' },
    { count: '0/4', assigned: 1, state: 'not-started' },
    { count: '4/4', assigned: 4, state: 'complete' },
    { count: '0/4', assigned: 0, state: 'empty' },
    { count: '0/4', assigned: 1, state: 'empty' },
    { count: '1/4', assigned: 0, state: 'empty' },
    { count: '1/4', assigned: 4, state: 'complete' },
  ],

  subzones: [
    {
      location: 'Subzone1',
      tile1: [
        { count: '0/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'un-assigned' },
        { count: '1/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'un-assigned' },
        { count: '0/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'un-assigned' },
        { count: '0/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'in-progress' },
        { count: '1/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'empty' },
        { count: '0/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'empty' },
        { count: '0/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'complete' },
        { count: '4/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'un-assigned' },
      ],
      tile2: [
        { count: '0/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'un-assigned' },
        { count: '4/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'not-started' },
        { count: '0/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'in-progress' },
        { count: '4/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'empty' },
        { count: '0/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'error' },
        { count: '0/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'empty' },
        { count: '1/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'un-assigned' },
        { count: '1/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'un-assigned' },
      ],
    },
    {
      location: 'Subzone2',
      tile1: [
        { count: '0/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'un-assigned' },
        { count: '1/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'complete' },
        { count: '0/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'un-assigned' },
        { count: '0/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'not-started' },
        { count: '1/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'un-assigned' },
        { count: '0/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'not-started' },
        { count: '0/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'un-assigned' },
        { count: '4/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'un-assigned' },
      ],
      tile2: [
        { count: '0/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'un-assigned' },
        { count: '4/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'not-started' },
        { count: '0/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'complete' },
        { count: '4/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'empty' },
        { count: '0/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'un-assigned' },
        { count: '0/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'empty' },
        { count: '1/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'un-assigned' },
        { count: '1/4', vehicle: 'HAPL', selector: 'kwheeler', state: 'un-assigned' },
      ],
    },
  ],
};

const displayOptions = {
  completedStores: true,
  waveDetails: false,
  vehicleCode: true,
  orderSelector: true,
  tileInfo: true,
};

describe('Matrix Accordion Component', () => {
  it('Should Matrix Accordion render', () => {
    render(<MatrixAccordion row={row} open={[]} displayOptions={displayOptions} />);
    expect(screen.getByText(row.location)).toBeDefined();
    expect(screen.getAllByTestId('matrix-cell').length).toBe(48);
  });
});

describe('Matrix Header Component', () => {
  it('Should Matrix Header render', () => {
    render(
      <MatrixHeader
        displayOptions={displayOptions}
        onExpand={() => unknown}
        onCollapse={() => unknown}
      />
    );
    expect(screen.getAllByTestId('matrix-header-storeid').length).toBe(16);
  });

  it('Should Matrix Header wave details visible', () => {
    render(
      <MatrixHeader
        displayOptions={{ ...displayOptions, waveDetails: true }}
        onExpand={() => unknown}
        onCollapse={() => unknown}
      />
    );
    expect(screen.getAllByTestId('wave-details')).toBeDefined();
  });
});
