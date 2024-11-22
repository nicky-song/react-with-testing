/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

export const SHIPMENT_TIME_TYPES = [
  {
    label: 'Dispatch Time(Earliest)',
    value: 'dsd',
    fullForm: '(Direct Store Delivery)',
  },
  {
    label: 'Dispatch Time(Latest)',
    value: 'po',
    fullForm: '(Standard Purchase Orders)',
  },
  {
    label: 'Amount Loaded(Highest)',
    value: 'ltl',
    fullForm: '(Less-Than-Truckload)',
  },
  {
    label: 'Amount Loaded(Lowest)',
    value: 'ltd',
    fullForm: '(Long Tail Distribution)',
  },
];
export const TRAILER_MASTERCARD_ROWS = [
  {
    trailer: 'Trailer 114808',
    route: 'Route #123456',
    trailerDispatchTime: new Date('01/15/24 12:50:00'),
    dispatchTime: '',
    hazmat: 'true',
    numberLoaded: 10,
    totalLoaded: 26,
    status: 'Not Started',
    priority: false,
    users: [
      {
        id: 1,
        firstName: 'ABC',
        lastName: 'BCD',
      },
      {
        id: 2,
        firstName: 'CDE',
        lastName: 'DEF',
      },
      {
        id: 1,
        firstName: 'ABC',
        lastName: 'BCD',
      },
      {
        id: 2,
        firstName: 'CDE',
        lastName: 'DEF',
      },
    ],
  },
  {
    trailer: 'Trailer 545808',
    route: 'Route #123456',
    trailerDispatchTime: new Date('01/15/24 22:30:00'),
    dispatchTime: '',
    numberLoaded: 5,
    totalLoaded: 35,
    status: 'Not Started',
    users: [
      {
        id: 1,
        firstName: 'ABC',
        lastName: 'BCD',
      },
      {
        id: 2,
        firstName: 'CDE',
        lastName: 'DEF',
      },
    ],
  },
  {
    trailer: 'Trailer 645808',
    route: 'Route #123456',
    trailerDispatchTime: new Date('01/15/24 12:30:00'),
    dispatchTime: '',
    numberLoaded: 15,
    totalLoaded: 35,
    status: 'Not Started',
    users: [
      {
        id: 1,
        firstName: 'ABC',
        lastName: 'BCD',
      },
      {
        id: 2,
        firstName: 'CDE',
        lastName: 'DEF',
      },
    ],
  },
  {
    trailer: 'Trailer 546808',
    route: 'Route #123456',
    trailerDispatchTime: new Date('01/15/24 10:30:00'),
    dispatchTime: '',
    numberLoaded: 30,
    totalLoaded: 40,
    status: 'Not Started',
    users: [
      {
        id: 1,
        firstName: 'ABC',
        lastName: 'BCD',
      },
      {
        id: 2,
        firstName: 'CDE',
        lastName: 'DEF',
      },
    ],
  },
  {
    trailer: 'Trailer 116508',
    route: 'Route #123456',
    trailerDispatchTime: new Date('01/15/24 12:30:00'),
    dispatchTime: '',
    numberLoaded: 50,
    totalLoaded: 50,
    status: 'Not Started',
    users: [
      {
        id: 1,
        firstName: 'ABC',
        lastName: 'BCD',
      },
      {
        id: 2,
        firstName: 'CDE',
        lastName: 'DEF',
      },
    ],
  },
  {
    trailer: 'Trailer 675432',
    route: 'Route #123456',
    trailerDispatchTime: new Date('01/15/24 1:30:00'),
    DispatchTime: '',
    numberLoaded: 0,
    totalLoaded: 40,
    hazmat: 'false',
    status: 'In Progress',
    priority: false,
    users: [
      {
        id: 1,
        firstName: 'ABC',
        lastName: 'BCD',
      },
      {
        id: 2,
        firstName: 'CDE',
        lastName: 'DEF',
      },
      {
        id: 1,
        firstName: 'ABC',
        lastName: 'BCD',
      },
      {
        id: 2,
        firstName: 'CDE',
        lastName: 'DEF',
      },
    ],
  },
  {
    trailer: 'Trailer 825629',
    route: 'Route #123456',
    trailerDispatchTime: new Date('01/15/24 2:30:00'),
    DispatchTime: '',
    numberLoaded: 0,
    totalLoaded: 40,
    hazmat: 'false',
    status: 'In Progress',
    users: [
      {
        id: 1,
        firstName: 'ABC',
        lastName: 'BCD',
      },
      {
        id: 2,
        firstName: 'CDE',
        lastName: 'DEF',
      },
      {
        id: 1,
        firstName: 'ABC',
        lastName: 'BCD',
      },
      {
        id: 2,
        firstName: 'CDE',
        lastName: 'DEF',
      },
    ],
  },
  {
    trailer: 'Trailer 646382',
    route: 'Route #123456',
    trailerDispatchTime: new Date('01/15/24 00:30:00'),
    DispatchTime: '',
    numberLoaded: 24,
    totalLoaded: 40,
    hazmat: 'false',
    status: 'In Progress',
    users: [
      {
        id: 1,
        firstName: 'ABC',
        lastName: 'BCD',
      },
      {
        id: 2,
        firstName: 'CDE',
        lastName: 'DEF',
      },
      {
        id: 1,
        firstName: 'ABC',
        lastName: 'BCD',
      },
      {
        id: 2,
        firstName: 'CDE',
        lastName: 'DEF',
      },
    ],
  },
  {
    trailer: 'Trailer 062574',
    route: 'Route #123456',
    trailerDispatchTime: new Date('01/15/24 15:30:00'),
    DispatchTime: '',
    numberLoaded: 12,
    totalLoaded: 20,
    status: 'In Progress',
    users: [
      {
        id: 1,
        firstName: 'ABC',
        lastName: 'BCD',
      },
      {
        id: 2,
        firstName: 'CDE',
        lastName: 'DEF',
      },
      {
        id: 1,
        firstName: 'ABC',
        lastName: 'BCD',
      },
      {
        id: 2,
        firstName: 'CDE',
        lastName: 'DEF',
      },
    ],
  },
  {
    trailer: 'Trailer 675432',
    route: 'Route #123456',
    trailerDispatchTime: new Date('01/15/24 22:30:00'),
    hazmat: 'true',
    DispatchTime: '',
    numberLoaded: 48,
    totalLoaded: 48,
    status: 'Shipped',
    priority: false,
    users: [
      {
        id: 1,
        firstName: 'ABC',
        lastName: 'BCD',
      },
      {
        id: 2,
        firstName: 'CDE',
        lastName: 'DEF',
      },
      {
        id: 3,
        firstName: 'ABC',
        lastName: 'BCD',
      },
      {
        id: 4,
        firstName: 'CDE',
        lastName: 'DEF',
      },
    ],
  },
  {
    trailer: 'Trailer 825629',
    route: 'Route #123456',
    trailerDispatchTime: new Date('01/15/24 5:30:00'),
    DispatchTime: '',
    numberLoaded: 30,
    totalLoaded: 30,
    status: 'Shipped',
  },
  {
    trailer: 'Trailer 646382',
    route: 'Route #123456',
    hazmat: 'true',
    trailerDispatchTime: new Date('01/15/24 4:30:00'),
    DispatchTime: '',
    numberLoaded: 40,
    totalLoaded: 40,
    status: 'Shipped',
  },
  {
    trailer: 'Trailer 062574',
    route: 'Route #123456',
    hazmat: 'true',
    trailerDispatchTime: new Date('01/15/24 23:30:00'),
    DispatchTime: '',
    numberLoaded: 20,
    totalLoaded: 20,
    status: 'Shipped',
  },
  {
    trailer: 'Trailer 458912',
    route: 'Route #123456',
    trailerDispatchTime: new Date('01/15/24 12:30:00'),
    DispatchTime: '',
    numberLoaded: 24,
    totalLoaded: 40,
    status: 'CT Dock Lane Closed',
    hazmat: 'false',
    priority: false,
  },
  {
    trailer: 'Trailer 093487',
    route: 'Route #123456',
    trailerDispatchTime: new Date('01/15/24 12:45:00'),
    DispatchTime: '',
    numberLoaded: 30,
    totalLoaded: 30,
    hazmat: 'false',
    status: 'CT Dock Lane Closed',
  },
];
