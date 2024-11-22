/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Store } from '@az/starc-ui-icons';
import { EmptyState } from './EmptyState';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Empty State Component', () => {
  const mockSubtitle = 'Mock Subtitle';
  const mockText = 'Mock Text';
  const mockLinkProps = {
    label: 'mocklabel',
    url: 'mockurl',
  };

  it('Should render the EmptyState component as default type', () => {
    render(
      <MemoryRouter>
        <EmptyState svg={Store} subtitle={mockSubtitle} text={mockText} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('st-icon')).toBeDefined();
    expect(screen.getAllByText(mockSubtitle)).toBeDefined();
    expect(screen.getByText(mockText)).toBeDefined();
  });

  it('Should render the EmptyState component with warning type', () => {
    render(
      <MemoryRouter>
        <EmptyState svg={Store} subtitle={mockSubtitle} text={mockText} type="warning" />
      </MemoryRouter>
    );
    expect(screen.getByTestId('st-icon')).toBeDefined();
    expect(screen.getAllByText(mockSubtitle)).toBeDefined();
    expect(screen.getByText(mockText)).toBeDefined();
  });

  it('Should render the EmptyState component with url', () => {
    render(
      <MemoryRouter>
        <EmptyState svg={Store} subtitle={mockSubtitle} text={mockText} linkProps={mockLinkProps} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('st-icon')).toBeDefined();
    expect(screen.getAllByText(mockSubtitle)).toBeDefined();
    expect(screen.getByText(mockText)).toBeDefined();
    expect(screen.getByText(mockLinkProps.label)).toBeDefined();
  });
});
