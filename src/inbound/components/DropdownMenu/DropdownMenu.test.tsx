/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen, waitFor } from '@testing-library/react';

import { DropdownMenu } from './DropdownMenu';

describe('Dropdown Menu Component', () => {
  const mockChange = vi.fn();
  const mockTextOne = 'Mock Option 1';
  const mockTextTwo = 'Mock Option 2';
  const mockOptions = [
    { id: '0', name: mockTextOne },
    { id: '1', name: mockTextTwo },
  ];

  beforeEach(() => {
    mockChange.mockClear();
  });

  it('Should render the dropdown menu and open correctly', async () => {
    render(<DropdownMenu width={250} options={mockOptions} onChange={mockChange} />);
    expect(screen.getByTestId('st-dropdown')).toBeDefined();
    const dropdownButton = screen.getByTestId('st-dropdown').firstChild as HTMLButtonElement;
    await waitFor(() => {
      dropdownButton.click();
    });
  });

  it('Should render the dropdown menu and switch between options', async () => {
    render(<DropdownMenu width={250} options={mockOptions} onChange={mockChange} />);
    const dropdownButton = screen.getByTestId('st-dropdown').firstChild as HTMLButtonElement;
    await waitFor(() => {
      dropdownButton.click();
    });
    const optionTwoButton = screen.getByText(mockTextTwo);
    await waitFor(() => {
      optionTwoButton.click();
      dropdownButton.click();
    });
    expect(mockChange).toHaveBeenCalled();
  });
});
