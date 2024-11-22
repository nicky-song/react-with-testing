/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Dropdown } from '@az/starc-ui';
import { Profile } from './Profile';
import { render, screen, waitFor } from '@testing-library/react';

describe('Profile  Component', () => {
  const mockClick = vi.fn();
  const mockName = 'Richard McCarthy';
  const mockTitle = 'Inbound Clerk';

  const mockItemTextOne = 'Mock Item One';
  const mockItemTextTwo = 'Mock Item Two';
  const mockItemOne = <Dropdown.Item onClick={mockClick} label={mockItemTextOne} />;
  const mockItemTwo = <Dropdown.Item onClick={mockClick} label={mockItemTextTwo} />;

  beforeEach(() => {
    mockClick.mockClear();
  });

  it('Should display the Profile component correctly', async () => {
    render(
      <Profile name={mockName} title={mockTitle}>
        {mockItemOne}
        {mockItemTwo}
      </Profile>
    );
    expect(screen.getByText(mockName)).toBeDefined();
    expect(screen.getByText(mockTitle)).toBeDefined();
    expect(screen.queryByText(mockItemTextOne)).toBeNull();
    expect(screen.queryByText(mockItemTextTwo)).toBeNull();

    const dropdownButton = screen.getByTestId('st-dropdown').firstChild as HTMLButtonElement;
    await waitFor(() => {
      dropdownButton.click();
    });
    expect(screen.getByText(mockItemTextOne)).toBeDefined();
    expect(screen.getByText(mockItemTextTwo)).toBeDefined();
  });

  it('Should display clickable elements for Profile component dropdown', async () => {
    render(
      <Profile name={mockName} title={mockTitle}>
        {mockItemOne}
        {mockItemTwo}
      </Profile>
    );
    const dropdownButton = screen.getByTestId('st-dropdown').firstChild as HTMLButtonElement;
    await waitFor(() => {
      dropdownButton.click();
    });

    const itemOne = screen.getByText(mockItemTextOne);
    const itemTwo = screen.getByText(mockItemTextTwo);
    expect(itemOne).toBeDefined();
    expect(itemTwo).toBeDefined();
    itemOne.click();
    itemTwo.click();

    await waitFor(() => {
      dropdownButton.click();
    });

    expect(mockClick).toHaveBeenCalledTimes(2);
  });
});
