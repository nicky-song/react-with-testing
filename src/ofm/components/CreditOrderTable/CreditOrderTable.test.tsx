/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CreditOrderTable } from './CreditOrderTable';

describe('Credit Order Table Component', () => {
  const mockData = [
    {
      id: '1',
      sku: '000991132',
      partNumber: 'TMK-2.5',
      description: 'POLYURETHANE WHEELS',
      pack: 10,
      packReceivedCurrent: 0,
      packReceivedMax: 2,
      quantityReceivedCurrent: 0,
      quantityReceivedMax: 20,
    },
    {
      id: '2',
      sku: '000991132',
      partNumber: 'TMK-2.5',
      description: 'POLYURETHANE WHEELS',
      pack: 1,
      packReceivedCurrent: 0,
      packReceivedMax: 10,
      quantityReceivedCurrent: 0,
      quantityReceivedMax: 10,
    },
  ];

  const mockChange = vi.fn();

  beforeEach(() => {
    mockChange.mockClear();
  });

  it('Should render the credit order table correctly', () => {
    render(<CreditOrderTable data={mockData} onChange={mockChange} />);
    expect(screen.getAllByTestId('credit-order-row')).toHaveLength(2);
  });

  it('Should be able to change the stepper count correctly', async () => {
    render(<CreditOrderTable data={mockData} onChange={mockChange} />);
    const stepperInputLeft = screen.getAllByTestId('stepper-input');
    const stepperInputRight = screen.getAllByTestId('stepper-input-large');
    expect(stepperInputLeft).toHaveLength(2);
    expect(stepperInputRight).toHaveLength(2);

    const inputOne = stepperInputLeft.at(0) as HTMLInputElement;
    const inputTwo = stepperInputRight.at(0) as HTMLInputElement;
    await waitFor(() => {
      fireEvent.change(inputOne, { target: { value: 10 } });
      fireEvent.change(inputTwo, { target: { value: 10 } });
    });
    expect(mockChange).toHaveBeenCalledTimes(2);
  });
});
