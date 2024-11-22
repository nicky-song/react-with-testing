/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { MatrixHeatmap } from './MatrixHeatmap';

const data = [
  [
    { state: 'empty' },
    { state: 'empty' },
    { state: 'empty' },
    { state: 'empty' },
    { state: 'empty' },
    { state: 'empty' },
    { state: 'empty' },
    { state: 'empty' },
  ],
  [
    { state: 'empty' },
    { state: 'empty' },
    { state: 'empty' },
    { state: 'empty' },
    { state: 'empty' },
    { state: 'empty' },
    { state: 'empty' },
    { state: 'empty' },
  ],
];

describe('Matrix Heatmap Component', () => {
  it('Should Matrix Heatmap render', () => {
    render(<MatrixHeatmap data={data} />);
    expect(screen.getAllByTestId('heatmap-cell').length).toBe(data.flat().length);
  });
});
