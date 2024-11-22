/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

export const LIST = 'list';
export const KANBAN = 'kanban';
export const INYARD = 'inYard';
export const DCLOCATION = 'dcLocation';
export const GATE = 'Gate';
export const YARD = 'Yard';
export const DOOR = 'Door';
export const LANE = 'Lane';
export const AISLE = 'Aisle';
export const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9]+$/;

export enum POActions {
  VIEW_DETAILS = 'VIEW_DETAILS',
  EDIT_DETAILS = 'EDIT_DETAILS',
  PUT_ON_HOLD = 'PUT_ON_HOLD',
  REMOVE = 'REMOVE',
}
