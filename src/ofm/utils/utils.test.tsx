/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { StatusVariants } from '@shared/components/StatusBadge/StatusBadge.types';
import {
  buildUrlParams,
  generateDateString,
  enumToTranslationKey,
  statusToBadgeVariant,
  getFormInputError,
  getFormDateError,
  getOrderDeleteModalTitle,
  getOrderDeleteModalDescription,
  getOrderDeleteModalButtonText,
  addPadding,
  splitBySeparator,
  formatTableOrderType,
  formatErrorLog,
  formatCsvName,
  downloadGeneratedCSV,
  orderHasQuantityAnomaly,
  parseAndLog,
  isButtonDisabled,
} from './utils';
import {
  ErrorLogType,
  LogSource,
  OrderErrorStatus,
  OrderErrorType,
  OrderStatus,
  OrderType,
} from '@ofm/constants/constants';
import { OrderSchema } from '@ofm/schemas/orderSchema';
import { AxiosResponse } from 'axios';
import { LogError } from '@ofm/classes/LogError';
import { render, screen } from '@testing-library/react';
import { ModalActions } from '@ofm/components/OrderDetailsDrawer/OrderDetailsDrawer.types';
import dayjs from 'dayjs';
import { MAX_TEXTAREA_LENGTH } from '@shared/constants/constants';
import { useTranslation } from 'react-i18next';

vi.mock('axios');

