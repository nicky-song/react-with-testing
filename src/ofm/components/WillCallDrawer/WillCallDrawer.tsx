/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Drawer } from '@shared/components/Drawer/Drawer';

import * as T from './WillCallDrawer.types';
import {
  FormControl,
  TextField,
  View,
  ExclamationCircle,
  Modal,
  Button,
  Text,
  IconError,
  useDebounce,
} from '@az/starc-ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { DeliveryMethod } from '@ofm/constants/constants';
import { useCreateWillCall } from '@ofm/services/hooks/useCreateWillCall';
import { useGetProducts } from '@ofm/services/hooks/useGetProducts';
import { useGetStoreById } from '@ofm/services/hooks/useGetStoreById';
import { ProductType, WillCallBodyType, WillCallFormData } from '@ofm/types/types';
import { mapWillCallDetailsTableRows } from '@ofm/utils/table/tableUtils';
import { addPadding, getFormInputError, isButtonDisabled } from '@ofm/utils/utils';
import {
  DeliveryChangeValue,
  DeliveryCardProps,
} from '@shared/components/DeliveryCard/Delivery.types';
import { DeliveryCard } from '@shared/components/DeliveryCard/DeliveryCard';
import { DetailsSection } from '@shared/components/DetailsSection/DetailsSection';
import { EmptyState } from '@shared/components/EmptyState/EmptyState';
import { DetailsSectionSkeleton } from '@shared/components/Skeletons/DetailsSectionSkeleton';
import { InputSkeleton } from '@shared/components/Skeletons/InputSkeleton';
import { WillCallRowTypes, TableSorting } from '@shared/components/Table/Table.types';
import {
  TableStylingVariants,
  WILL_CALL_TABLE_COLUMNS,
} from '@shared/components/Table/tableConstants';
import {
  DEBOUNCE_TIMER,
  PAGE_SIZE,
  DEFAULT_PAGE,
  MAX_TEXTFIELD_LENGTH,
  ID_PADDINGS,
} from '@shared/constants/constants';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import s from './WillCallDrawer.module.scss';
import { WillCallSearch } from '../WillCallSearch/WillCallSearch';
import { WillCallTableModal } from '../WillCallTableModal/WillCallTableModal';
import { Table } from '@shared/components/Table/Table';
import { EmptyPage } from '@shared/components/EmptyPage/EmptyPage';
import { NameSchema } from '@ofm/schemas/willCallSchema';

type WillCallRowsByWarehouseType = {
  [warehouseId: string]: WillCallRowTypes[];
};

type DeliveryOptionsByWarehouseType = {
  [warehouseId: string]: DeliveryMethod;
};

