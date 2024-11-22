/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';
import { ScheduleWeek } from './ScheduleSection.types';
import { ScheduleSection } from './ScheduleSection';
import { generateDateString } from '@ofm/utils/utils';
import dayjs from 'dayjs';
import { EMPTY_VALUE } from '@shared/constants/constants';

describe('Schedule Section component', () => {
  const mockTitle = 'Title';
  const mockSchedule: ScheduleWeek = {
    monday: undefined,
    tuesday: undefined,
    wednesday: undefined,
    thursday: undefined,
    friday: undefined,
    saturday: undefined,
    sunday: undefined,
  };

  const mockDay = {
    time: dayjs('2023-08-21T16:00:00.000Z').toDate(),
    wave: '4A',
  };

  it('Should render the ScheduleSection component with all days undefined', () => {
    render(<ScheduleSection title={mockTitle} schedule={mockSchedule} />);
    expect(screen.getByText(mockTitle)).toBeDefined();
    expect(screen.getAllByText(EMPTY_VALUE)).toHaveLength(7);
  });

  it('Should render the ScheduleSection component with all days except monday undefined', () => {
    render(<ScheduleSection title={mockTitle} schedule={{ ...mockSchedule, monday: mockDay }} />);
    expect(screen.getByText(mockTitle)).toBeDefined();
    expect(screen.getAllByText(EMPTY_VALUE)).toHaveLength(6);
    expect(screen.getByText(generateDateString(mockDay.time))).toBeDefined();
    expect(screen.getByText(mockDay.wave)).toBeDefined();
  });

  it('Should render the ScheduleSection component without displaying waves', () => {
    render(
      <ScheduleSection
        title={mockTitle}
        schedule={{ ...mockSchedule, monday: mockDay }}
        displayWaves={false}
      />
    );
    expect(screen.getByText(mockTitle)).toBeDefined();
    expect(screen.getAllByText(EMPTY_VALUE)).toHaveLength(6);
    expect(screen.getByText(generateDateString(mockDay.time))).toBeDefined();
    expect(screen.queryByText(mockDay.wave)).toBeNull();
  });

  it('Should render the ScheduleSection component with tooltip', () => {
    render(
      <ScheduleSection
        title={mockTitle}
        schedule={mockSchedule}
        tooltipProps={{ headerText: mockTitle }}
      />
    );
    expect(screen.getByText(mockTitle)).toBeDefined();
    expect(screen.getAllByText(EMPTY_VALUE)).toHaveLength(7);
    expect(screen.getByTestId('st-tooltip')).toBeDefined();
  });
});
