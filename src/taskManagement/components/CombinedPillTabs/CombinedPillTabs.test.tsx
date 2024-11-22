/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { MemoryRouter } from 'react-router-dom';
import { CombinedPillTabs } from '@taskManagement/components/CombinedPillTabs/CombinedPillTabs';
import { render, screen } from '@testing-library/react';

describe('Combined Pill Tabs Component', () => {
  it('should display selected tab', () => {
    const FilterTabs = [
      {
        name: 'Recommended',
        value: 'Recommended',
      },
      {
        name: 'POs',
        value: 'POs',
      },
      {
        name: 'Replenishment',
        value: 'Replenishment',
      },
    ];

    render(
      <MemoryRouter>
        <CombinedPillTabs TabsFilterData={FilterTabs} />
      </MemoryRouter>
    );

    const element = screen.getByTestId('st-combined-pill-tabs');
    expect(element).toBeTruthy();
  });
});
