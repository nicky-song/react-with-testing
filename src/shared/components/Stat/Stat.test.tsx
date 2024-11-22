/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';
import { Stat } from './Stat';
import { MemoryRouter } from 'react-router-dom';

describe('Stat component', () => {
  const mockTitle = 'Mock Title';
  const mockData = 'Mock Info';
  const mockText = 'Mock Text';
  const mockUrl = 'mockUrl';
  const mockAction = vi.fn();

  beforeEach(() => {
    mockAction.mockClear();
  });

  it('Should render the stat with title and data', () => {
    render(
      <MemoryRouter>
        <Stat title={mockTitle} primaryText={mockData} />
      </MemoryRouter>
    );
    expect(screen.getByText(mockTitle)).toBeDefined();
    expect(screen.getByText(mockData)).toBeDefined();
  });

  it('Should render the stat with title, data and fixed width', () => {
    render(
      <MemoryRouter>
        <Stat title={mockTitle} primaryText={mockData} width="50%" />
      </MemoryRouter>
    );
    expect(screen.getByText(mockTitle)).toBeDefined();
    expect(screen.getByText(mockData)).toBeDefined();
  });

  it('Should render the stat with title, data and text', () => {
    render(
      <MemoryRouter>
        <Stat
          title={mockTitle}
          primaryText={mockData}
          secondaryTextProps={{
            secondaryText: mockText,
          }}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(mockTitle)).toBeDefined();
    expect(screen.getByText(mockData)).toBeDefined();
    expect(screen.getByText(mockText)).toBeDefined();
  });

  it('Should render the stat with title, data and clickable text', () => {
    render(
      <MemoryRouter>
        <Stat
          title={mockTitle}
          primaryText={mockData}
          secondaryTextProps={{
            secondaryText: mockText,
            url: mockUrl,
          }}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(mockTitle)).toBeDefined();
    expect(screen.getByText(mockData)).toBeDefined();
    expect(screen.getByText(mockText)).toBeDefined();
    const link = screen.getByTestId('st-link-st-actionable');
    expect(link).toBeDefined();
    link.click();
  });

  it('Should render the stat as error type and small size', () => {
    render(
      <MemoryRouter>
        <Stat title={mockTitle} primaryText={mockData} size="small" type="error" />
      </MemoryRouter>
    );
    expect(screen.getByText(mockTitle)).toBeDefined();
    expect(screen.getByText(mockData)).toBeDefined();
  });

  it('Should render the stat as error type', () => {
    render(
      <MemoryRouter>
        <Stat title={mockTitle} primaryText={mockData} type="error" />
      </MemoryRouter>
    );
    expect(screen.getByText(mockTitle)).toBeDefined();
    expect(screen.getByText(mockData)).toBeDefined();
  });

  it('Should render the stat with editable action', () => {
    render(
      <MemoryRouter>
        <Stat title={mockTitle} primaryText={mockData} editAction={mockAction} />
      </MemoryRouter>
    );
    expect(screen.getByText(mockTitle)).toBeDefined();
    expect(screen.getByText(mockData)).toBeDefined();
    const button = screen.getByTestId('st-button-st-actionable');
    expect(button).toBeDefined();
    button.click();
    expect(mockAction).toHaveBeenCalledOnce();
  });
});
