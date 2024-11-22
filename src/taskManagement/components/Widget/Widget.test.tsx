/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';
import { Widget } from './Widget';

describe('Widget Component', () => {
  const widgetData = {
    assignedUsersCount: 8,
  };
  test('Should render the Widget component with assignedUsersCount', () => {
    render(<Widget assignedUsersCount={widgetData.assignedUsersCount} />);
    expect(screen.getByText(widgetData.assignedUsersCount)).toBeDefined();
  });
});
