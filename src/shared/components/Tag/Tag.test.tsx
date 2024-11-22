/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';
import { Tag } from './Tag';

describe('Tag component', () => {
  const mockText = 'Tag';

  it('Should render the tag component with commodity variant', () => {
    render(<Tag text={mockText} variant="commodity" />);
    expect(screen.getByText(mockText)).toBeDefined();
  });

  it('Should render the tag component with order variant', () => {
    render(<Tag text={mockText} variant="order" />);
    expect(screen.getByText(mockText)).toBeDefined();
  });

  it('Should render the tag component with hazmat variant', () => {
    render(<Tag text={mockText} variant="hazmat" />);
    expect(screen.getByText(mockText)).toBeDefined();
    expect(screen.getByTestId('st-icon')).toBeDefined();
  });
});
