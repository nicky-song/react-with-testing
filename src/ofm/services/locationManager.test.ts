/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { LocationManager } from './locationManager';

describe('LocationManager', () => {
  let locationManager: LocationManager;

  beforeEach(() => {
    locationManager = new LocationManager();
  });

  it('Should set a query parameter', () => {
    locationManager.setQueryParameter('paramKey', 'paramValue');
    const parameters = locationManager.getParameters();
    expect(parameters.paramKey).toBe('paramValue');
  });

  it('Should set multiple query parameters', () => {
    const params = {
      paramKey: 'paramValue',
      paramKey2: 'paramValue2',
    };
    locationManager.setQueryParameters(params);
    const parameters = locationManager.getParameters();
    expect(parameters).toEqual(params);
  });

  it('Should clear query parameters', () => {
    locationManager.setQueryParameter('paramKey', 'paramValue');
    locationManager.clearQueryParameters();
    const parameters = locationManager.getParameters();
    expect(Object.keys(parameters).length).toBe(0);
  });

  it('Should clear some query parameters', () => {
    const params = {
      paramKey: 'paramValue',
      paramKey2: 'paramValue2',
    };
    locationManager.setQueryParameters(params);
    locationManager.clearSomeQueryParameters(['paramKey']);
    const parameters = locationManager.getParameters();
    expect(parameters.paramKey).toBeUndefined();
    expect(parameters.paramKey2).toEqual(params.paramKey2);
  });

  it('Should get a specific query parameter', () => {
    locationManager.setQueryParameter('paramKey', 'paramValue');
    const value = locationManager.getParameter('paramKey');
    expect(value).toBe('paramValue');
  });

  it('Should check if a specific query parameter exists', () => {
    locationManager.setQueryParameter('paramKey', 'paramValue');
    const exists = locationManager.hasParameter('paramKey');
    expect(exists).toBe(true);
  });
});
