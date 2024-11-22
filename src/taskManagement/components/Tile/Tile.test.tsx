/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';
import { Tile } from './Tile';

describe('Tile Component', () => {
  const MockData = {
    title: 'Shift Progress',
  };
  test('Should render the Tile component with username Shift Progress', () => {
    render(<Tile title={MockData.title} />);
    expect(screen.getByText(MockData.title)).toBeDefined();
  });
});
