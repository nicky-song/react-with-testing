/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { buildUrlParams } from '@ofm/utils/utils';
export class LocationManager {
  /**
   * Updates an URL search param without reloading
   * @param {string} key Key for the param
   * @param {string} value Value for the param
   * @param {boolean} includeNull Whether or not to include null values
   */
  setQueryParameter(key: string, value: string, includeNull = true) {
    const params = new URLSearchParams(window.location.search);
    if (includeNull || value) {
      params.set(key, value);
    } else if (params.has(key)) {
      params.delete(key);
    }

    if (window.history.replaceState) {
      window.history.replaceState(null, '', `?${params.toString()}`);
    }
  }

  /**
   * Updates the URL query params without reloading
   * @param {Record<string, string>} parameters Key value pairs to update
   * @param {boolean} includeNull Whether or not to include null values
   */
  setQueryParameters(parameters: Record<string, string>, includeNull = true) {
    const params = new URLSearchParams(window.location.search);
    Object.keys(parameters).forEach((key) => {
      if (includeNull || parameters[key]) {
        params.set(key, parameters[key]);
      } else if (params.has(key)) {
        params.delete(key);
      }
    });

    if (window.history.replaceState) {
      window.history.replaceState(null, '', `?${params.toString()}`);
    }
  }

  /**
   * Gets the current URL location with the respective parameters
   */
  getLocationWithParameters() {
    return `${window.location.pathname}${buildUrlParams(this.getParameters())}`;
  }

  /**
   * Gets the current URL parameters
   */
  getParameters() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return Object.fromEntries(urlSearchParams.entries());
  }

  /**
   * Gets a specific URL parameter
   * @param {string} name Specific name of a URL parameter
   */
  getParameter(name: string) {
    const params = this.getParameters();
    return params[name];
  }

  /**
   * Returns a boolean in case the current URL contains a provided parameter
   * @param {string} name Specific name of a URL parameter
   */
  hasParameter(name: string) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.has(name);
  }

  /**
   * Clears all the URL parameters without reloading
   */
  clearQueryParameters() {
    if (window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }

  /**
   * Clears a specific list of URL parameters
   * @param {Array<string>} parameters Array of specific parameters
   */
  clearSomeQueryParameters(parameters: Array<string>) {
    const params = new URLSearchParams(window.location.search);

    Object.values(parameters).forEach((key) => {
      if (params.has(`${key}`)) {
        params.delete(`${key}`);
      }
    });
    if (window.history.replaceState) {
      window.history.replaceState(null, '', `?${params.toString()}`);
    }
  }
}

const locationManager = new LocationManager();

export { locationManager };
