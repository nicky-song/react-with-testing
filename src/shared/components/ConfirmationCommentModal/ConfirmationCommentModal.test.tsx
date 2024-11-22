/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { fireEvent, render, screen } from '@testing-library/react';
import { FormControl, Text, TextField } from '@az/starc-ui';
import { ConfirmationCommentModal } from './ConfirmationCommentModal';
import { EmptySchema } from '@ofm/schemas/confirmationModalSchema';

describe('ConfirmationCommentModal', () => {
  const mockFunction = vi.fn();
  const modalHeader = 'Modal Header';
  const requiredField = 'Required Field';
  const fieldLabel = 'Name';
  const cancelText = 'Cancel';
  const actionText = 'Request';

  beforeEach(() => {
    mockFunction.mockClear();
  });

  it('Component renders correctly when open', () => {
    const { container } = render(
      <ConfirmationCommentModal
        isOpen={true}
        schema={EmptySchema}
        onClose={mockFunction}
        onAction={mockFunction}
      >
        {({ register, formState: { errors } }) => (
          <>
            <ConfirmationCommentModal.Header>
              <Text>{modalHeader}</Text>
            </ConfirmationCommentModal.Header>
            <ConfirmationCommentModal.Body>
              <FormControl hasError={errors.name}>
                <TextField label={fieldLabel} defaultValue="" inputAttributes={register('name')} />
                <FormControl.Error>{errors.name ? requiredField : ''}</FormControl.Error>
              </FormControl>
            </ConfirmationCommentModal.Body>
            <ConfirmationCommentModal.Actions cancelText={cancelText} actionText={actionText} />
          </>
        )}
      </ConfirmationCommentModal>
    );

    expect(container).toBeDefined();
    expect(screen.getByText(modalHeader)).toBeDefined();
    expect(screen.getByText(fieldLabel)).toBeDefined();
    expect(screen.getByText(cancelText)).toBeDefined();
    expect(screen.getByText(actionText)).toBeDefined();
  });

  it(`Validate component actions after render`, async () => {
    render(
      <ConfirmationCommentModal
        isOpen={true}
        schema={EmptySchema}
        onClose={mockFunction}
        onAction={mockFunction}
      >
        {({ register, formState: { errors } }) => (
          <>
            <ConfirmationCommentModal.Header>
              <Text>{modalHeader}</Text>
            </ConfirmationCommentModal.Header>
            <ConfirmationCommentModal.Body>
              <FormControl hasError={errors.name}>
                <TextField label={fieldLabel} defaultValue="" inputAttributes={register('name')} />
                <FormControl.Error>{errors.name ? requiredField : ''}</FormControl.Error>
              </FormControl>
            </ConfirmationCommentModal.Body>
            <ConfirmationCommentModal.Actions cancelText={cancelText} actionText={actionText} />
          </>
        )}
      </ConfirmationCommentModal>
    );

    const buttons = screen.getAllByTestId('st-button-st-actionable');
    for (const button of buttons) {
      fireEvent.click(button);
    }

    expect(mockFunction).toHaveBeenCalledTimes(2);
  });
});
