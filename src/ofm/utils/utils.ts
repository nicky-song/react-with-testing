/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { StatusVariants } from '@shared/components/StatusBadge/StatusBadge.types';
import { z } from 'zod';
import { t } from 'i18next';
import {
  DAYS,
  ErrorLogType,
  LogSource,
  OrderErrorStatus,
  OrderStatus,
} from '@ofm/constants/constants';
import { AxiosResponse } from 'axios';
import { LogError } from '@ofm/classes/LogError';
import { PaginatedResponseSchema } from '@ofm/schemas/paginatedResponseSchema';
import { CSVDataType, LogType, OrderDetailsType, PaginatedResponse } from '@ofm/types/types';
import { RequestSchema } from '@ofm/schemas/requestSchema';
import { MAX_TEXTAREA_LENGTH } from '@shared/constants/constants';
import { ModalActions } from '@ofm/components/OrderDetailsDrawer/OrderDetailsDrawer.types';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import { BillOrderProcessRequestSchema } from '@ofm/schemas/billOrderProcessSchema';
dayjs.extend(localizedFormat);

export const generateDateString = (dateObject: Date, format?: string, prependText?: string) => {
  const dateStringText = dayjs(dateObject).format(format || 'DD/MM/YYYY HH:mm') || '';
  return prependText ? `${prependText} ${dateStringText}` : dateStringText;
};

export const generateTimeString = (time: string, format?: string) => {
  //We need to do this since Javascript doesn't have a Time object, only Date
  const appendDateToTime = `1970-01-01T${time}`;
  return dayjs(appendDateToTime).format(format || 'HH:mm');
};

// TODO: Remove once BFF is set up
export const generateRandomSixDigitNumberAsString = () => {
  return `${Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000}`;
};

/**
 * Builds the query parameters into the URL
 * @param paramsObject An object containing the keys and values of the query parameters
 * @param includeNull Allow null values as query params
 */
export const buildUrlParams = (paramsObject: Record<string, string>, includeNull = true) => {
  const params = new URLSearchParams();
  Object.keys(paramsObject).forEach((key) => {
    if (includeNull || paramsObject[key] || paramsObject[key].toString() === '0') {
      params.set(key, paramsObject[key]);
    }
  });
  const queryString = params.toString();

  return queryString ? `?${queryString}` : '';
};

export const statusToBadgeVariant = (status: string) => {
  switch (status) {
    case 'NOT_STARTED':
    default:
      return StatusVariants.NOT_STARTED;
    case 'IN_PROGRESS':
    case 'READY_TO_REQUEST':
    case 'READY_TO_BILL':
      return StatusVariants.IN_PROGRESS;
    case 'ON_HOLD':
    case 'CT_DOCK_LANE_CLOSED':
    case 'TRAILED_CLOSED':
      return StatusVariants.READY_FOR_ACTION;
    case 'SENT_TO_OUTBOUND':
    case 'SENT_TO_OUTBOUND_UNRELEASED':
    case 'CREDITED':
    case 'OUT_FOR_DELIVERY':
      return StatusVariants.COMPLETED;
    case 'ERROR':
    case 'CANCELLED':
      return StatusVariants.CANCELLED;
  }
};

export const enumToTranslationKey = (enumValue: string) => {
  const res = enumValue
    .split('_')
    .map((word) => word.slice(0, 1).concat(word.slice(1).toLowerCase()))
    .join('');
  return res;
};

export const filterItemsBySelection = (id: string, selectedItems: Array<string>) => {
  const newSelectedItems = selectedItems.includes(id)
    ? selectedItems.filter((itemId) => itemId !== id)
    : [...selectedItems, id];
  return newSelectedItems;
};

