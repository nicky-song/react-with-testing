/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { BrowserRouter } from 'react-router-dom';
import { Sidenav } from '../Sidenav';
import { render, screen, waitFor } from '@testing-library/react';

describe('Sidenav component', () => {
  it('Should render the SidenavOptionGroup components inside the Sidenav component, for each item of the list', () => {
    render(
      <BrowserRouter>
        <Sidenav />
      </BrowserRouter>
    );
    expect(screen.getAllByTestId('sidenavOptionGroup-container')).toBeDefined();
  });

  it('Should expand the secondary menu when the SidenavOptionGroup is clicked (except for home)', async () => {
    render(
      <BrowserRouter>
        <Sidenav />
      </BrowserRouter>
    );
    const buttons = screen.getAllByTestId('sidenavOptionGroup-button');
    buttons[0].click();
    // Wait for 1 seconds to check the visibility of the items.
    await waitFor(() => expect(screen.getAllByTestId('sidenavOption-container')).toBeDefined());
  });
});
