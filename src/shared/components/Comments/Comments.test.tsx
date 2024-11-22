/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen, waitFor } from '@testing-library/react';
import { Comments } from './Comments';

describe('Comment Action Card Component', () => {
  const props = {
    isOpen: false,
    comments: [
      { comment: 'This is test', username: 'A S', timestamp: new Date(2004, 1, 11) },
      { comment: 'This is test', username: 'A P', timestamp: new Date(2004, 1, 11) },
      { comment: 'This is test', username: 'A D', timestamp: new Date(2004, 1, 11) },
      { comment: 'This is test', username: 'A M', timestamp: new Date(2004, 1, 11) },
      { comment: 'This is test', username: 'A N', timestamp: new Date(2004, 1, 11) },
    ],
    handleCommentSubmit: vi.fn(),
  };
  const mockTimestampString = '11/02/2004 00:00';

  it('Should render comments', async () => {
    render(
      <Comments
        isOpen={props.isOpen}
        comments={props.comments}
        handleCommentSubmit={props.handleCommentSubmit}
      />
    );
    const accordianButton = screen.getByTestId('st-accordion').firstChild as HTMLButtonElement;
    await waitFor(() => {
      accordianButton.click();
    });
    expect(screen.getAllByText('This is test')).toHaveLength(2);
    const showMore = screen.getByTestId('st-link-st-actionable') as HTMLButtonElement;
    await waitFor(() => {
      showMore.click();
    });
    expect(screen.getAllByText('This is test')).toHaveLength(5);

    expect(screen.getAllByText(mockTimestampString)).toHaveLength(5);
  });
});
