/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';
import { DetailsSection } from './DetailsSection';
import { DetailRow } from './DetailsSection.types';

describe('Details Section Component component', () => {
  const storeDetails: DetailRow[] = [
    { label: 'Warehouse', text: '20' },
    { label: 'Store Number', text: '000357' },
    { label: 'Store Type', text: 'Megahub' },
    { label: 'Customer Number', text: '6806-4' },
    { label: 'Phone Number', text: '(826) 263-7769' },
    { label: 'Address', text: 'Av Simon Bolivar Montemorelos, MX' },
  ];

  const mockHeader = 'Store Details';
  const mockLoadingView = <>hello</>;

  it('Should render Store Details', () => {
    render(<DetailsSection header={mockHeader} rows={storeDetails} />);
    expect(screen.getByTestId('row-item-details').childNodes).toHaveLength(storeDetails.length);
    expect(screen.getByText(mockHeader)).toBeDefined();
  });

  it('Should render Store Details with loading state when given', () => {
    render(<DetailsSection header={mockHeader} rows={storeDetails} loading={mockLoadingView} />);
    expect(screen.queryByTestId('row-item-details')).toBeNull();
    expect(screen.getByText(mockHeader)).toBeDefined();
    expect(screen.getByText('hello')).toBeDefined();
  });
});
