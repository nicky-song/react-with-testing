/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ExtendedStepper } from './ExtendedStepper';

describe('Extended Stepper Component', () => {
  const mockChangeEvent = vi.fn();
  const mockChangeValue = vi.fn();
  const mockErrorText = 'Mock Error';
  const mockHelperText = 'Mock Help';

  beforeEach(() => {
    mockChangeEvent.mockClear();
    mockChangeValue.mockClear();
  });

  it('Should render and allow controlled changes correctly', async () => {
    render(
      <ExtendedStepper value={0} onChange={mockChangeEvent} onValueChange={mockChangeValue} />
    );
    expect(screen.getByTestId('st-stepper')).toBeDefined();
    const input = screen.getByTestId('stepper-input') as HTMLInputElement;

    await waitFor(() => {
      fireEvent.change(input, { target: { value: 10 } });
    });

    expect(mockChangeEvent).toHaveBeenCalledOnce();
    expect(mockChangeValue).toHaveBeenCalledOnce();
    expect(input.value).toBe('0');
  });

  it('Should render and allow uncontrolled changes correctly', async () => {
    render(<ExtendedStepper onChange={mockChangeEvent} onValueChange={mockChangeValue} />);
    expect(screen.getByTestId('st-stepper')).toBeDefined();
    const input = screen.getByTestId('stepper-input') as HTMLInputElement;

    await waitFor(() => {
      fireEvent.change(input, { target: { value: 10 } });
    });

    expect(mockChangeEvent).toHaveBeenCalledOnce();
    expect(mockChangeValue).toHaveBeenCalledOnce();

    expect(input.value).toBe('10');
  });

  it('Should render Stepper with buttons and allow click on both', async () => {
    render(
      <ExtendedStepper value={1} onChange={mockChangeEvent} onValueChange={mockChangeValue} />
    );
    const buttons = screen.getAllByTestId('st-button-st-actionable');
    expect(buttons).toHaveLength(2);
    const buttonDecrement = buttons.at(0) as HTMLButtonElement;
    const buttonIncrement = buttons.at(1) as HTMLButtonElement;

    await waitFor(() => {
      fireEvent.click(buttonIncrement);
      fireEvent.click(buttonDecrement);
    });
    expect(mockChangeValue).toHaveBeenCalledTimes(2);
  });

  it('Should render Stepper with buttons and allow click on increment', async () => {
    render(
      <ExtendedStepper value={0} onChange={mockChangeEvent} onValueChange={mockChangeValue} />
    );
    const buttons = screen.getAllByTestId('st-button-st-actionable');
    expect(buttons).toHaveLength(2);
    const buttonDecrement = buttons.at(0) as HTMLButtonElement;
    const buttonIncrement = buttons.at(1) as HTMLButtonElement;

    await waitFor(() => {
      fireEvent.click(buttonDecrement);
      fireEvent.click(buttonIncrement);
    });
    expect(mockChangeValue).toHaveBeenCalledTimes(1);
  });

  it('Should render Stepper without buttons and with max text', async () => {
    render(
      <ExtendedStepper
        withButtons={false}
        onChange={mockChangeEvent}
        onValueChange={mockChangeValue}
        maxTextValue={10}
      />
    );
    expect(screen.getByText('/ 10')).toBeDefined();
  });

  it('Should render the Stepper as uneditable', async () => {
    render(
      <ExtendedStepper
        isEditable={false}
        onChange={mockChangeEvent}
        onValueChange={mockChangeValue}
      />
    );
    expect(screen.queryByTestId('stepper-input')).toBeNull();
  });

  it('Should render the Stepper with helper and error texts', async () => {
    render(<ExtendedStepper helperText={mockHelperText} errorText={mockErrorText} hasError />);
    expect(screen.getByText(mockHelperText)).toBeDefined();
    expect(screen.getByText(mockErrorText)).toBeDefined();
  });
});
