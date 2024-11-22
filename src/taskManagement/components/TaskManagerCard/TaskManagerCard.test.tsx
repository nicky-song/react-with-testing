/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { render, screen } from '@testing-library/react';
import { TaskManagerCard } from './TaskManagerCard';

describe('TaskManagerCard Component', () => {
  const MockData = {
    id: 1,
    name: 'Kboman',
    detailText: 'Lexical Technologies',
  };
  test('Should render the TaskManagerCard component with username Kboman', () => {
    render(
      <TaskManagerCard
        name={MockData.name}
        id={MockData.id}
        onClickAssignTask={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(screen.getByText(MockData.name)).toBeDefined();
  });
  test('Should render the TaskManagerCard component with detailText Lexical Technologies', () => {
    render(
      <TaskManagerCard
        name={MockData.detailText}
        id={MockData.id}
        onClickAssignTask={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(screen.getByText(MockData.detailText)).toBeDefined();
  });
});
