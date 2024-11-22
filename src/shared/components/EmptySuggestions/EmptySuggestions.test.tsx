/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render } from '@testing-library/react';
import { EmptySuggestions } from './EmptySuggestions';

describe('EmptySuggestions Component', () => {
  it('Should render the empty suggestions component', () => {
    const { getByTestId } = render(<EmptySuggestions />);

    const emptySuggestionsElement = getByTestId('st-view');
    const textElement = getByTestId('st-text');

    expect(emptySuggestionsElement).toBeDefined();
    expect(textElement).toBeDefined();
    expect(typeof textElement.textContent).toBe('string');
  });
});
