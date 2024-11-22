/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WillCallDrawer } from './WillCallDrawer';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@ofm/services/hooks/useGetStoreById', () => {
  return {
    useGetStoreById: vi.fn(() => {
      return {};
    }),
  };
});

vi.mock('@ofm/services/hooks/useGetProducts', () => {
  return {
    useGetProducts: vi.fn(() => {
      return [];
    }),
  };
});

vi.mock('@ofm/services/hooks/useCreateWillCall', () => {
  return {
    useCreateWillCall: vi.fn(() => {
      return { mutateCreateWillCall: vi.fn() };
    }),
  };
});

describe('New Will Call Drawer component', () => {
  const mockShowDrawer = vi.fn();

  it('Should render the initial will call drawer component correctly', async () => {
    const { container } = render(
      <MemoryRouter>
        <WillCallDrawer
          title="New Will Call"
          showDrawer={true}
          setShowDrawer={mockShowDrawer}
          storeId="1234"
        />
      </MemoryRouter>
    );
    expect(container).toBeDefined();

    expect(screen.getAllByTestId('will-call-left-column')).toBeDefined();
    expect(screen.getAllByTestId('will-call-right-column')).toBeDefined();
  });
});
