/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { StatusVariants } from '@shared/components/StatusBadge/StatusBadge.types';
import { CheckBoxCard } from './CheckBoxCard';
import { fireEvent, render, screen } from '@testing-library/react';

describe('CheckBox Card Component', () => {
  const mockTitle = '000123';
  const mockLabel = 'Close by 11/02/2021';
  const mockFunction = vi.fn();

  it('should render the checkbox card properly', () => {
    render(
      <CheckBoxCard
        title={mockTitle}
        label={mockLabel}
        isChecked={false}
        onChangeHandler={mockFunction}
        onClick={mockFunction}
      />
    );
    expect(screen.getByText(mockTitle)).toBeDefined();
    expect(screen.getByText(mockLabel)).toBeDefined();
    expect(screen.getByRole('checkbox')).toBeDefined();

    const chevronButton = screen.getByRole('button') as HTMLButtonElement;
    expect(chevronButton).toBeDefined();

    fireEvent.click(chevronButton);
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it('should display the checkbox card without checkbox if prop to hide given', () => {
    render(
      <CheckBoxCard
        title={mockTitle}
        label={mockLabel}
        shouldHideCheckbox={true}
        isChecked={false}
        onChangeHandler={mockFunction}
      />
    );
    expect(screen.getByText(mockTitle)).toBeDefined();
    expect(screen.getByText(mockLabel)).toBeDefined();
    expect(screen.queryByRole('checkbox')).toBeFalsy();
  });

  it('should display the checkbox card without disabled checkbox if prop given', () => {
    render(
      <CheckBoxCard
        title={mockTitle}
        label={mockLabel}
        isCheckboxDisabled={true}
        isChecked={false}
        onChangeHandler={mockFunction}
      />
    );
    expect(screen.getByText(mockTitle)).toBeDefined();
    expect(screen.getByText(mockLabel)).toBeDefined();
    const checkBoxElement = screen.queryByRole('checkbox') as HTMLInputElement;
    expect(checkBoxElement.disabled).toBe(true);
  });

  it('should display the checkbox card with status badge if given', () => {
    const mockStatusBadgeText = 'Not Started';
    render(
      <CheckBoxCard
        title={mockTitle}
        label={mockLabel}
        statusBadge={{ variant: StatusVariants.NOT_STARTED, text: mockStatusBadgeText }}
        isChecked={false}
        onChangeHandler={mockFunction}
      />
    );
    expect(screen.getByText(mockTitle)).toBeDefined();
    expect(screen.getByText(mockLabel)).toBeDefined();
    expect(screen.getByText(mockStatusBadgeText)).toBeDefined();
  });
});
