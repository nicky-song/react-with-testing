/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen, waitFor } from '@testing-library/react';

import { DropdownSelectMenu } from './DropdownSeletMenu';

describe('Dropdown Select Menu Component', () => {
  const mockChange = vi.fn();
  const mockReset = vi.fn();
  const mockOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  it('Should render the dropdown menu and open correctly', async () => {
    render(
      <DropdownSelectMenu
        width={250}
        options={mockOptions}
        name="testName"
        label="Test Label"
        onChange={mockChange}
      />
    );
    expect(screen.getByTestId('st-dropdown')).toBeDefined();
    const dropdownButton = screen.getByTestId('st-dropdown').firstChild as HTMLButtonElement;
    await waitFor(() => {
      dropdownButton.click();
    });
  });

  it('Should render the dropdown menu and switch between options', async () => {
    render(
      <DropdownSelectMenu
        width={250}
        options={mockOptions}
        name="testName"
        label="Test Label"
        onChange={mockChange}
      />
    );
    const dropdownButton = screen.getByTestId('st-dropdown').firstChild as HTMLButtonElement;
    await waitFor(() => {
      dropdownButton.click();
      screen.getByText('Option 1').click();
    });
    expect(mockChange).toHaveBeenCalledWith(['option1']);
  });

  it('Should reset options correctly', async () => {
    render(
      <DropdownSelectMenu
        width={250}
        options={mockOptions}
        name="testName"
        label="Test Label"
        onChange={mockChange}
        onReset={mockReset}
      />
    );
    const dropdownButton = screen.getByTestId('st-dropdown').firstChild as HTMLButtonElement;
    await waitFor(() => {
      dropdownButton.click();
      screen.getByTestId('st-actionable').click();
    });
    expect(mockReset).toHaveBeenCalled();
  });
});
