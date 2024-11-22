/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';
import { ListKanbanToggle } from './ListKanbanToggle';

describe('Tag component', () => {
  const mockOnToggle = vi.fn();

  it('Should render the list kanban toggle component', () => {
    render(<ListKanbanToggle onToggle={mockOnToggle} />);
    expect(screen.getByTestId('st-list-kanban-toggle')).toBeDefined();
  });
});
