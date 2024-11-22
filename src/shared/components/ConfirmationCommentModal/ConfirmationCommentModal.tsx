/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { createContext, useContext } from 'react';
import { Button, Close, Icon, Modal, Text, View, classNames } from '@az/starc-ui';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ACTIONS } from '@shared/constants/constants';

import * as T from './ConfirmationCommentModal.types';
import s from './ConfirmationCommentModal.module.scss';

// This context sends the onClose parent prop into the children
const CloseContext = createContext<{
  onClose?: () => void;
}>({});

const Header = ({ children, className }: T.SectionProps) => {
  const { onClose } = useContext(CloseContext);

  return (
    <header className={classNames(s['confirmation-comment-modal__header'], className)}>
      <View direction="column">{children}</View>
      <Button
        variant="ghost"
        onClick={onClose}
        className={classNames(s['close-icon'], s['confirmation-comment-modal__close-button'])}
      >
        <Icon svg={Close} />
      </Button>
    </header>
  );
};

const Body = ({ children, className }: T.SectionProps) => {
  return (
    <View className={classNames(s['confirmation-comment-modal__form'], className)}>{children}</View>
  );
};

const Actions = ({
  children,
  className,
  cancelText,
  actionText,
  hideCancel = false,
  disabled = false,
  onAction,
}: T.ActionProps) => {
  const { onClose } = useContext(CloseContext);

  return (
    <footer className={className}>
      <View gap={4} direction="row" justify="end" padding={[6, 0, 0, 0]}>
        {children}
        {!hideCancel && cancelText && (
          <Button
            variant="secondary"
            attributes={{ style: { width: 'fit-content' } }}
            onClick={onClose}
          >
            <Text>{cancelText}</Text>
          </Button>
        )}
        <Button
          variant="primary"
          attributes={{ style: { width: 'fit-content' } }}
          disabled={disabled}
          onClick={onAction}
          type="submit"
        >
          <Text>{actionText}</Text>
        </Button>
      </View>
    </footer>
  );
};

/**
 * Since the useForm is defined here, this component passes the different props to the children,
 * which are the Header, Body and Actions inner components. Inside the children is where we are
 * going to be able to call the different useForm constants. The form validation happens here,
 * inside the onSubmit function
 */
export const ConfirmationCommentModal = ({
  schema,
  isOpen = false,
  children,
  onClose,
  onAction,
}: T.Props) => {
  type FormData = z.infer<typeof schema>;

  /* Hooks */
  const {
    reset,
    watch,
    control,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  /* Functions */
  const resetForm = (status: string | null) => {
    reset();
    clearErrors();
    onClose(status);
  };

  const onSubmit = (data: FormData) => {
    resetForm(ACTIONS.SUBMIT);
    onAction && onAction(data);
  };

  const handleOnClose = (status: string) => {
    resetForm(status);
  };

  const contextValue = {
    onClose: () => {
      handleOnClose(ACTIONS.CLOSE);
    },
  };

  return (
    <CloseContext.Provider value={contextValue}>
      <Modal
        open={isOpen}
        onClose={() => handleOnClose(ACTIONS.CLOSE)}
        className={s['confirmation-comment-modal']}
      >
        <View direction="column" justify="space-between">
          <form onSubmit={handleSubmit(onSubmit)}>
            {children({
              control,
              register,
              formState: { errors },
              watch,
              fieldClassName: s['confirmation-comment-modal__input'],
              errorClassName: s['confirmation-comment-modal__error-messages'],
            })}
          </form>
        </View>
      </Modal>
    </CloseContext.Provider>
  );
};

ConfirmationCommentModal.Header = Header;
ConfirmationCommentModal.Body = Body;
ConfirmationCommentModal.Actions = Actions;
