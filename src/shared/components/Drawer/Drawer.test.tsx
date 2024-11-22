/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Drawer } from './Drawer';
import { KEY } from '@shared/constants/keyConstants';

describe('Drawer component', () => {
  const mockText = 'Mock Content';
  const mockAction = vi.fn();

  it('Should render the Drawer component correctly', async () => {
    render(
      <Drawer
        size="medium"
        position="left"
        show={true}
        handleClose={mockAction}
        headerTitle="title"
        headerDescription="header"
        primaryButtonText="primary"
        secondaryButtonText="secondary"
        nextLinkText="next"
        previousLinkText="previous"
        primaryButtonHandler={mockAction}
        secondaryButtonHandler={mockAction}
        previousButtonHandler={mockAction}
        nextButtonHandler={mockAction}
      >
        <button>{mockText}</button>
      </Drawer>
    );
    const drawer = screen.getByText(mockText);
    expect(drawer).toBeDefined();
    expect(screen.getByText('title')).toBeDefined();
    expect(screen.getByText('header')).toBeDefined();
    expect(screen.getByText('primary')).toBeDefined();
    expect(screen.getByText('next')).toBeDefined();
    expect(screen.getByText('previous')).toBeDefined();

    const Element = screen.getByTestId('st-drawer');
    const leftFooter = Element.querySelectorAll('[class*="_drawer__footer-left"]');
    const rightFooter = Element.querySelectorAll('[class*="_drawer__footer-right"]');
    const previousbutton = leftFooter[0].firstChild as HTMLButtonElement;
    const primarybutton = rightFooter[0].firstChild as HTMLButtonElement;
    const secondarybutton = rightFooter[0].childNodes[1] as HTMLButtonElement;
    const nextbutton = rightFooter[0].lastChild as HTMLButtonElement;

    await waitFor(() => {
      previousbutton.click();
      primarybutton.click();
      secondarybutton.click();
      nextbutton.click();
    });

    expect(mockAction).toHaveBeenCalledTimes(4);

    await waitFor(() => {
      act(() => {
        fireEvent.keyDown(drawer, { key: KEY.ESCAPE, code: KEY.ESCAPE, keyCode: 27, charCode: 27 });
      });
    });

    expect(mockAction).toHaveBeenCalled();
  });

  it('Should render the Drawer component correctly with small variant', async () => {
    render(
      <Drawer
        size="small"
        position="right"
        show={true}
        handleClose={mockAction}
        headerTitle="title"
        headerDescription="header"
        primaryButtonText="primary"
        secondaryButtonText="secondary"
        primaryButtonHandler={mockAction}
        secondaryButtonHandler={mockAction}
      >
        <button>{mockText}</button>
      </Drawer>
    );
    const drawer = screen.getByText(mockText);
    expect(drawer).toBeDefined();
    expect(screen.getByText('title')).toBeDefined();
    expect(screen.getByText('header')).toBeDefined();
    expect(screen.getByText('primary')).toBeDefined();

    await waitFor(() => {
      act(() => {
        fireEvent.keyDown(drawer, { key: KEY.ESCAPE, code: KEY.ESCAPE, keyCode: 27, charCode: 27 });
      });
    });

    expect(mockAction).toHaveBeenCalled();
  });
});
