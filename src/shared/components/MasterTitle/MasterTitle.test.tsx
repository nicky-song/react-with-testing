/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';
import { MasterTitle } from './MasterTitle';

describe('Master Title component', () => {
  const mockButtonClick = vi.fn();
  const mockClose = vi.fn();
  const mockTitle = 'Mock Title';
  const mockSubtitle = 'Mock Subtitle';
  const mockCloseProps = {
    handleClick: mockClose,
    label: 'Mock Close',
  };
  const mockTitleActionProps = {
    label: 'Mock Title Action',
    handleClick: mockButtonClick,
  };

  const mockBreadcrumbs = {
    data: [
      {
        label: 'Mock Breadcrumbs',
        url: '/mock',
      },
    ],
  };

  beforeEach(() => {
    mockButtonClick.mockClear();
    mockClose.mockClear();
  });

  it('Should render the Master Title with title, subtitle, title action and close button', () => {
    render(
      <MasterTitle
        title={mockTitle}
        subtitle={mockSubtitle}
        titleActionProps={mockTitleActionProps}
        closeProps={mockCloseProps}
      />
    );
    expect(screen.getByText(mockTitle)).toBeDefined();
    expect(screen.getByText(mockSubtitle)).toBeDefined();
    const buttons = screen.getAllByTestId('st-button-st-actionable');
    expect(buttons).toHaveLength(2);
    buttons[0].click();
    buttons[1].click();
    expect(mockClose).toHaveBeenCalledOnce();
    expect(mockButtonClick).toHaveBeenCalledOnce();
  });

  it('Should render the Master Title with title, breadcrumbs, active title icon and actions', () => {
    render(
      <MasterTitle
        title={mockTitle}
        breadcrumbProps={mockBreadcrumbs}
        titleActionProps={{ ...mockTitleActionProps, isActive: true }}
      />
    );

    expect(screen.getByText(mockTitle)).toBeDefined();
    expect(screen.getByTestId('st-breadcrumbs')).toBeDefined();
    const buttons = screen.getAllByTestId('st-button-st-actionable');
    expect(buttons).toHaveLength(1);
    buttons[0].click();
    expect(mockButtonClick).toHaveBeenCalledTimes(1);
  });

  it('Should render with children', () => {
    render(<MasterTitle title={mockTitle} children={<p>Mock Children</p>} />);
    expect(screen.getByText('Mock Children')).toBeDefined();
  });
});
