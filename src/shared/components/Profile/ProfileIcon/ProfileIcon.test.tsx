/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ProfileIcon } from './ProfileIcon';
import { render, screen } from '@testing-library/react';

describe('Profile Icon Component', () => {
  it('should display the icon if the icon URL is present', () => {
    const iconUrl = 'https://test.com';
    const name = 'Test User';
    render(<ProfileIcon name={name} iconUrl={iconUrl} />);
    const element = screen.getByRole('img');
    expect(element.getAttribute('src')).toBe(iconUrl);
  });

  it('should display the initials if the icon URL is missing', () => {
    const name = 'Test User';
    const initials = 'TU';
    render(<ProfileIcon name={name} />);
    const element = screen.getByText(initials);
    expect(element).toBeTruthy();
  });

  it('should display the two first letters of the name if name is only 1 word', () => {
    const name = 'Test';
    const initials = 'Te';
    render(<ProfileIcon name={name} />);
    const element = screen.getByText(initials);
    expect(element).toBeTruthy();
  });

  it('should be empty if name is empty', () => {
    const name = '';
    const { container } = render(<ProfileIcon name={name} />);
    const element = container.querySelectorAll('div');

    expect(element[element?.length - 1]?.innerHTML).toBeFalsy();
  });
});
