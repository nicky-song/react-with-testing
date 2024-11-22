/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer component', () => {
  const mockText = 'Mock Title';

  it('Should render the Footer correctly', () => {
    render(<Footer>{mockText}</Footer>);
    expect(screen.findByText(mockText)).toBeDefined();
  });
});
