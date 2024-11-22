/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OrderDetailsDrawer } from './OrderDetailsDrawer';
import { MemoryRouter } from 'react-router-dom';
import { useCreateReplenishmentOrderProcesses } from '@ofm/services/hooks/useCreateReplenishmentOrderProcesses';
import { useCreateBillOrderProcesses } from '@ofm/services/hooks/useCreateBillOrderProcesses';
import { useGetOrderProducts } from '@ofm/services/hooks/useGetOrderProducts';
import { useVerifyOrder } from '@ofm/services/hooks/useVerifyOrder';
import { useCreateOrderActivity } from '@ofm/services/hooks/useCreateOrderActivity';
import { useDeleteOrder } from '@ofm/services/hooks/useDeleteOrder';
import { useDeleteOrderProducts } from '@ofm/services/hooks/useDeleteOrderItems';

vi.mock('@ofm/services/hooks/useCreateOrderActivity', () => {
  return {
    useCreateOrderActivity: vi.fn(() => {
      return { mutateCreateOrderActivity: vi.fn() };
    }),
  };
});

vi.mock('@ofm/services/hooks/useDeleteOrderItems', () => {
  return {
    useDeleteOrderProducts: vi.fn(() => {
      return { mutateDeleteOrderProducts: vi.fn() };
    }),
  };
});

vi.mock('@ofm/services/hooks/useDeleteOrder', () => {
  return {
    useDeleteOrder: vi.fn(() => {
      return { mutateDeleteOrder: vi.fn() };
    }),
  };
});

vi.mock('@ofm/services/hooks/useVerifyOrder', () => {
  return {
    useVerifyOrder: vi.fn(() => {
      return { mutateVerifyOrder: vi.fn() };
    }),
  };
});

vi.mock('@ofm/services/hooks/useCreateReplenishmentOrderProcesses', () => {
  return {
    useCreateReplenishmentOrderProcesses: vi.fn(() => {
      return {
        mutateCreateReplenishmentOrder: vi.fn(),
      };
    }),
  };
});

vi.mock('@ofm/services/hooks/useCreateBillOrderProcesses', () => {
  return {
    useCreateBillOrderProcesses: vi.fn(() => {
      return {
        mutateCreateBillOrder: vi.fn(),
      };
    }),
  };
});

vi.mock('@ofm/services/hooks/useGetOrderProducts', () => {
  return {
    useGetOrderProducts: vi.fn(() => {
      return [];
    }),
  };
});

vi.mock('@ofm/services/userService', () => {
  return {
    retrieveUserInfo: vi.fn(),
  };
});

vi.mock('@ofm/services/hooks/useExportOrders', () => {
  return {
    useExportOrders: vi.fn(() => {
      return [];
    }),
  };
});

vi.mock('@ofm/services/hooks/useExportOrderProducts', () => {
  return {
    useExportOrderProducts: vi.fn(() => {
      return [];
    }),
  };
});

vi.mock('./useOrderDetailsDrawer', () => {
  return {
    useOrderDetailsDrawer: vi.fn(() => {
      return { orderDetailsData: undefined, isError: false, isLoading: false };
    }),
  };
});

vi.mock('@ofm/services/hooks/useCreateCreditOrder', () => {
  return {
    useCreateCreditOrder: vi.fn(() => {
      return { mutateCreateCreditOrder: vi.fn() };
    }),
  };
});

describe('Order Details Drawer component', () => {
  const mockAction = vi.fn();

  it('Should render the Drawer component correctly', async () => {
    const { container } = render(
      <MemoryRouter>
        <OrderDetailsDrawer
          drawerProps={{
            show: true,
            handleClose: mockAction,
          }}
        />
      </MemoryRouter>
    );
    expect(container).toBeDefined();
    expect(useCreateReplenishmentOrderProcesses).toHaveBeenCalled();
    expect(useCreateBillOrderProcesses).toHaveBeenCalled();
    expect(useGetOrderProducts).toHaveBeenCalled();
    expect(useVerifyOrder).toHaveBeenCalled();
    expect(useCreateOrderActivity).toHaveBeenCalled();
    expect(useDeleteOrder).toHaveBeenCalled();
    expect(useDeleteOrderProducts).toHaveBeenCalled();

    expect(screen.getAllByTestId('order-details-title')).toBeDefined();
    expect(screen.getAllByTestId('order-details-cards')).toBeDefined();
    expect(screen.getAllByTestId('order-details-left-column')).toBeDefined();
    expect(screen.getAllByTestId('order-details-right-column')).toBeDefined();
  });
});
