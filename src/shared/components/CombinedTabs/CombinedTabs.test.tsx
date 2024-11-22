/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { MemoryRouter } from 'react-router-dom';
import { CombinedTabs } from './CombinedTabs';
import { render, screen } from '@testing-library/react';
import { PAGE_URLS } from '@shared/constants/routes';

describe('Combined Tabs Component', () => {
  it('should display selected tab', () => {
    const tabs = [
      {
        name: 'Replenishment',
        numberOfItems: 150,
        value: 'replenishment',
      },
      {
        name: 'Opening & Backup',
        numberOfItems: 9,
        value: 'new-store-and-backup',
      },
      {
        name: 'Cross Dock',
        numberOfItems: 200,
        value: 'cross-dock',
      },
    ];

    render(
      <MemoryRouter>
        <CombinedTabs tabs={tabs} rootPath={PAGE_URLS.ORDER_REQUEST_BILLING} isTest />
      </MemoryRouter>
    );

    const element = screen.getByTestId('st-tabs-list');
    expect(element).toBeTruthy();
  });
});
