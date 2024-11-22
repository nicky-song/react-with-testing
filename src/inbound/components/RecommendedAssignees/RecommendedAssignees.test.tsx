/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen, waitFor } from '@testing-library/react';

import { RecommendedAssignees } from './RecommendedAssignees';

describe('Recommended Assignees Component', () => {
  const mockClick = vi.fn();
  const mockAssignees = [
    {
      id: 1,
      firstName: 'ABC',
      lastName: 'BCD',
    },
    {
      id: 2,
      firstName: 'CDE',
      lastName: 'DEF',
    },
    {
      id: 3,
      firstName: 'EFG',
      lastName: 'FGH',
    },
  ];

  beforeEach(() => {
    mockClick.mockClear();
  });

  it('Should render the recommended assignee and click on button correctly', async () => {
    render(<RecommendedAssignees assignees={mockAssignees} onButtonClick={mockClick} />);
    expect(screen.getByTestId('st-recommended-assignees')).toBeDefined();
    const addButton = screen.getByTestId('st-recommended-assignees').lastChild as HTMLButtonElement;
    await waitFor(() => {
      addButton.click();
    });
  });
});
