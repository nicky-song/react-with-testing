/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';
import { CommentCard } from './CommentCard';

describe('Comment Card Component', () => {
  const mockComment = 'The best I have ever had';
  const mockUsername = 'billybob';
  const mockTimestamp = new Date(2004, 1, 11);
  const mockTimestampString = '11/02/2004 00:00';

  it('Should render comment card', () => {
    render(<CommentCard comment={mockComment} username={mockUsername} timestamp={mockTimestamp} />);
    expect(screen.getByText(mockComment)).toBeDefined();
    expect(screen.getByText(mockUsername)).toBeDefined();
    expect(screen.getByText(mockTimestampString)).toBeDefined();
  });
});
