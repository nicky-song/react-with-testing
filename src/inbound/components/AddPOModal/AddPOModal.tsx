/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useState } from 'react';
import { Controller } from 'react-hook-form';

import { t } from 'i18next';

import {
  Checkbox,
  Clock,
  DatePicker,
  Divider,
  FormControl,
  Icon,
  Link,
  Radio,
  Select,
  Text,
  TextArea,
  TextField,
  Toggle,
  View,
} from '@az/starc-ui';

import { ConfirmationCommentModal } from '@shared/components/ConfirmationCommentModal/ConfirmationCommentModal';

import { getFormDateError, getFormInputError } from '@ofm/utils/utils';

import { PurchaseOrderSchema } from '@inbound/schemas/purchaseOrderSchema';
import { PO_TYPES, COMMODITY_TYPES, LOCATION_TYPES } from '@inbound/constants/dataConstants';
import { DCLOCATION, GATE, INYARD } from '@inbound/constants/constants';

import * as T from './AddPOModal.types';

export const AddPOModal = ({ isOpen, onClose }: T.Props) => {
  const [addPoPosition, setAddPoPosition] = useState<string>();
  const [addPoLocationType, setAddPoLocationType] = useState<string>();

  return (
    <ConfirmationCommentModal isOpen={isOpen} schema={PurchaseOrderSchema} onClose={onClose}>
      {({ control, register, formState: { errors }, fieldClassName, errorClassName }) => (
        <>
          <ConfirmationCommentModal.Header>
            <Text as="h2" size="175" weight="bold" color="primary">
              {t('PODashboard.AddPurchaseOrder')}
            </Text>
          </ConfirmationCommentModal.Header>
          <ConfirmationCommentModal.Body>
            <View gap={0}>
              <View.Item>
                <View gap={4} padding={[6, 0, 3, 0]}>
                  <View.Item>
                    <Text weight="medium" size="100">
                      {t('PODashboard.PODetails')}
                    </Text>
                  </View.Item>
                  <View.Item>
                    <View gap={2}>
                      <Text weight="medium" size="087">
                        {t('PODashboard.POType')}
                      </Text>
                      <FormControl hasError={errors.poType}>
                        <Select
                          label=""
                          variant="no-label"
                          id="po-type"
                          placeholder={t('PODashboard.AddPO.SelectPOType')}
                          name="poType"
                          options={PO_TYPES}
                          inputAttributes={register('poType')}
                          className={fieldClassName}
                        />
                        <View direction="row" justify={errors.poType ? 'space-between' : 'end'}>
                          <FormControl.Error className={errorClassName}>
                            {getFormInputError(errors.poType?.type)}
                          </FormControl.Error>
                        </View>
                      </FormControl>
                    </View>
                  </View.Item>
                  <View.Item>
                    <View direction="row" gap={4}>
                      <View.Item grow>
                        <View gap={2}>
                          <Text weight="medium" size="087">
                            {t('PODashboard.PONumber')}
                          </Text>
                          <FormControl hasError={errors.poNumber}>
                            <TextField
                              id="po-number"
                              label={t('PODashboard.PONumber')}
                              placeholder={t('PODashboard.AddPO.EnterPONumber')}
                              required
                              value=""
                              inputAttributes={register('poNumber')}
                            />
                            <View padding={[errors.poNumber ? 2 : 0, 0, 0, 0]}>
                              <FormControl.Error className={errorClassName}>
                                {getFormDateError(errors.poNumber?.type)}
                              </FormControl.Error>
                            </View>
                          </FormControl>
                        </View>
                      </View.Item>

                      <View.Item grow>
                        <View gap={2}>
                          <Text weight="medium" size="087">
                            {t('PODashboard.VendorName')}
                          </Text>
                          <FormControl hasError={errors.vendorName}>
                            <TextField
                              id="vendor-name"
                              label={t('PODashboard.VendorName')}
                              placeholder={t('PODashboard.AddPO.EnterVendorName')}
                              required
                              value=""
                              inputAttributes={register('vendorName')}
                            />
                            <View padding={[errors.vendorName ? 2 : 0, 0, 0, 0]}>
                              <FormControl.Error className={errorClassName}>
                                {getFormDateError(errors.vendorName?.type)}
                              </FormControl.Error>
                            </View>
                          </FormControl>
                        </View>
                      </View.Item>
                    </View>
                  </View.Item>

                  <View.Item>
                    <View direction="row" gap={4}>
                      <View.Item grow>
                        <View gap={2}>
                          <Text weight="medium" size="087">
                            {t('PODashboard.ArrivalTime')}
                          </Text>
                          <FormControl hasError={errors.arrivalTimeDate}>
                            <Controller
                              control={control}
                              name="arrivalDate"
                              render={({ field: { onChange, onBlur, value, ref } }) => (
                                <DatePicker
                                  id="arrival-date"
                                  value={value}
                                  dateFormat={t('DateFormat.Short')}
                                  inputAttributes={{ ref, onBlur }}
                                  onValueChange={(date) => onChange(date)}
                                  className={fieldClassName}
                                  variant="floating"
                                />
                              )}
                            />
                            <View padding={[errors.arrivalTimeDate ? 2 : 0, 0, 0, 0]}>
                              <FormControl.Error className={errorClassName}>
                                {getFormDateError(errors.arrivalTimeDate?.type)}
                              </FormControl.Error>
                            </View>
                          </FormControl>
                        </View>
                      </View.Item>

                      <View.Item grow>
                        <View gap={2}>
                          <Text weight="medium" size="087">
                            &nbsp;
                          </Text>
                          <FormControl hasError={errors.arrivalTime}>
                            <TextField
                              id="arrival-time"
                              name="arrivalTime"
                              value=""
                              endElement={
                                <Icon
                                  svg={Clock}
                                  size={5}
                                  color="black"
                                  attributes={{ style: { marginLeft: 'var(--st-unit-3)' } }}
                                />
                              }
                            />
                          </FormControl>
                        </View>
                      </View.Item>
                    </View>
                  </View.Item>
                </View>
              </View.Item>
              <View.Item>
                <View padding={[3, 0]}>
                  <Divider color="300" />
                </View>
              </View.Item>
              <View.Item>
                <View gap={4} padding={[3, 0]}>
                  <View.Item>
                    <Text weight="medium" size="100">
                      {t('PODashboard.LocationDetails')}
                    </Text>
                  </View.Item>
                  <View.Item>
                    <View gap={2}>
                      <Text weight="medium" size="087">
                        {t('PODashboard.Position')}
                      </Text>
                      <FormControl hasError={errors.position}>
                        <Radio.Group
                          name="position"
                          onValueChange={(value) => setAddPoPosition(value)}
                        >
                          <View direction="row" gap={3} attributes={{ 'data-type': 'radio-group' }}>
                            <Radio
                              value={INYARD}
                              label={t('PODashboard.InYard')}
                              inputAttributes={register('position')}
                            />
                            <Radio
                              value={DCLOCATION}
                              label={t('PODashboard.DCLocation')}
                              inputAttributes={register('position')}
                            />
                          </View>
                        </Radio.Group>

                        <View direction="row" justify={errors.position ? 'space-between' : 'end'}>
                          <FormControl.Error className={errorClassName}>
                            {getFormInputError(errors.position?.type)}
                          </FormControl.Error>
                        </View>
                      </FormControl>
                    </View>
                  </View.Item>

                  {addPoPosition === INYARD && (
                    <View.Item>
                      <View direction="row" gap={4}>
                        <View.Item grow>
                          <View gap={2}>
                            <Text weight="medium" size="087">
                              {t('PODashboard.TrailerId')}
                            </Text>
                            <FormControl hasError={errors.trailerId}>
                              <TextField
                                id="trailer-id"
                                label={t('PODashboard.TrailerId')}
                                placeholder={t('PODashboard.AddPO.EnterTrailerId')}
                                required
                                value=""
                              />
                              <View padding={[errors.trailerId ? 2 : 0, 0, 0, 0]}>
                                <FormControl.Error className={errorClassName}>
                                  {getFormDateError(errors.trailerId?.type)}
                                </FormControl.Error>
                              </View>
                            </FormControl>
                          </View>
                        </View.Item>

                        <View.Item grow>
                          <View gap={2}>
                            <Text weight="medium" size="087">
                              {t('PODashboard.TrailerNumber')}
                            </Text>
                            <FormControl hasError={errors.trailerNumber}>
                              <TextField
                                id="trailer-number"
                                label={t('PODashboard.TrailerNumber')}
                                placeholder={t('PODashboard.AddPO.EnterTrailerNumber')}
                                required
                                value=""
                              />
                              <View padding={[errors.trailerNumber ? 2 : 0, 0, 0, 0]}>
                                <FormControl.Error className={errorClassName}>
                                  {getFormDateError(errors.trailerNumber?.type)}
                                </FormControl.Error>
                              </View>
                            </FormControl>
                          </View>
                        </View.Item>
                      </View>
                    </View.Item>
                  )}

                  {addPoPosition === DCLOCATION && (
                    <>
                      <View.Item>
                        <View gap={2}>
                          <Text weight="medium" size="087">
                            {t('PODashboard.LocationType')}
                          </Text>
                          <FormControl hasError={errors.locationType}>
                            <Select
                              label=""
                              variant="no-label"
                              id="location-type"
                              placeholder={t('PODashboard.AddPO.SelectLocationType')}
                              name="locationType"
                              onValueChange={(value) => setAddPoLocationType(value?.value)}
                              options={LOCATION_TYPES}
                              inputAttributes={register('locationType')}
                              className={fieldClassName}
                            />
                            <View
                              direction="row"
                              justify={errors.locationType ? 'space-between' : 'end'}
                            >
                              <FormControl.Error className={errorClassName}>
                                {getFormInputError(errors.locationType?.type)}
                              </FormControl.Error>
                            </View>
                          </FormControl>
                        </View>
                      </View.Item>
                      {addPoLocationType === GATE && (
                        <View.Item>
                          <View gap={2}>
                            <Text weight="medium" size="087">
                              {t('PODashboard.GateNumber')}
                            </Text>
                            <FormControl hasError={errors.gateNumber}>
                              <TextField
                                id="gate-number"
                                label={t('PODashboard.GateNumber')}
                                placeholder={t('PODashboard.AddPO.EnterGateNumber')}
                                required
                                value=""
                              />
                              <View padding={[errors.gateNumber ? 2 : 0, 0, 0, 0]}>
                                <FormControl.Error className={errorClassName}>
                                  {getFormDateError(errors.gateNumber?.type)}
                                </FormControl.Error>
                              </View>
                            </FormControl>
                          </View>
                        </View.Item>
                      )}
                    </>
                  )}
                </View>
              </View.Item>
              <View.Item>
                <View padding={[3, 0]}>
                  <Divider color="300" />
                </View>
              </View.Item>
              <View.Item>
                <View gap={4} padding={[3, 0]}>
                  <View.Item>
                    <Text weight="medium" size="100">
                      {t('PODashboard.Commodity')}
                    </Text>
                  </View.Item>
                  <View.Item>
                    <Checkbox.Group name="commodity">
                      <View direction="row" gap={4} attributes={{ 'data-type': 'checkbox-group' }}>
                        {COMMODITY_TYPES.map((commodityType, index) => (
                          <View.Item columns={6}>
                            <Checkbox
                              key={'commodity-' + index}
                              label={commodityType.label}
                              value={commodityType.value}
                            />
                          </View.Item>
                        ))}
                        <View.Item columns={6}>
                          <Link>
                            <Text size="087" color="500" weight="medium" variant="text-link">
                              {t('PODashboard.ClearAll')}
                            </Text>
                          </Link>
                        </View.Item>
                      </View>
                    </Checkbox.Group>
                  </View.Item>
                </View>
              </View.Item>
              <View.Item>
                <View padding={[3, 0]}>
                  <Divider color="300" />
                </View>
              </View.Item>
              <View.Item>
                <View gap={4} padding={[3, 0]}>
                  <View.Item>
                    <Text weight="medium" size="100">
                      {t('PODashboard.Priority')}
                    </Text>
                  </View.Item>
                  <View.Item>
                    <View direction="row" gap={4}>
                      <Toggle name="priority" />
                      <View justify="center" padding={[2, 0]}>
                        <Text weight="medium" size="087">
                          {t('PODashboard.HighPriorityPurchaseOrder')}
                        </Text>
                      </View>
                    </View>
                  </View.Item>
                  <View.Item>
                    <View gap={1}>
                      <Text weight="medium" size="087">
                        {t('PODashboard.ReasonForAddingPO')}
                      </Text>
                      <FormControl hasError={errors.date}>
                        <TextArea
                          variant="alt"
                          resize="vertical"
                          id="add-po-reason"
                          label={t('ConfirmationComment.Placeholder')}
                          defaultValue=""
                          inputAttributes={register('reason')}
                          className={fieldClassName}
                        />
                        <View direction="row" justify={errors.reason ? 'space-between' : 'end'}>
                          <FormControl.Error className={errorClassName}>
                            {getFormInputError(errors.reason?.type)}
                          </FormControl.Error>
                        </View>
                      </FormControl>
                    </View>
                  </View.Item>
                </View>
              </View.Item>
            </View>
          </ConfirmationCommentModal.Body>
          <ConfirmationCommentModal.Actions
            cancelText={t('ConfirmationComment.Cancel')}
            actionText={t('ConfirmationComment.Confirm')}
          />
        </>
      )}
    </ConfirmationCommentModal>
  );
};
