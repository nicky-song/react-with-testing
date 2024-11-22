/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { StatusVariants } from '@shared/components/StatusBadge/StatusBadge.types';
import { TagItemsProps } from './TaskManagerCard.types';

export const USERS_MOCK_DATA = [
  {
    id: 1,
    name: 'Kboman',
    username: 'Kboman',
    department: 'Inbound',
    assigned: true,
    clocked_in: false,
    lastTransaction: 'Last transaction 21 min ago',
    workingDepartment: false,
    userStatus: 'Not Active',
  },
  {
    id: 2,
    name: 'bbernard',
    username: 'bbernard',
    department: 'Inbound',
    detailText: 'Lexical Technologies',
    priority: true,
    poNumber: 'PO 2007891',
    subZone: 'BAB1',
    tagItems: [
      {
        variant: 'order',
        text: 'DSD',
      },
    ] as TagItemsProps[],
    piecesData: {
      value: 59,
      max: 120,
      label: ' Done',
      text: 'Done',
    },
    userStatus: 'Active',
  },
  {
    id: 3,
    name: 'Kwheeler',
    username: 'Kwheeler',
    department: 'Inbound',
    assigned: true,
    workingDepartment: false,
    clocked_in: false,
    lastTransaction: 'No last transaction',
    userStatus: 'Not Active',
  },
  {
    id: 4,
    name: 'abond',
    username: 'abond',
    department: 'Inbound',
    assigned: false,
    workingDepartment: false,
    clocked_in: false,
    lastTransaction: 'No last transaction',
    userStatus: 'Not Active',
  },
  {
    id: 5,
    name: 'Sammy',
    username: 'Sammy',
    department: 'Inbound',
    assigned: true,
    workingDepartment: true,
    clocked_in: false,
    lastTransaction: 'No last transaction',
    userStatus: 'Not Active',
  },
  {
    id: 6,
    name: 'Kjohn',
    username: 'Kjohn',
    department: 'Inbound',
    detailText: 'Ring & Pinion Service Inc.',
    priority: true,
    poNumber: 'PO 2007893',
    subZone: 'BAB1',
    tagItems: [
      {
        variant: 'order',
        text: 'DSD',
      },
      {
        variant: 'order',
        text: 'OIL',
      },
    ] as TagItemsProps[],
    piecesData: {
      value: 77,
      max: 150,
      label: ' Done',
    },
    userStatus: 'Active',
  },
  {
    id: 7,
    name: 'jjohnSton',
    username: 'jjohnSton',
    department: 'Inbound',
    detailText: '3 Outlet Wall Tap',
    priority: true,
    poNumber: 'AJR1',
    subZone: 'FMB2',
    statusBadge: {
      variant: StatusVariants.IN_PROGRESS,
      text: '7005',
    },
    piecesData: {
      value: 40,
      max: 86,
      label: ' Done',
    },
    userStatus: 'Active',
  },
  {
    id: 9,
    name: 'mtania',
    username: 'mtania',
    department: 'Inbound',
    assigned: true,
    workingDepartment: false,
    clocked_in: false,
    lastTransaction: 'Last transaction 11 min ago',
    userStatus: 'Not Active',
  },
  {
    id: 8,
    name: 'Merry',
    username: 'Merry',
    department: 'Inbound',
    assigned: false,
    workingDepartment: false,
    clocked_in: true,
    lastTransaction: 'No last transaction',
    userStatus: 'Not Active',
  },
  {
    id: 10,
    name: 'pturner',
    username: 'pturner',
    department: 'Inbound',
    assigned: true,
    detailText: 'Crismon Mechanical LLC.',
    priority: true,
    poNumber: 'PO 2007811',
    subZone: 'BAB2',
    tagItems: [
      {
        variant: 'order',
        text: 'LTD',
      },
    ] as TagItemsProps[],
    piecesData: {
      value: 11,
      max: 86,
      label: ' Done',
    },
    userStatus: 'Active',
  },
  {
    id: 11,
    name: 'dfred',
    username: 'dfred',
    department: 'Inbound',
    detailText: 'Motorcar Parts of America',
    priority: true,
    poNumber: 'PO 2007891',
    subZone: 'CRAC',
    piecesData: {
      value: 80,
      max: 86,
      label: ' Done',
    },
    userStatus: 'Almost Done',
  },
  {
    id: 12,
    name: 'akarrison',
    username: 'akarrison',
    department: 'Inbound',
    detailText: 'Motorcar Parts of America',
    priority: true,
    poNumber: 'PO 2007891',
    subZone: 'CRAC',
    piecesData: {
      value: 80,
      max: 86,
      label: ' Done',
    },
    userStatus: 'Almost Done',
  },
  {
    id: 13,
    name: 'kleanna',
    username: 'kleanna',
    department: 'Inbound',
    detailText: 'Duralast Brake Pads',
    priority: false,
    poNumber: 'PO 2007891',
    subZone: 'CRAC',
    piecesData: {
      value: 80,
      max: 86,
      label: ' Done',
    },
    statusBadge: {
      variant: StatusVariants.READY_FOR_ACTION,
      text: '7000',
    },
    userStatus: 'Almost Done',
  },
  {
    id: 14,
    name: 'ddouglas',
    username: 'ddouglas',
    department: 'Inbound',
    detailText: 'Borg Propulsion Systems',
    priority: false,
    poNumber: 'PO 2007891',
    subZone: 'CRAC',
    piecesData: {
      value: 80,
      max: 86,
      label: ' Done',
    },
    userStatus: 'Almost Done',
  },
  {
    id: 15,
    name: 'Gorge',
    username: 'Gorge',
    department: 'Inbound',
    assigned: false,
    workingDepartment: false,
    clocked_in: true,
    lastTransaction: 'No last transaction',
    userStatus: 'Not Active',
  },
  {
    id: 16,
    name: 'klauren',
    username: 'klauren',
    department: 'Inbound',
    detailText: 'Borg Propulsion Systems',
    priority: false,
    poNumber: 'PO 2007891',
    subZone: 'CRAC',
    piecesData: {
      value: 80,
      max: 86,
      label: ' Done',
    },
    userStatus: 'Almost Done',
  },
  {
    id: 17,
    name: 'fellany',
    username: 'fellany',
    department: 'Inbound',
    detailText: 'Borg Propulsion Systems',
    priority: false,
    poNumber: 'PO 2007891',
    subZone: 'CRAC',
    piecesData: {
      value: 80,
      max: 86,
      label: ' Done',
    },
    userStatus: 'Almost Done',
  },
  {
    id: 18,
    name: 'Bruce',
    username: 'Bruce',
    department: 'Inbound',
    assigned: false,
    workingDepartment: false,
    clocked_in: true,
    lastTransaction: 'No last transaction',
    userStatus: 'Not Active',
  },
  {
    id: 20,
    name: 'fernandez',
    username: 'fernandez',
    department: 'Inbound',
    assigned: false,
    workingDepartment: false,
    clocked_in: true,
    lastTransaction: 'No last transaction',
    userStatus: 'Not Active',
  },
  {
    id: 21,
    name: 'Leesa',
    username: 'Leesa',
    department: 'Inbound',
    assigned: true,
    detailText: 'Crismon Mechanical LLC.',
    priority: true,
    poNumber: 'PO 2007811',
    subZone: 'BAB2',
    tagItems: [
      {
        variant: 'order',
        text: 'LTD',
      },
    ] as TagItemsProps[],
    piecesData: {
      value: 72,
      max: 100,
      label: ' Done',
    },
    userStatus: 'Active',
  },
  {
    id: 22,
    name: 'Amanda Bond',
    username: 'abond',
    department: 'Inbound',
    assigned: false,
    workingDepartment: false,
    clocked_in: true,
    lastTransaction: 'No last transaction',
    userStatus: 'Not Active',
  },
];

export const SHIFT_LIST = [
  {
    label: '1st-Shift',
    value: '1st-Shift',
    fullForm: '1st-Shift',
  },
  {
    label: '2nd-Shift',
    value: '2nd-Shift',
    fullForm: '2nd-Shift',
  },
  {
    label: '3rd-Shift',
    value: '3rd-Shift',
    fullForm: '3rd-Shift',
  },
  {
    label: 'Weekend shift',
    value: 'Weekend shift',
    fullForm: 'Weekend shift',
  },
  {
    label: 'Weekend 3rd-Shift',
    value: 'Weekend 3rd-Shift',
    fullForm: 'Weekend 3rd-Shift',
  },
];
