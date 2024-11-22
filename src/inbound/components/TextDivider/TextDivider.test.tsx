/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';
import { TextDivider } from './TextDivider';

describe('TextDivider component', () => {
  const mockLabel = 'Divider Text';

  it('Should render the text divider component', () => {
    render(<TextDivider label={mockLabel} />);
    expect(screen.getByTestId('st-text-divider')).toBeDefined();
    expect(screen.getByText(mockLabel)).toBeDefined();
  });
});
