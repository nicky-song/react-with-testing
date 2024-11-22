/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Button, Pagination, Store, View } from '@az/starc-ui';
import * as T from './ItemLayout.types';
import { Footer } from '@shared/components/Footer/Footer';
import { CheckBoxCard } from '@shared/components/CheckBoxCard/CheckBoxCard';
import s from './ItemLayout.module.scss';
import { ProgressBar } from '@ofm/components/ProgressBar/ProgressBar';
import { StatusVariants } from '@shared/components/StatusBadge/StatusBadge.types';
import { CardGridSkeleton } from '@shared/components/Skeletons/CardGridSkeleton';
import { EmptyState } from '../EmptyState/EmptyState';
import { useTranslation } from 'react-i18next';

export const ItemLayout = ({
  items,
  selectedItems,
  onItemSelect,
  buttons,
  emptySubtitle,
  emptyText,
  paginationProps,
  itemsInProgress,
  isLoading,
  showProgressSkeleton,
  progress,
  setItemId,
  setShowOrderDetailsDrawer,
}: T.Props) => {
  /* Constants */
  const { t } = useTranslation();
  const hasItems = !!(items && items.length > 0);
  const hasProgress = !!(progress && progress.length > 0);

  if (isLoading) {
    return (
      <View padding={6} justify="start" height="100%">
        <CardGridSkeleton hasProgress={!!progress || showProgressSkeleton} items={8} />
      </View>
    );
  } else {
    return (
      <>
        <View padding={6} height="100%" className="scrollable-section">
          {hasProgress &&
            progress.map((progressProps) => (
              <View key={progressProps.title} padding={[0, 0, 8, 0]}>
                <ProgressBar {...progressProps} />
              </View>
            ))}
          {hasItems ? (
            <View height="inherit" justify="space-between">
              <View as="ul" gap={4} className={s['list']}>
                {items.map((item) => {
                  const isItemInProgress = itemsInProgress?.includes(item.id);
                  const isItemSelected = selectedItems?.includes(item.id);

                  return (
                    <View.Item as="li" key={item.id} className={s['list__item']}>
                      <CheckBoxCard
                        title={item.storeNumber || ''}
                        isChecked={isItemSelected}
                        isCheckboxDisabled={isItemInProgress}
                        onChangeHandler={() => onItemSelect && onItemSelect(item.id)}
                        shouldHideCheckbox={!onItemSelect}
                        statusBadge={
                          isItemInProgress
                            ? {
                                variant: StatusVariants.IN_PROGRESS,
                                text: t('WaveStatus.InProgress'),
                              }
                            : undefined
                        }
                        tag={
                          item.secondaryStatus
                            ? {
                                text: item.secondaryStatus,
                                variant: 'order',
                              }
                            : undefined
                        }
                        onClick={() => {
                          if (setItemId && setShowOrderDetailsDrawer) {
                            setItemId(item.id);
                            setShowOrderDetailsDrawer(true);
                          }
                        }}
                      />
                    </View.Item>
                  );
                })}
              </View>
              {paginationProps && (
                <View justify="center" align="center" padding={[6, 0]}>
                  <Pagination {...paginationProps} />
                </View>
              )}
            </View>
          ) : (
            <>
              {!hasProgress && emptySubtitle && emptyText && (
                <EmptyState subtitle={emptySubtitle} text={emptyText} svg={Store} />
              )}
            </>
          )}
        </View>
        {buttons?.length && progress && (
          <Footer>
            {buttons.map((button) => (
              <Button
                key={button.title}
                attributes={{ style: { width: 'fit-content' } }}
                title={button.title}
                variant={button.variant}
                disabled={button.isDisabled}
                aria-disabled={button.isDisabled}
                onClick={button.clickHandler}
                loading={button.loading}
              >
                {button.title}
              </Button>
            ))}
          </Footer>
        )}
      </>
    );
  }
};
