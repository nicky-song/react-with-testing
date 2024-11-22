/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { StatusBadge } from './StatusBadge';
import { render, screen } from '@testing-library/react';
import { StatusVariants } from './StatusBadge.types';

describe('Status Badge component', () => {
  const mockText = 'Status';
  const mockVariant = StatusVariants.READY_FOR_ACTION;

  it('Should render the status badge', () => {
    render(<StatusBadge variant={mockVariant} text={mockText} />);
    expect(screen.getByText(mockText)).toBeDefined();
  });
});
