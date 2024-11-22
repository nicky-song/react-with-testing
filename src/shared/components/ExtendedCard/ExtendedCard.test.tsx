/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { StatusVariants } from '@shared/components/StatusBadge/StatusBadge.types';
import { ExtendedCard } from './ExtendedCard';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Extended Card Component', () => {
  const mockTitle = '000123';
  const mockLabel = 'Close by 11/02/2021';
  const mockSubtext = '11/20 Stores';
  const mockUrl = 'test';

  it('should render the Extended card properly', () => {
    render(
      <MemoryRouter>
        <ExtendedCard title={mockTitle} label={mockLabel} url={mockUrl} subtext={mockSubtext} />
      </MemoryRouter>
    );
    expect(screen.getByText(mockTitle)).toBeDefined();
    expect(screen.getByText(mockLabel)).toBeDefined();
    expect(screen.getByText(mockSubtext)).toBeDefined();

    const chevronButton = screen.getByRole('button') as HTMLButtonElement;
    if (chevronButton) fireEvent.click(chevronButton);
  });

  it('should display the Extended card with status badge if given', () => {
    const mockStatusBadgeText = 'Not Started';
    render(
      <MemoryRouter>
        <ExtendedCard
          title={mockTitle}
          label={mockLabel}
          subtext={mockSubtext}
          url={mockUrl}
          statusBadge={{ variant: StatusVariants.NOT_STARTED, text: mockStatusBadgeText }}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(mockTitle)).toBeDefined();
    expect(screen.getByText(mockLabel)).toBeDefined();
    expect(screen.getByText(mockStatusBadgeText)).toBeDefined();
  });
});
