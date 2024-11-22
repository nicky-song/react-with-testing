/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';
import { InlineNotification } from './InlineNotification';
import dayjs from 'dayjs';

describe('Inline Notification Component', () => {
  const mockHoldOrderVariant = 'hold-order';
  const mockQuantityAnomalyVariant = 'quantity-anomaly';
  const mockStoreErrorVariant = 'store-error';
  const mockCSRErrorVariant = 'csr-error';
  const MockHoldStoreVariant = 'hold-store';

  const mockRequestedPieces = 1000;
  const mockPart = 'SKU 000991132';
  const mockAverageRequestedPieces = 800;

  const mockTimesTried = 2;
  const mockDate = dayjs('2023-06-30T03:39:16').toDate();

  it('should display the Hold inline notification component', () => {
    render(<InlineNotification variant={mockHoldOrderVariant} />);

    expect(screen.getByTestId('st-notification')).toBeDefined();
  });

  it('should display the Quantity Anomaly inline notification component', () => {
    render(
      <InlineNotification
        variant={mockQuantityAnomalyVariant}
        requestedPieces={mockRequestedPieces}
        averageRequestedPieces={mockAverageRequestedPieces}
        part={mockPart}
      />
    );

    expect(screen.getByTestId('st-notification')).toBeDefined();
  });

  it('should display the Store Error inline notification component', () => {
    render(
      <InlineNotification
        variant={mockStoreErrorVariant}
        timesTried={mockTimesTried}
        date={mockDate}
      />
    );

    expect(screen.getByTestId('st-notification')).toBeDefined();
  });

  it('should display the CSR Error inline notification component', () => {
    render(
      <InlineNotification
        variant={mockCSRErrorVariant}
        timesTried={mockTimesTried}
        date={mockDate}
      />
    );

    expect(screen.getByTestId('st-notification')).toBeDefined();
  });

  it('should display the Hold Store Details inline notification component', () => {
    render(<InlineNotification variant={MockHoldStoreVariant} suggestedDate={mockDate} />);

    expect(screen.getByTestId('st-notification')).toBeDefined();
  });
});
