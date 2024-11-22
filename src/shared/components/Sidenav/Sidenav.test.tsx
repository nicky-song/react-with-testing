/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { BrowserRouter } from 'react-router-dom';
import { Sidenav } from './Sidenav';
import { render, screen } from '@testing-library/react';

describe('Sidenav component', () => {
  const mockTextHome = 'Sidenav.Home';

  it('Should render the Sidenav component opened with the options and the expand button', () => {
    render(
      <BrowserRouter>
        <Sidenav />
      </BrowserRouter>
    );
    expect(screen.getByTestId('st-view')).toBeDefined();
    expect(screen.getByTestId('sidenav-expand-button')).toBeDefined();
    expect(screen.getByText(mockTextHome)).toBeDefined();
  });
});
