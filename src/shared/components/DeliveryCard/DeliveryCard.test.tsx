/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { DeliveryMethod } from '@ofm/constants/constants';
import { DeliveryCard } from './DeliveryCard';
import { render, screen } from '@testing-library/react';

describe('Delivery Card component', () => {
  const mockWarehouseId = '20';
  const mockItemQuantity = 3;
  const mockRadioGroupName = 'delivery-card-1';
  const mockDeliveryList = [
    {
      value: DeliveryMethod.RO_PULL_SHIFT,
      title: 'RO - Pull Shift Today',
      deliveryDays: 1,
      hasOutboundAlert: true,
    },
    {
      value: DeliveryMethod.FEDEX,
      title: 'Fedex Express Shipment',
      deliveryDays: 2,
      hasOutboundAlert: false,
    },
  ];
  it('Should render the Delivery Card component with the primary texts and button', () => {
    render(
      <DeliveryCard
        warehouseId={mockWarehouseId}
        isPrimary
        itemQuantity={mockItemQuantity}
        radioGroupName={mockRadioGroupName}
        deliveryList={mockDeliveryList}
      />
    );
    expect(screen.getByTestId('st-card')).toBeDefined();
    expect(screen.getByTestId('st-button-st-actionable')).toBeDefined();
    expect(screen.getByText('DeliveryCard.DC - DeliveryCard.Primary')).toBeDefined();
  });

  const mockItemQuantityOne = 1;
  it('Should render the word "Item" instead of "Items", when there is only one item', () => {
    render(
      <DeliveryCard
        warehouseId={mockWarehouseId}
        itemQuantity={mockItemQuantityOne}
        radioGroupName={mockRadioGroupName}
        deliveryList={mockDeliveryList}
      />
    );
    expect(screen.getByText('DeliveryCard.Item')).toBeDefined();
  });

  const mockDeliveryListOneDay = [
    {
      value: DeliveryMethod.FEDEX,
      title: 'Fedex Express Shipment',
      deliveryDays: 1,
      hasOutboundAlert: false,
    },
  ];
  it('Should render the word "Day" instead of "Days", when there is only one item', () => {
    render(
      <DeliveryCard
        warehouseId={mockWarehouseId}
        itemQuantity={mockItemQuantity}
        radioGroupName={mockRadioGroupName}
        deliveryList={mockDeliveryListOneDay}
      />
    );
    expect(screen.getByText('DeliveryCard.ArrivesIn DeliveryCard.Day')).toBeDefined();
  });
});
