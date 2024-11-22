/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';
import { TopNavigation } from './TopNavigation';
import { MemoryRouter } from 'react-router-dom';
import { ReactNode } from 'react';
import { useHydrateAtoms } from 'jotai/utils';
import { userAtom } from '@shared/atoms/user/userAtom';
import { Provider } from 'jotai';

const mockUser = {
  id: '11111111',
  name: 'Test',
  lastName: 'User',
  email: 'test.user@autozone.com',
  jobTitle: 'IT Support',
  profilePictureUrl: undefined,
  warehouses: [
    {
      id: '20',
      name: 'DC 20',
      country: 'US',
    },
    {
      id: '60',
      name: 'DC 60',
      country: 'US',
    },
    {
      id: '70',
      name: 'DC 70',
      country: 'MX',
    },
    {
      id: '80',
      name: 'DC 80',
      country: 'BR',
    },
  ],
  roles: [
    {
      id: '6797dbec-ac1f-4d4d-b3cb-89b0ad1c7630',
      description: 'IT Support',
    },
  ],
  favoriteOptions: [
    {
      id: 'bd1158c3-f4cf-4500-8026-5c6bf298b5a2',
      url: '/example/page',
    },
  ],
};

vi.mock('@shared/hooks/useRevokeTokens', () => {
  return {
    useRevokeTokens: vi.fn(() => {
      return {
        mutateRevokeTokens: vi.fn(),
      };
    }),
  };
});

vi.mock('@ofm/services/userService', () => {
  return {
    retrieveUserInfo: vi.fn(),
  };
});

vi.mock('@ofm/services/authService', () => {
  return {
    getAuthLink: vi.fn(),
  };
});

const MockJotaiUser = ({ children }: { children: ReactNode }) => {
  useHydrateAtoms([[userAtom, mockUser]]);
  return children;
};

describe('Top Navigation Component', () => {
  it('Renders correctly with user info', () => {
    render(
      <MemoryRouter>
        <Provider>
          <MockJotaiUser>
            <TopNavigation />
          </MockJotaiUser>
        </Provider>
      </MemoryRouter>
    );

    const firstDC = mockUser.warehouses.at(0)?.name;

    expect(screen.getByText(firstDC || 'DC 20')).toBeDefined();
    expect(screen.getByText(`${mockUser.name} ${mockUser.lastName}`)).toBeDefined();
    expect(screen.getByText(mockUser.jobTitle)).toBeDefined();
    expect(screen.getByText(`${mockUser.name.at(0)}${mockUser.lastName.at(0)}`)).toBeDefined();
    expect(screen.getByTestId('st-link-st-actionable')).toBeDefined();
  });
});
