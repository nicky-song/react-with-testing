/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ProgressBar } from './ProgressBar';
import { render, screen } from '@testing-library/react';

describe('Progress Bar Component', () => {
  it('should display progress bar', () => {
    const max = 100;
    const value = 70;
    const dateString = '12/20/2023 00:12:43';
    const title = 'Orders Processing';
    const text = 'Completed';

    render(
      <ProgressBar max={max} value={value} dateString={dateString} title={title} text={text} />
    );

    const element = screen.getByText('100 Orders Processing');
    expect(element).toBeTruthy();
  });
});
