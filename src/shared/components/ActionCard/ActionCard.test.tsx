/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { ActionCard } from './ActionCard';

describe('Action Card Component', () => {
  const handleClick = (data: string) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };
  const actionCard = {
    title: 'Action1',
    description: 'This is the test action',
    isDisabled: false,
    searchValue: '1',
    onClickHandler: handleClick,
  };

  const actionCardDisabled = {
    title: 'Action1',
    description: 'This is the test action',
    isDisabled: true,
    searchValue: '1',
    onClickHandler: handleClick,
  };

  it('should render the Action card properly', () => {
    render(
      <ActionCard
        title={actionCard.title}
        description={actionCard.description}
        searchValue={actionCard.searchValue}
        onClickHandler={actionCard.onClickHandler}
        isDisabled={actionCard.isDisabled}
      />
    );
    expect(screen.getByText(actionCard.title)).toBeDefined();
    expect(screen.getByText(actionCard.description)).toBeDefined();
    const Element = screen.queryByRole('button') as HTMLInputElement;
    expect(Element.querySelectorAll('[class*="disabled"]').length).toBe(0);
    expect(Element.querySelectorAll('[class*="_icon"]').length).toBe(1);
    fireEvent.click(Element);
  });

  it('should render the Action card properly in disabled mode', () => {
    render(
      <ActionCard
        title={actionCardDisabled.title}
        description={actionCardDisabled.description}
        searchValue={actionCardDisabled.searchValue}
        onClickHandler={actionCardDisabled.onClickHandler}
        isDisabled={actionCardDisabled.isDisabled}
      />
    );
    expect(screen.getByText(actionCard.title)).toBeDefined();
    expect(screen.getByText(actionCard.description)).toBeDefined();
    const Element = screen.queryByRole('button') as HTMLInputElement;
    expect(Element.querySelectorAll('[class*="disabled"]').length).toBe(3);
    expect(Element.querySelectorAll('[class*="_icon"]').length).toBe(1);
  });
});