export const WillCallDrawer = ({
  title,
  showDrawer,
  setShowDrawer,
  setShowPreviousDrawer,
  storeId,
  setSearchStoreId,
}: T.Props) => {
  /* State variables */
  const [willCallRows, setWillCallRows] = useState<WillCallRowTypes[]>([]);
  const [shouldShowDeliveryOptions, setShouldShowDeliveryOptions] = useState<boolean>(false);
  const [deliveryOptionsByWarehouse, setDeliveryOptionsByWarehouse] =
    useState<DeliveryOptionsByWarehouseType>({});
  const [shouldShowWillCallModal, setShouldShowWillCallModal] = useState<boolean>(false);
  const [shouldShowCancelModal, setShouldShowCancelModal] = useState<boolean>(false);
  const [willCallModalRows, setWillCallModalRows] = useState<WillCallRowTypes[]>([]);
  const [willCallModalTitle, setWillCallModalTitle] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  /* Queries and Constants */
  const { t } = useTranslation();
  const {
    storeData: storeDetails,
    isLoading: isStoreLoading,
    isError: isStoreError,
  } = useGetStoreById(storeId, !!storeId && showDrawer);

  const {
    watch,
    reset,
    register,
    getValues,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<WillCallFormData>({
    resolver: zodResolver(NameSchema),
  });

  const { mutateCreateWillCall } = useCreateWillCall();

  // Keeps track of all current will call table items by warehouse Id
  const willCallRowsByWarehouse: WillCallRowsByWarehouseType = {};
  const debouncedValue = useDebounce(searchValue, DEBOUNCE_TIMER);

  const {
    productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
    refetch,
  } = useGetProducts(
    {
      searchTerms: debouncedValue,
    },
    false
  );

  // Gets the object information for each product
  willCallRows.forEach((row) => {
    const currentRowWarehouse = row.selectedWarehouse.warehouseId;
    const currentRowsBySelectedWarehouse = willCallRowsByWarehouse[currentRowWarehouse];
    willCallRowsByWarehouse[currentRowWarehouse] = currentRowsBySelectedWarehouse
      ? [...currentRowsBySelectedWarehouse, row]
      : [row];
  });

  /**
   * This constant adds the input fields for the caller and store number
   * inside the DetailsSection component
   */
  const storeDetailRows = storeDetails
    ? [
        {
          label: t('WillCallDrawer.CallerName'),
          text: '',
          isMandatory: true,
          children: (
            <FormControl hasError={!!errors.fullName}>
              <TextField
                id="full-name"
                variant="alt"
                label={t('WillCallDrawer.InitialsOrFullName')}
                defaultValue=""
                inputAttributes={register('fullName')}
              />
              <FormControl.Error className={s['will-call-drawer__error-messages']}>
                {getFormInputError(
                  errors.fullName?.type || t('Form.InputError'),
                  MAX_TEXTFIELD_LENGTH
                )}
              </FormControl.Error>
            </FormControl>
          ),
        },
        {
          label: t('WillCallDrawer.CallerStoreNumber'),
          text: '',
          isMandatory: true,
          children: (
            <FormControl disabled={true}>
              <TextField id="store-id" defaultValue={addPadding(storeId, ID_PADDINGS.STORE)} />
            </FormControl>
          ),
        },
        { label: t('WillCallDrawer.PrimaryDC'), text: storeDetails.primaryDc.toString() },
        { label: t('WillCallDrawer.PhoneNumber'), text: storeDetails.phoneNumber },
        {
          label: t('WillCallDrawer.StoreAddress'),
          text: storeDetails.addressLine2
            ? `${storeDetails.addressLine1}, ${storeDetails.addressLine2}`
            : storeDetails.addressLine1,
        },
      ]
    : [];

  const StoreDetailsLoadingView = (
    <View>
      <View padding={[0, 4, 4, 0]}>
        <InputSkeleton numberOfItems={2} />
      </View>
      <DetailsSectionSkeleton items={3} shouldHideHeader={true} />
    </View>
  );

  /* Functions */
  const buildDeliveryOptions = () => {
    return Object.entries(willCallRowsByWarehouse).map(([warehouseId, rows]) => {
      const deliveryOptionTemplate = {
        warehouseId: warehouseId,
        isPrimary: false,
        itemQuantity: rows.length,
        radioGroupName: `delivery-card-${warehouseId}`,
        deliveryList: [
          {
            value: DeliveryMethod.CROSS_DOCK,
            title: t('WillCall.DeliveryMethod.CrossDock'),
            deliveryDays: 2,
            hasOutboundAlert: false,
          },
        ],
      };

      if (storeDetails?.primaryDc === warehouseId) {
        return {
          ...deliveryOptionTemplate,
          isPrimary: true,
          deliveryList: [
            {
              value: DeliveryMethod.RO_PULL_SHIFT,
              title: t('WillCall.DeliveryMethod.RoShiftToday'),
              deliveryDays: 1,
              hasOutboundAlert: true,
            },
            {
              value: DeliveryMethod.RO_PULL_SHIFT_DAYS,
              title: t('WillCall.DeliveryMethod.RoShiftXDays'),
              deliveryDays: 2,
              hasOutboundAlert: false,
            },
            {
              value: DeliveryMethod.FEDEX,
              title: t('WillCall.DeliveryMethod.Fedex'),
              hasOutboundAlert: false,
            },
          ],
        };
      }
      return deliveryOptionTemplate;
    });
  };

  const handleValueChange = (option: DeliveryChangeValue) => {
    setDeliveryOptionsByWarehouse({
      ...deliveryOptionsByWarehouse,
      [option.warehouseId.toString()]: option.deliveryOption,
    });
  };

  const handleSearchItemClick = (item: ProductType) => {
    if (!willCallRows.some((row) => row.sku === item.sku)) {
      const itemWarehouseDetails = item.warehouseDetails.map((warehouseDetail) => {
        const warehouseName =
          warehouseDetail.warehouseName ||
          t('WillCall.Item.DCName', { warehouseId: warehouseDetail.warehouseId });
        return {
          ...warehouseDetail,
          label:
            warehouseDetail.warehouseId === storeDetails?.primaryDc
              ? t('WillCall.Item.PrimaryDC', { dc: warehouseName })
              : warehouseName,
          value: warehouseName,
          warehouseName,
        };
      });
      const newWillCallRow: WillCallRowTypes = {
        ...item,
        warehouseDetails: itemWarehouseDetails,
        // Selects the first warehouse where the item can be found
        selectedWarehouse: itemWarehouseDetails[0],
        quantityCurrent: 0,
        numberOfPacksCurrent: 0,
        isRowBeingEdited: false,
      };
      setWillCallRows([...willCallRows, newWillCallRow]);
    }
  };

  const handleOpenWillCallModal = (warehouseId: string) => {
    const filteredWillCallRows = willCallRows.filter(
      (row) => row.selectedWarehouse.warehouseId === warehouseId
    );
    setWillCallModalRows(filteredWillCallRows);
    setWillCallModalTitle(filteredWillCallRows?.[0].selectedWarehouse.label);
    setShouldShowWillCallModal(true);
  };

  const handleCloseWillCallModal = () => {
    setWillCallRows(
      willCallRows.map((order) => {
        return { ...order, isRowBeingEdited: false };
      })
    );
    setShouldShowWillCallModal(false);
  };

  const onSort = (_sorting: TableSorting[]) => {
    // TODO BFF INTEGRATION FOR SORTING
  };

  const createWillCall = () => {
    const callerName = getValues('fullName');
    const haveWillCallParams = !!(
      storeDetails?.storeId &&
      Object.keys(willCallRowsByWarehouse).length &&
      callerName &&
      Object.keys(deliveryOptionsByWarehouse)
    );
    if (haveWillCallParams) {
      const newWillCall: WillCallBodyType = {
        callerName: callerName,
        storeNumber: storeDetails.storeId,
        items: willCallRows.map((row) => ({
          sku: row.sku,
          description: row.description,
          partNumber: row.partNumber,
          status: row.status,
          pack: row.pack,
          packs: row.numberOfPacksCurrent,
          quantity: row.quantityCurrent,
          warehouseId: row.selectedWarehouse.warehouseId,
          deliveryMethod: deliveryOptionsByWarehouse[row.selectedWarehouse.warehouseId],
        })),
      };

      mutateCreateWillCall(newWillCall, {
        onSuccess: () => {
          closeWillCallDrawer();
        },
      });
    }
  };

  // Handles the primary button logic, in case it should be continue or confirm and bill
  const primaryButtonHandler = () => {
    if (errors.fullName) {
      return;
    }

    if (!shouldShowDeliveryOptions) {
      setShouldShowDeliveryOptions(true);
      return;
    }

    createWillCall();
  };

  const backButtonHandler = () => {
    if (shouldShowDeliveryOptions) {
      setShouldShowDeliveryOptions(false);
      setDeliveryOptionsByWarehouse({});
      return;
    }
    closeWillCallDrawer();
  };

  const cancelButtonHandler = () => {
    setShouldShowCancelModal(true);
  };

  const deleteItemsHandler = (selectedRows: string[]) => {
    if (willCallRows.length) {
      setWillCallRows(willCallRows.filter((_, index) => !selectedRows.includes(index.toString())));
    }
  };

  const changeModalRowHandler = (row: WillCallRowTypes) => {
    setWillCallRows(willCallRows.map((oldRow) => (row.sku === oldRow.sku ? row : oldRow)));
  };

  const deleteModalRowHandler = (row: WillCallRowTypes, shouldCloseModal?: boolean) => {
    setWillCallRows(willCallRows.filter((currentRow) => currentRow.sku !== row.sku));
    if (shouldCloseModal) {
      setShouldShowWillCallModal(false);
    }
  };

  const closeWillCallDrawer = () => {
    setShowDrawer(false);
    setShouldShowDeliveryOptions(false);
    setDeliveryOptionsByWarehouse({});
    setShowPreviousDrawer && setShowPreviousDrawer(false);
    setShouldShowWillCallModal(false);
    setWillCallRows([]);
    setShouldShowCancelModal(false);
    setSearchStoreId && setSearchStoreId('');
    reset();
    clearErrors();
  };

  const handleDataChange = (newWillCallOrder: WillCallRowTypes) => {
    setWillCallRows(
      willCallRows.map((order) => (order.sku === newWillCallOrder.sku ? newWillCallOrder : order))
    );
  };

  const deliveryOptions: DeliveryCardProps[] = buildDeliveryOptions();
  const tableRows = mapWillCallDetailsTableRows(willCallRows, handleDataChange);
  const willCallSearchItems: ProductType[] = productsData || [];

  /* Hooks */
  // Calls the refetch in case the search input has a valid value
  useEffect(() => {
    if (debouncedValue !== undefined && !isProductsError) {
      refetch();
    }
  }, [debouncedValue, isProductsError, refetch]);

  useEffect(() => {
    if (shouldShowDeliveryOptions && willCallRows.length === 0) {
      setShouldShowDeliveryOptions(false);
      setDeliveryOptionsByWarehouse({});
      setShouldShowWillCallModal(false);
    }
  }, [shouldShowDeliveryOptions, willCallRows]);

  if (isStoreError) {
    return (
      <Drawer
        show={showDrawer}
        handleClose={() => setShowDrawer(false)}
        size="custom"
        position="right"
        removeInnerPadding
      >
        <EmptyPage
          title={t('Errors.Page.Title')}
          description={t('Errors.Drawer.Description', { service: t('Services.Store') })}
          buttonText={t('Errors.Drawer.ButtonText')}
          onClick={() => setShowDrawer(false)}
          icon={IconError}
        />
      </Drawer>
    );
  } else {
    return (
      <>
        <Drawer
          show={showDrawer}
          handleClose={() => setShouldShowCancelModal(true)}
          size="custom"
          removeInnerPadding
          position="right"
          headerTitle={title}
          className={s['will-call-drawer']}
          primaryButtonText={
            shouldShowDeliveryOptions
              ? t('WillCallDrawer.ConfirmAndBill')
              : t('WillCallDrawer.ContinueToDelivery')
          }
          primaryButtonHandler={primaryButtonHandler}
          shouldPrimaryButtonSubmit={true}
          handleSubmit={handleSubmit}
          isPrimaryButtonDisabled={
            isButtonDisabled(watch('fullName')) ||
            (shouldShowDeliveryOptions
              ? deliveryOptions.length !== Object.keys(deliveryOptionsByWarehouse).length
              : !willCallRows.length)
          }
          secondaryButtonText={t('WillCallDrawer.Cancel')}
          isSecondaryButtonDisabled={false}
          secondaryButtonHandler={cancelButtonHandler}
          previousLinkText={t('WillCallDrawer.Back')}
          previousButtonHandler={backButtonHandler}
          previousButtonVariant="ghost"
        >
          <View direction="row" width="100%" height="100%" wrap={false}>
            <View.Item
              columns={{ s: 4, m: 4, l: 4, xl: 3 }}
              className={s['will-call-drawer__left-column']}
              attributes={{
                'data-testid': 'will-call-left-column',
              }}
            >
              <DetailsSection
                header={t('WillCallDrawer.StoreDetails')}
                rows={storeDetailRows}
                loading={isStoreLoading && StoreDetailsLoadingView}
              />
            </View.Item>
            <View.Item
              grow
              className={s['will-call-drawer__right-column']}
              attributes={{
                'data-testid': 'will-call-right-column',
              }}
            >
              {shouldShowDeliveryOptions ? (
                <View direction="column" padding={6} width="100%" height="100%">
                  <View gap={2} padding={[0, 0, 6, 0]}>
                    <Text color="primary" size="100" weight="bold" as="h4">
                      {t('WillCallDrawer.ChooseDeliveryOptionDC')}
                    </Text>
                    <Text color="400" size="100">
                      {t('WillCallDrawer.NumOfShipments', {
                        count: Object.keys(willCallRowsByWarehouse).length,
                      })}
                    </Text>
                  </View>
                  <View direction="row" gap={2} justify="space-between">
                    {deliveryOptions.map((delivery) => (
                      <DeliveryCard
                        onValueChange={handleValueChange}
                        onButtonClick={handleOpenWillCallModal}
                        warehouseId={delivery.warehouseId}
                        isPrimary={delivery.isPrimary}
                        itemQuantity={delivery.itemQuantity}
                        radioGroupName={delivery.radioGroupName}
                        deliveryList={delivery.deliveryList}
                        key={delivery.warehouseId}
                      />
                    ))}
                    <WillCallTableModal
                      isOpen={shouldShowWillCallModal}
                      onClose={handleCloseWillCallModal}
                      dcName={willCallModalTitle}
                      willCallRowsData={willCallModalRows}
                      handleRowChange={changeModalRowHandler}
                      handleRowDelete={deleteModalRowHandler}
                    />
                  </View>
                </View>
              ) : (
                <View direction="column" padding={6} gap={4} height="100%">
                  <Text variant="subtitle-bold" size="100">
                    {t('WillCallDrawer.AddItems')}
                  </Text>
                  <Text variant="main-body" color="500">
                    {t('WillCallDrawer.SpecifyQuantityDC')}
                  </Text>
                  <WillCallSearch
                    id="will-call-search"
                    isSearchLoading={isProductsLoading}
                    onItemSearch={setSearchValue}
                    onWillCallItemClick={handleSearchItemClick}
                    options={willCallSearchItems}
                    label={t('WillCall.Search')}
                  />
                  <Table
                    styleVariant={TableStylingVariants.DETAILS}
                    columns={WILL_CALL_TABLE_COLUMNS}
                    rows={tableRows}
                    isPaginated={true}
                    pageSize={PAGE_SIZE}
                    defaultPage={DEFAULT_PAGE}
                    isCreditItem={false}
                    isCheckboxTable={true}
                    totalPages={Math.ceil(willCallRows.length / PAGE_SIZE)}
                    onSort={onSort}
                    showTotalRows={true}
                    isFullHeight={!!willCallRows.length}
                    onClick={deleteItemsHandler}
                  />
                  {isProductsError ? (
                    <EmptyState
                      svg={ExclamationCircle}
                      subtitle={t('Errors.Page.Title')}
                      text={t('Errors.Search.Description', {
                        items: t('Services.Products'),
                      })}
                    />
                  ) : (
                    <>
                      {!willCallRows.length && (
                        <EmptyState
                          svg={ExclamationCircle}
                          subtitle={t('WillCallDrawer.NoItems')}
                          text={t('WillCallDrawer.ItemSearchBar')}
                        />
                      )}
                    </>
                  )}
                </View>
              )}
            </View.Item>
          </View>
        </Drawer>
        <Modal
          className={s['cancel-modal']}
          open={shouldShowCancelModal}
          onClose={() => setShouldShowCancelModal(false)}
        >
          <View gap={1} padding={[0, 0, 6, 0]}>
            <Text variant="display-3" fontFamily="body">
              {t('WillCallDrawer.AreYouSure')}
            </Text>
            <Text size="100" lineHeight="125">
              {t('WillCallDrawer.ChangesNotSaved')}
            </Text>
          </View>
          <View direction="row" justify="end" gap={4}>
            <Button
              variant="secondary"
              size="large"
              onClick={() => setShouldShowCancelModal(false)}
            >
              {t('WillCallDrawer.Stay')}
            </Button>
            <Button variant="primary" size="large" onClick={closeWillCallDrawer}>
              {t('WillCallDrawer.Exit')}
            </Button>
          </View>
        </Modal>
      </>
    );
  }
};
