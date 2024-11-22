/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';
import { AvatarGroup } from './AvatarGroup';

describe('Avatar Group Component', () => {
  const users = [
    { id: 1, firstName: 'ABC', lastName: 'BCD' },
    { id: 2, firstName: 'ABC', lastName: 'BCD' },
    { id: 3, firstName: 'ABC', lastName: 'BCD' },
    { id: 4, firstName: 'ABC', lastName: 'BCD' },
    { id: 5, firstName: 'ABC', lastName: 'BCD' },
  ];

  it('Should render avatar group', async () => {
    render(<AvatarGroup users={users} size="large" />);
    expect(screen.getByTestId('st-avatar-group')).toBeDefined();
  });

  it('should display avatar group with four avatar components and +1 text', () => {
    const initials = 'AB';
    render(<AvatarGroup users={users} size="large" />);
    expect(screen.getAllByText(initials)).toHaveLength(4);
    expect(screen.getAllByText('+1')).toBeDefined();
  });

  it('should display avatar group with three avatar components and +2 text', () => {
    const initials = 'AB';
    render(<AvatarGroup users={users} size="large" maxDisplay={3} />);
    expect(screen.getAllByText(initials)).toHaveLength(3);
    expect(screen.getAllByText('+2')).toBeDefined();
  });
});
