/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { MemoryRouter } from 'react-router-dom';
import { Tabs } from './Tabs';
import { render, screen } from '@testing-library/react';
import { Text } from '@az/starc-ui';

describe('Tabs Component', () => {
  it('should display selected tab', () => {
    const content = <Text>test</Text>;
    const tabs = [
      {
        name: 'Vehicles',
        numberOfItems: 150,
        value: 'vehicles',
        content,
      },
      {
        name: 'Locations',
        numberOfItems: 9,
        value: 'locations',
        content,
      },
    ];

    render(
      <MemoryRouter>
        <Tabs tabs={tabs} />
      </MemoryRouter>
    );

    const element = screen.getByTestId('st-tabs-list');
    expect(element).toBeTruthy();
  });
});
