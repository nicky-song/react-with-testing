/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { classNames, Drawer as SDrawer, View, Text, Button, Icon } from '@az/starc-ui';
import { DrawerProps, DrawerPropsVariant } from './Drawer.types';
import styles from './Drawer.module.scss';
import '@/index.module.css';
import { ArrowLeft, ArrowRight, Close } from '@az/starc-ui-icons';
import { ButtonSkeleton } from '@shared/components/Skeletons/ButtonSkeleton';

export const Drawer = ({
  show,
  handleClose,
  children,
  size,
  className,
  contentClassName,
  headerTitle,
  headerDescription,
  CustomHeader,
  primaryButtonText,
  secondaryButtonText,
  previousLinkText,
  previousButtonVariant,
  nextLinkText,
  shouldPrimaryButtonSubmit,
  handleSubmit,
  primaryButtonHandler,
  isPrimaryButtonDisabled = false,
  secondaryButtonHandler,
  isSecondaryButtonDisabled = false,
  previousButtonHandler,
  nextButtonHandler,
  removeInnerPadding = false,
  isLoading,
  ...restProps
}: DrawerProps | DrawerPropsVariant) => {
  /* Constants */
  const hasForm = !!(shouldPrimaryButtonSubmit && primaryButtonHandler && handleSubmit);

  return (
    <SDrawer
      {...restProps}
      className={classNames(styles['drawer'], styles[`drawer--${size}`], className)}
      open={show}
      onClose={handleClose}
    >
      <View
        attributes={
          hasForm
            ? {
                onSubmit: handleSubmit(primaryButtonHandler),
              }
            : undefined
        }
        as={hasForm ? 'form' : 'div'}
        className={styles['drawer__form']}
      >
        <View direction="column" height="100%">
          <View className={classNames(styles['drawer__header'])} padding={6}>
            <View
              className={classNames(styles['drawer__header-details'])}
              gap={2}
              direction="column"
              align="start"
            >
              {headerTitle && (
                <Text fontFamily="body" variant="display-3">
                  {headerTitle}
                </Text>
              )}
              {headerDescription && <Text variant="small-body">{headerDescription}</Text>}
              {CustomHeader}
            </View>
            <Button
              onClick={handleClose}
              variant="ghost"
              className={classNames(styles['drawer-icon-button'], styles['drawer__icon-button'])}
            >
              <Icon svg={Close} />
            </Button>
          </View>
          <View
            className={classNames(styles['drawer__content'], contentClassName)}
            direction="column"
            justify="center"
            align="center"
            padding={removeInnerPadding ? 0 : 6}
          >
            {children}
          </View>
          {(primaryButtonText || secondaryButtonText || previousLinkText) && (
            <View
              className={classNames(
                styles['drawer__footer'],
                !primaryButtonText &&
                  !secondaryButtonText &&
                  size === 'small' &&
                  styles['drawer__footer--hide']
              )}
              padding={6}
              direction="row"
              justify={previousButtonHandler ? 'center' : 'end'}
              align="center"
            >
              {size !== 'small' && previousButtonHandler && (
                <View
                  className={classNames(styles['drawer__footer-left'])}
                  direction="column"
                  align="start"
                >
                  <Button
                    variant={previousButtonVariant || 'secondary'}
                    startIcon={<Icon svg={ArrowLeft} color="primary" size={5} />}
                    attributes={{ style: { width: 'fit-content' } }}
                    onClick={previousButtonHandler}
                  >
                    {previousLinkText}
                  </Button>
                </View>
              )}
              <View
                gap={4}
                direction="row"
                justify="end"
                align="center"
                className={classNames(styles['drawer__footer-right'])}
              >
                {isLoading ? (
                  <ButtonSkeleton />
                ) : (
                  <>
                    {secondaryButtonText && (
                      <Button
                        variant="secondary"
                        attributes={{ style: { width: 'fit-content' } }}
                        onClick={secondaryButtonHandler}
                        disabled={isSecondaryButtonDisabled}
                      >
                        {secondaryButtonText}
                      </Button>
                    )}
                  </>
                )}
                {isLoading ? (
                  <ButtonSkeleton />
                ) : (
                  <>
                    {primaryButtonText && (
                      <Button
                        variant="primary"
                        attributes={{ style: { width: 'fit-content' } }}
                        onClick={hasForm ? undefined : primaryButtonHandler}
                        type={hasForm ? 'submit' : undefined}
                        disabled={isPrimaryButtonDisabled}
                      >
                        {primaryButtonText}
                      </Button>
                    )}
                  </>
                )}
                {size !== 'small' && nextButtonHandler && (
                  <Button
                    variant="secondary"
                    endIcon={<Icon svg={ArrowRight} color="primary" size={5} />}
                    attributes={{ style: { width: 'fit-content' } }}
                    onClick={nextButtonHandler}
                  >
                    {nextLinkText}
                  </Button>
                )}
              </View>
            </View>
          )}
        </View>
      </View>
    </SDrawer>
  );
};
