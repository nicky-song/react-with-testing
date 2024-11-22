/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { QuantityBadge } from './QuantityBadge';
import { render, screen } from '@testing-library/react';
import { QuantityVariants } from './QuantityBadge.types';

describe('Quantity Badge component', () => {
  const mockText = '56';
  const mockVariant = QuantityVariants.SELECTED;

  it('Should render the quantity badge', () => {
    render(<QuantityBadge variant={mockVariant} text={mockText} />);
    expect(screen.getByText(mockText)).toBeDefined();
  });
});
