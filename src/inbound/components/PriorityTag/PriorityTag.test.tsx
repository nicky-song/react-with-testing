/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';
import { PriorityTag } from './PriorityTag';

describe('PriorityTag component', () => {
  it('Should render the priority tag component', () => {
    render(<PriorityTag />);
    expect(screen.getByTestId('st-priority-tag')).toBeDefined();
  });
});
