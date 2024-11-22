/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';
import { SearchInput } from './SearchInput';

describe('Search Input Component', () => {
  it('Should render search component', async () => {
    const mockText = 'search';
    const mockAction = vi.fn();
    const mockValue = 'Test';

    render(
      <SearchInput
        label={mockText}
        value={mockValue}
        onValueChange={mockAction}
        onValueClear={mockAction}
        onEnter={mockAction}
      />
    );
    const Element = screen.getByTestId('st-search-bar');
    const input = Element.querySelectorAll('input');
    expect(input[0].getAttribute('placeholder')).toBeDefined();
    expect(input[0].value).toBeDefined();

    expect(screen.getByText('clear')).toBeDefined();
  });
});
