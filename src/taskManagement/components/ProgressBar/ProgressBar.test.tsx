/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ProgressBar } from './ProgressBar';
import { render, screen } from '@testing-library/react';

describe('Progress Bar Component', () => {
  const max = 100;
  const value = 70;
  const label = '0/14';

  it('should display progress bar', () => {
    render(<ProgressBar max={max} value={value} label="" />);

    expect(screen.getByTestId('st-progress-bar')).toBeDefined();
  });

  it('should display progress bar with label', () => {
    render(<ProgressBar max={max} value={value} label={label} />);

    const element = screen.getByText('0/14');

    expect(element).toBeTruthy();
  });
});
