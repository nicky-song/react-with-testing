/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render } from '@testing-library/react';
import { TextAreaCounter } from './TextAreaCounter';

describe('Text Area Counter component', () => {
  it('Component renders correctly', () => {
    const { container } = render(<TextAreaCounter count={1} />);
    expect(container).toBeDefined();
  });
});
