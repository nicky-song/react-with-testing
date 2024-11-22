/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { DropdownMenu } from './DropdownMenu';
import { render, screen, waitFor } from '@testing-library/react';

describe('Dropdown Menu Component', () => {
  const mockChange = vi.fn();
  const mockTextOne = 'Mock Option 1';
  const mockTextTwo = 'Mock Option 2';
  const mockOptions = [
    { id: '0', name: mockTextOne, country: 'US' },
    { id: '1', name: mockTextTwo, country: 'MX' },
  ];

  beforeEach(() => {
    mockChange.mockClear();
  });

  it('Should render the dropdown menu and open correctly', async () => {
    render(<DropdownMenu width={250} options={mockOptions} selectedId="0" onChange={mockChange} />);
    expect(screen.getByText(mockTextOne)).toBeDefined();
    expect(screen.queryByText(mockTextTwo)).toBeNull();
    const dropdownButton = screen.getByTestId('st-dropdown').firstChild as HTMLButtonElement;
    await waitFor(() => {
      dropdownButton.click();
    });
    expect(screen.getAllByText(mockTextOne)).toHaveLength(2);
    expect(screen.getByText(mockTextTwo)).toBeDefined();
  });

  it('Should render the dropdown menu and switch between options', async () => {
    render(<DropdownMenu width={250} options={mockOptions} selectedId="0" onChange={mockChange} />);
    expect(screen.getAllByText(mockTextOne)).toHaveLength(1);
    expect(screen.queryByText(mockTextTwo)).toBeNull();
    const dropdownButton = screen.getByTestId('st-dropdown').firstChild as HTMLButtonElement;
    await waitFor(() => {
      dropdownButton.click();
    });
    const optionTwoButton = screen.getByText(mockTextTwo);
    await waitFor(() => {
      optionTwoButton.click();
      dropdownButton.click();
    });
    expect(screen.getAllByText(mockTextTwo)).toHaveLength(1);
    expect(mockChange).toHaveBeenCalled();
  });

  it('Should render the dropdown menu with undefined label', () => {
    render(<DropdownMenu width={250} options={mockOptions} selectedId="3" onChange={mockChange} />);
    expect(screen.getByTestId('st-text').innerText).toBeUndefined();
  });
});
