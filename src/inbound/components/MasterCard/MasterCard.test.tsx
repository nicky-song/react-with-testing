/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';
import { MasterCard } from './MasterCard';

describe('Master Card component', () => {
  const mockTitle = 'Mock Title';

  it('Should render the Master Card with title', () => {
    render(<MasterCard title={mockTitle} />);
    expect(screen.getByTestId('st-master-card')).toBeDefined();
    expect(screen.getByText(mockTitle)).toBeDefined();
  });
});
