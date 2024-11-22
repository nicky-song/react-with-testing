/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useTranslation } from 'react-i18next';

import { Modal as StarcModal, View, Text, Actionable, Icon, Button } from '@az/starc-ui';
import { Close } from '@az/starc-ui-icons';

import * as T from './Modal.type';

import Styles from './Modal.module.scss';

export const Modal = ({
  open,
  onClose,
  title,
  subTitle,
  onSuccess,
  primaryBtnText,
  isCancelBtn,
  isPrimaryBtnDisabled,
  children,
  ...restProps
}: T.ModalProps) => {
  /* Constants */
  const { t } = useTranslation();

  return (
    <StarcModal open={open} onClose={onClose} className={Styles['modal']} {...restProps}>
      <View padding={6} direction="row" justify="space-between" className={Styles['modal__header']}>
        <View gap={2}>
          <Text size="175" weight="bold">
            {title}
          </Text>
          {subTitle && <Text>{subTitle}</Text>}
        </View>
        <Actionable onClick={onClose}>
          <Icon svg={Close} />
        </Actionable>
      </View>
      <View padding={6} className={Styles['modal__body']}>
        {children}
      </View>
      <View direction="row" padding={6} justify="end" className={Styles['modal__footer']}>
        {isCancelBtn && (
          <Button variant="secondary" size="large" onClick={onClose}>
            {t('Cancel')}
          </Button>
        )}
        <Button size="large" onClick={onSuccess} disabled={isPrimaryBtnDisabled}>
          {primaryBtnText ? primaryBtnText : t('Save')}
        </Button>
      </View>
    </StarcModal>
  );
};