export const toggleAllSelectedItems = (
  selectedItems: Array<string>,
  totalOrders: number,
  items: Array<string>,
  disabledItems?: Array<string>
) => {
  const disabledItemsCount = disabledItems?.length || 0;

  const areAllItemsSelected =
    selectedItems.length && selectedItems.length === totalOrders - disabledItemsCount;

  if (areAllItemsSelected) {
    return [];
  }
  return items.filter((item) => !disabledItems?.includes(item));
};

export const getFormInputError = (errorType: string, maxCount?: number) => {
  switch (errorType) {
    case z.ZodIssueCode.too_big:
      return t('Form.MaxCharacterAmount', { count: maxCount || MAX_TEXTAREA_LENGTH });
    case z.ZodIssueCode.custom:
      return t('Form.ValidInput');
    case z.ZodIssueCode.invalid_type:
    case z.ZodIssueCode.too_small:
    default:
      return t('Form.RequiredField');
  }
};

export const getFormDateError = (errorType: string) => {
  switch (errorType) {
    case z.ZodIssueCode.too_small:
    case z.ZodIssueCode.invalid_date:
    case z.ZodIssueCode.custom:
      return t('Form.InvalidDate');
    case z.ZodIssueCode.invalid_type:
    default:
      return t('Form.RequiredField');
  }
};

export const getOrderDeleteModalTitle = (
  orderStatus: OrderStatus,
  items: number,
  action: ModalActions
) => {
  switch (orderStatus) {
    case OrderStatus.NOT_STARTED:
    case OrderStatus.READY_TO_REQUEST:
    case OrderStatus.READY_TO_BILL:
    case OrderStatus.SENT_TO_OUTBOUND_UNRELEASED:
      return action === ModalActions.DELETE_ALL
        ? t('ConfirmationComment.DeleteMultipleOrdersTitle', { count: items })
        : t('ConfirmationComment.DeleteOrderTitle');
    default:
      return action === ModalActions.DELETE_ALL
        ? t('ConfirmationComment.DeleteMultipleErrorTitle')
        : t('ConfirmationComment.DeleteErrorTitle');
  }
};

export const getOrderDeleteModalDescription = (orderStatus: OrderStatus, action: ModalActions) => {
  switch (orderStatus) {
    case OrderStatus.SENT_TO_OUTBOUND_UNRELEASED:
      return action === ModalActions.DELETE_ALL
        ? t('ConfirmationComment.DeleteMultipleDescription')
        : t('ConfirmationComment.DeleteDescription');
    case OrderStatus.SENT_TO_OUTBOUND:
      return action === ModalActions.DELETE_ALL
        ? t('ConfirmationComment.DeleteMultipleErrorDescription')
        : t('ConfirmationComment.DeleteErrorDescription');
    case OrderStatus.ERROR:
      return action === ModalActions.DELETE_ALL
        ? t('ConfirmationComment.DeleteMultipleGenericErrorDescription')
        : t('ConfirmationComment.DeleteErrorGenericErrorDescription');
    case OrderStatus.READY_TO_REQUEST:
    case OrderStatus.NOT_STARTED:
    default:
      return '';
  }
};

export const getOrderDeleteModalButtonText = (
  orderStatus: OrderStatus,
  items: number,
  action: ModalActions
) => {
  switch (orderStatus) {
    case OrderStatus.NOT_STARTED:
    case OrderStatus.READY_TO_REQUEST:
    case OrderStatus.READY_TO_BILL:
    case OrderStatus.SENT_TO_OUTBOUND_UNRELEASED:
      return action === ModalActions.DELETE_ALL
        ? t('ConfirmationComment.DeleteMultiple', { count: items })
        : t('ConfirmationComment.Delete');
    default:
      return t('ConfirmationComment.GotIt');
  }
};

export const addPadding = (id: string, length: number) => {
  return id.padStart(length, '0');
};

export const triggerEmail = (email: string, subject: string) => {
  const encondedSubject = encodeURIComponent(subject);
  const mailUrl = `mailto:${email}?subject=${encondedSubject}`;
  window.location.href = mailUrl;
};

