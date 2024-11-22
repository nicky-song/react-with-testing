/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';
import { WaveContainer } from './WaveContainer';
import { WaveData } from './WaveContainer.types';
import { StatusVariants } from '@shared/components/StatusBadge/StatusBadge.types';
import { MemoryRouter } from 'react-router-dom';
import dayjs from 'dayjs';

describe('Wave Container Component', () => {
  const mockDateToday = dayjs().startOf('day').add(10, 'hour');

  const mockWave = 'Wave 1A';

  const mockToday: WaveData = {
    id: '1',
    date: mockDateToday.toDate(),
    status: StatusVariants.NOT_STARTED,
    statusText: 'Not Started',
    wave: mockWave,
    storeCount: 0,
    storeMax: 70,
  };
  const mockPastDue: WaveData = {
    id: '2',
    date: mockDateToday.subtract(1, 'day').toDate(),
    status: StatusVariants.NOT_STARTED,
    statusText: 'Not Started',
    wave: mockWave,
    storeCount: 0,
    storeMax: 70,
  };
  const mockUpcoming: WaveData = {
    id: '3',
    date: mockDateToday.add(1, 'day').toDate(),
    status: StatusVariants.NOT_STARTED,
    statusText: 'Not Started',
    wave: mockWave,
    storeCount: 0,
    storeMax: 70,
  };

  const upcomingTitleText = 'Upcoming';
  const pastDueTitleText = 'You have stores that are past due';
  const todayTitleText = 'Today';

  it('Should render the Wave Container with one card in Today group', async () => {
    render(
      <MemoryRouter>
        <WaveContainer data={[mockToday]} />
      </MemoryRouter>
    );

    expect(screen.queryByText(todayTitleText)).toBeDefined();
    expect(screen.queryByText(pastDueTitleText)).toBeNull();
    expect(screen.queryByText(upcomingTitleText)).toBeNull();

    expect(screen.getAllByTestId('st-card')).toHaveLength(1);
  });

  it('Should render the Wave Container with one card in Past Due group', async () => {
    render(
      <MemoryRouter>
        <WaveContainer data={[mockPastDue]} />
      </MemoryRouter>
    );

    expect(screen.queryByText(pastDueTitleText)).toBeDefined();
    expect(screen.queryByText(todayTitleText)).toBeNull();
    expect(screen.queryByText(upcomingTitleText)).toBeNull();

    expect(screen.getAllByTestId('st-card')).toHaveLength(1);
  });

  it('Should render the Wave Container with one card in Upcoming group', async () => {
    render(
      <MemoryRouter>
        <WaveContainer data={[mockUpcoming]} />
      </MemoryRouter>
    );

    expect(screen.queryByText(upcomingTitleText)).toBeDefined();
    expect(screen.queryByText(todayTitleText)).toBeNull();
    expect(screen.queryByText(pastDueTitleText)).toBeNull();

    expect(screen.getAllByTestId('st-card')).toHaveLength(1);
  });

  it('Should render the Wave Container with Waves', async () => {
    render(
      <MemoryRouter>
        <WaveContainer data={[mockToday, mockPastDue, mockUpcoming]} />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('st-card')).toHaveLength(3);
    expect(screen.getAllByText(mockWave)).toHaveLength(3);
  });

  it('Should render the Wave Container with Dates instead of waves', async () => {
    render(
      <MemoryRouter>
        <WaveContainer data={[mockToday, mockPastDue, mockUpcoming]} withWaveDisplay={false} />
      </MemoryRouter>
    );

    const parents = screen.getAllByTestId('default-sorted-cards') as HTMLElement[];

    parents.forEach((parent) => {
      const children = parent.querySelectorAll('div[data-testid="st-card"]');
      expect(children.length).toBe(3);
    });
  });

  it('Should render the Wave Container with sort by date', () => {
    render(
      <MemoryRouter>
        <WaveContainer data={[mockToday, mockPastDue, mockUpcoming]} isDefaultSort={false} />
      </MemoryRouter>
    );

    const parents = screen.getAllByTestId('date-sorted-cards') as HTMLElement[];

    parents.forEach((parent) => {
      const children = parent.querySelectorAll('div[data-testid="st-card"]');
      expect(children.length).toBe(3);
    });
  });
});