describe('Utils', () => {
  const { t } = useTranslation();

  describe('generateDateString', () => {
    const mockDate = new Date(2004, 1, 11);
    const mockDateFormat = 'DD/MM/YY HH:mm';
    const mockLocalizedDateFormat = 'L';
    const mockPrependText = 'Request by';

    it('Return generate date string with prepended text', () => {
      const dateStringText = generateDateString(mockDate, mockDateFormat, mockPrependText);
      expect(dateStringText).toEqual('Request by 11/02/04 00:00');
    });

    it('Return generate date string without preprend text', () => {
      const dateStringText = generateDateString(mockDate, mockDateFormat);
      expect(dateStringText).toEqual('11/02/04 00:00');
    });

    it('Return generate date string with localized format if given', () => {
      const dateStringText = generateDateString(mockDate, mockLocalizedDateFormat);
      expect(dateStringText).toEqual('02/11/2004');
    });

    it('Should build URL parameters with default behavior', () => {
      const paramsObject = {
        param1: 'value1',
        param2: 'value2',
      };
      const result = buildUrlParams(paramsObject);
      expect(result).toBe('?param1=value1&param2=value2');
    });

    it('Should build URL parameters with includeNull set to false', () => {
      const paramsObject = {
        param1: 'value1',
        param2: '',
        param3: '0',
      };
      const result = buildUrlParams(paramsObject, false);
      expect(result).toBe('?param1=value1&param3=0');
    });

    it('Should handle empty parameters', () => {
      const paramsObject = {};
      const result = buildUrlParams(paramsObject);
      expect(result).toBe('');
    });
  });

  describe('enumToTranslationKey', () => {
    const mockEnumString = 'TEST_ENUM';
    const mockResult = 'TestEnum';

    it('Should transform an enum string into a SnakeCase translation key', () => {
      expect(enumToTranslationKey(mockEnumString)).toEqual(mockResult);
    });
  });

  describe('statusToBadgeVariant', () => {
    const mockNotStarted = 'NOT_STARTED';
    const mockReadyToRequest = 'READY_TO_REQUEST';
    const mockOnHold = 'ON_HOLD';
    const mockSentToOutBound = 'SENT_TO_OUTBOUND';
    const mockError = 'ERROR';

    it('Should transform enum value into not-started status badge variant', () => {
      expect(statusToBadgeVariant(mockNotStarted)).toEqual(StatusVariants.NOT_STARTED);
    });

    it('Should transform enum value into in-progress status badge variant', () => {
      expect(statusToBadgeVariant(mockReadyToRequest)).toEqual(StatusVariants.IN_PROGRESS);
    });

    it('Should transform enum value into ready-for-action status badge variant', () => {
      expect(statusToBadgeVariant(mockOnHold)).toEqual(StatusVariants.READY_FOR_ACTION);
    });

    it('Should transform enum value into completed status badge variant', () => {
      expect(statusToBadgeVariant(mockSentToOutBound)).toEqual(StatusVariants.COMPLETED);
    });

    it('Should transform enum value into cancelled status badge variant', () => {
      expect(statusToBadgeVariant(mockError)).toEqual(StatusVariants.CANCELLED);
    });
  });

  describe('getFormInputError', () => {
    it('should return the correct error message', () => {
      const errorType = 'too_big';
      const expectedErrorMessage = t('Form.MaxCharacterAmount', { count: MAX_TEXTAREA_LENGTH });
      const result = getFormInputError(errorType);
      expect(result).toBe(expectedErrorMessage);
    });

    it('should return the default error message for unknown errors', () => {
      const errorType = 'unknown_error_type';
      const expectedErrorMessage = t('Form.RequiredField');
      const result = getFormInputError(errorType);
      expect(result).toBe(expectedErrorMessage);
    });
  });

  describe('getFormDateError', () => {
    it('should return the correct error message', () => {
      const errorType = 'too_small';
      const expectedErrorMessage = t('Form.InvalidDate');
      const result = getFormDateError(errorType);
      expect(result).toBe(expectedErrorMessage);
    });

    it('should return the default error message for unknown errors', () => {
      const errorType = 'unknown_error_type';
      const expectedErrorMessage = t('Form.RequiredField');
      const result = getFormDateError(errorType);
      expect(result).toBe(expectedErrorMessage);
    });
  });

  describe('getOrderModalTitle', () => {
    it('should return the correct title', () => {
      const orderStatus = OrderStatus.READY_TO_BILL;
      const items = 2;
      const expectedTitle = t('ConfirmationComment.DeleteOrderTitle');
      const result = getOrderDeleteModalTitle(orderStatus, items, ModalActions.DELETE);
      expect(result).toBe(expectedTitle);
    });

    it('should return the default title', () => {
      const orderStatus = OrderStatus.ERROR;
      const items = 2;
      const expectedTitle = t('ConfirmationComment.DeleteMultipleErrorTitle');
      const result = getOrderDeleteModalTitle(orderStatus, items, ModalActions.DELETE_ALL);
      expect(result).toBe(expectedTitle);
    });
  });

  describe('getOrderModalDescription', () => {
    it('should return the correct description', () => {
      const orderStatus = OrderStatus.SENT_TO_OUTBOUND_UNRELEASED;
      const expectedDescription = t('ConfirmationComment.DeleteMultipleDescription');
      const result = getOrderDeleteModalDescription(orderStatus, ModalActions.DELETE);
      expect(result).toBe(expectedDescription);
    });

    it('should return an empty string for default case', () => {
      const orderStatus = OrderStatus.NOT_STARTED;
      const result = getOrderDeleteModalDescription(orderStatus, ModalActions.DELETE_ALL);
      expect(result).toBe('');
    });
  });

  describe('getOrderModalButtonText', () => {
    it('should return the correct button text', () => {
      const orderStatus = OrderStatus.READY_TO_BILL;
      const items = 2;
      const expectedButtonText = t('ConfirmationComment.DeleteMultiple', { count: items });
      const result = getOrderDeleteModalButtonText(orderStatus, items, ModalActions.DELETE_ALL);
      expect(result).toBe(expectedButtonText);
    });

    it('should return the default button text', () => {
      const orderStatus = OrderStatus.ERROR;
      const items = 2;
      const expectedButtonText = t('ConfirmationComment.GotIt');
      const result = getOrderDeleteModalButtonText(orderStatus, items, ModalActions.DELETE);
      expect(result).toBe(expectedButtonText);
    });
  });

  describe('padNumberToSixDigits', () => {
    it('Should return strings of length six with added zeros', () => {
      const mockStringArray = ['6783', '3782', '1234', '355', '8939'];
      const paddedArray = mockStringArray.map((id) => addPadding(id, 6));
      expect(paddedArray).toEqual(['006783', '003782', '001234', '000355', '008939']);
    });
  });

  describe('splitBySeparator', () => {
    it('Should split a string by a separator', () => {
      const inputString = '100 Main St\nApt 3\nNew York, NY 10012';
      const separator = '\n';
      const expectedArray = ['100 Main St', 'Apt 3', 'New York, NY 10012'];
      const result = splitBySeparator(inputString, separator);
      expect(result).toEqual(expectedArray);
    });
  });

  describe('formatTableOrderType', () => {
    it('Should split a string by underscore and capitalize the first letter of each word', () => {
      const input = 'CROSS_DOCK';
      const expectedOutput = 'CrossDock';
      expect(formatTableOrderType(input)).toEqual(expectedOutput);
    });
  });
  describe('formatErrorLog', () => {
    const mockErrorType = ErrorLogType.AXIOS;
    const mockDetails = {};
    const mockCode = 404;
    it('Should format error log accordingly to the given input', () => {
      const expectedOutput = {
        timestamp: new Date(),
        id: new Date().valueOf(),
        details: mockDetails,
        type: mockErrorType,
        code: mockCode,
        source: LogSource.UI,
      };

      expect(formatErrorLog(mockErrorType, mockDetails, mockCode)).toEqual(expectedOutput);
    });
  });
  describe('parseAndLog', () => {
    const mockErrorTypeZod = ErrorLogType.ZOD;

    it('Should use zod safe parse and throw an error if unsuccessful', () => {
      const mockAxiosData = { data: {} };
      const mockAxiosResponse = mockAxiosData as AxiosResponse;
      const expectedOutput = {
        timestamp: expect.any(Date),
        id: expect.any(Number),
        details: expect.any(Object),
        type: mockErrorTypeZod,
        code: undefined,
        source: LogSource.UI as LogSource.UI,
      };

      expect(() => parseAndLog(OrderSchema, mockAxiosResponse)).toThrow(
        new LogError(expectedOutput)
      );
    });
  });

  describe('formatCsvName', () => {
    it('Should format the csv file name from content-disposition with underscores and dashes', () => {
      const mockCsvFileName = '""20_Orders_Data_2023-11-09_16-51-47""';
      const mockFormattedCsvFileName = '20_Orders_Data_2023-11-09_16-51-47';

      expect(formatCsvName(mockCsvFileName)).toEqual(mockFormattedCsvFileName);
    });
  });

  describe('downloadGeneratedCSV', () => {
    it('Should create a blob with the csv data and download on click', async () => {
      const mockFileName = '123.csv';
      const mockCSVData = {
        fileName: mockFileName,
        data: 'ID,Quantity,Is Credited,Is In Progress',
      };
      const mockLinkId = 'csv-download';
      const mockObjectUrl = 'text:download-me.csv';
      const mockDownloadClick = vi.fn();

      global.URL.createObjectURL = vi.fn().mockImplementationOnce(() => mockObjectUrl);

      render(<a id={mockLinkId} data-testid="123" />);

      const downloadLink = screen.getByTestId('123') as HTMLAnchorElement;
      const modifiedLinkAttributes: string[] = [];

      /* Since the function temporarily sets the link's href and download
         we keep track of the attributes this way just for the purposes
         of this test
      */
      downloadLink.click = mockDownloadClick.mockImplementationOnce(() => {
        modifiedLinkAttributes.push(downloadLink.href);
        modifiedLinkAttributes.push(downloadLink.download);
      });

      downloadGeneratedCSV(mockCSVData, mockLinkId);
      expect(mockDownloadClick).toHaveBeenCalledTimes(1);
      expect(modifiedLinkAttributes[0]).toBe(mockObjectUrl);
      expect(modifiedLinkAttributes[1]).toBe('123.csv');
      expect(downloadLink.href).toBe('javascript:;');
      expect(downloadLink.download).toBe('');
    });
  });

  describe('orderHasQuantityAnomaly', () => {
    const mockOrder = {
      id: '729129',
      status: OrderStatus.ERROR,
      type: OrderType.CROSS_DOCK,
      secondaryStatus: null,
      isInProgress: false,
      warehouseId: '1',
      storeNumber: '6229',
      wave: '1',
      waveName: '',
      international: false,
      creationDate: dayjs('2023-11-20T15:35:31.926846509').toDate(),
      dueDate: dayjs('2023-11-20T15:35:31.926848384').toDate(),
      lastUpdate: dayjs('2023-11-20T15:35:31.926849324').toDate(),
      billedDate: dayjs('2023-11-20T15:35:31.926849708').toDate(),
      requestedDate: dayjs('2023-11-20T15:35:31.926849987').toDate(),
      hasHistory: true,
      invoiceNumber: 'IL-123',
      linesCount: 100,
      piecesCount: 120,
      activity: [
        {
          id: '7e151902-8a38-4fca-92a0-62fc595c8ef7',
          message: 'Mock Activity',
          activityDate: '2023-11-20T15:35:31.926914894',
          user: 'dd3bc0ff-b9e4-477e-9da3-c9a6105cd0ae',
          storeId: '',
          orderId: '',
          commentDetails: '',
        },
      ],
      delivery: {
        option: 'Pull Shift',
        arrivesBy: dayjs('2023-11-23T15:35:31.926850935').toDate(),
        dcSource: 20,
      },
      error: [],
    };
    const mockError = {
      id: '1',
      errorType: OrderErrorType.SYSTEM_ERROR,
      status: OrderErrorStatus.QUANTITY_ANOMALY,
      storeNumber: '11',
      attemptsCount: 2,
      createdAt: dayjs('2023-11-20T15:36:20.405594073').toDate(),
      lastAttemptedAt: dayjs('2023-11-20T15:36:20.40559431').toDate(),
      orderId: '11',
    };

    it('Should return true when a quantity anomaly error is detected', () => {
      expect(orderHasQuantityAnomaly({ ...mockOrder, error: [mockError] })).toBeTruthy();
    });

    it('Should return false when no quantity anomaly errors are found', () => {
      expect(orderHasQuantityAnomaly(mockOrder)).toBeFalsy();
    });
  });

  describe('isButtonDisabled', () => {
    const undefinedText = undefined;
    const text = 'Reason';

    it('Should return that the button is disabled', () => {
      expect(isButtonDisabled(undefinedText)).toBeTruthy();
    });

    it('Should return that the button is enabled', () => {
      expect(isButtonDisabled(text)).toBeFalsy();
    });
  });
});