export const splitBySeparator = (string: string, separator: string) => {
  return string.split(separator);
};

export const formatTableOrderType = (type: string) => {
  const x = type
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  return x;
};

export const handleIsToday = (dateToCompare: Date): boolean => {
  const today = dayjs();
  const formattedDate = dayjs(dateToCompare);
  const daysDiff = today.diff(formattedDate, DAYS);
  return !(daysDiff > 0);
};

export const formatErrorLog = (
  errorType: ErrorLogType,
  details: unknown,
  errorCode?: number
): LogType => {
  const currentDate = new Date();
  return {
    timestamp: currentDate,
    id: currentDate.valueOf(),
    details: details,
    type: errorType,
    code: errorCode,
    source: LogSource.UI,
  };
};

export const parseAndLog = <T extends z.ZodTypeAny>(
  schema: T,
  data: AxiosResponse
): z.infer<T> | undefined => {
  const parsedData = schema.safeParse(data);

  if (parsedData.success) {
    return parsedData.data as z.infer<typeof schema> | undefined;
  } else {
    if (import.meta.env.MODE === 'development') {
      // Leaving this here to facilitate debugging locally
      // eslint-disable-next-line no-console
      console.log('ZOD ERROR', parsedData);
    }
    throw new LogError(formatErrorLog(ErrorLogType.ZOD, parsedData.error));
  }
};

export const paginatedParseAndLog = <T extends z.ZodTypeAny>(
  schema: T,
  data: AxiosResponse
): PaginatedResponse<T> | undefined => {
  const paginatedSchema = PaginatedResponseSchema(schema);
  const parsedData = paginatedSchema.safeParse(data);

  if (parsedData.success) {
    return parsedData.data as PaginatedResponse<T> | undefined;
  } else {
    throw new LogError(formatErrorLog(ErrorLogType.ZOD, parsedData.error));
  }
};

export const mapRequestToProgressBar = (
  request: z.infer<typeof RequestSchema> | z.infer<typeof BillOrderProcessRequestSchema>
) => {
  const { completedOrdersCount, ordersInProgressCount } = request.summary;
  const dateFormat = t('DateFormat.ShortTimeSeconds');
  const total = ordersInProgressCount + completedOrdersCount;
  return {
    value: total - ordersInProgressCount,
    max: total,
    title: t('ProgressBar.Title.OrdersProcessing'),
    text: t('ProgressBar.Text.Completed'),
    dateString: generateDateString(request.requestedDate, dateFormat),
  };
};

export const removeLeadingZeros = (input: string): string => {
  return input?.replace(/^0+/, '');
};

export const formatCsvName = (input: string): string => {
  const regex = /[^a-zA-Z0-9-_]/g;
  return input.replace(regex, '');
};

export const downloadGeneratedCSV = (csvData: CSVDataType, linkId: string) => {
  const csvBlob = new Blob([csvData.data], { type: 'text/csv;charset=utf-8;' });
  const downloadAnchor = document.getElementById(linkId) as HTMLAnchorElement;
  if (downloadAnchor && csvBlob) {
    downloadAnchor.href = URL.createObjectURL(csvBlob);
    downloadAnchor.download = csvData.fileName || 'orders.csv';
    downloadAnchor.click();
    // Reset download anchor
    downloadAnchor.href = 'javascript:;';
    downloadAnchor.download = '';
  }
};

export const orderHasQuantityAnomaly = (order?: OrderDetailsType) => {
  const filteredErrors = order?.error.filter(
    (error) => error.status === OrderErrorStatus.QUANTITY_ANOMALY
  );
  return !!filteredErrors && filteredErrors.length > 0;
};

export const isButtonDisabled = (text?: string) => {
  return text === undefined || text?.length <= 0;
};

export const isValidateDate = (input: string): boolean => {
  const regex = /\d{1,2}\/\d{1,2}\/\d{2,4}/g;
  return regex.test(input);
};
