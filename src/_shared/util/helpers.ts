/* eslint-disable no-prototype-builtins */
import { Action } from '../../redux/type';
import _, { upperCase } from 'lodash';
import createCache from '@emotion/cache';

export function getNewLoadingState(
  currentState: Record<string, any> = {},
  action: Action,
  value: any
) {
  const { key } = action;
  return Object.assign({}, currentState, {
    uiLoaders: { ...currentState.uiLoaders, [key]: value },
  });
}

export const capitalizeFirstLetter = (str: string) => {
  return (
    str &&
    str
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ')
  );
};

export const arrayToById = (array: any[] = [], key = '_id') => {
  return array.reduce((accum, curr) => {
    accum[_.get(curr, key)] = curr;
    return accum;
  }, {});
};

/**
 * Get accessible color contrast
 * @param {String} hex - Hex color code e.g '#3e82f7'
 * @return {String} 'dark' or 'light'
 */
export const getColorContrast = (hex: any) => {
  if (!hex) {
    return 'dark';
  }
  const threshold = 130;
  const hRed = hexToR(hex);
  const hGreen = hexToG(hex);
  const hBlue = hexToB(hex);
  function hexToR(h: any) {
    return parseInt(cutHex(h).substring(0, 2), 16);
  }
  function hexToG(h: any) {
    return parseInt(cutHex(h).substring(2, 4), 16);
  }
  function hexToB(h: any) {
    return parseInt(cutHex(h).substring(4, 6), 16);
  }
  function cutHex(h: any) {
    return h.charAt(0) === '#' ? h.substring(1, 7) : h;
  }
  const cBrightness = (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000;
  if (cBrightness > threshold) {
    return 'dark';
  } else {
    return 'light';
  }
};

/**
 * Get Breakpoint
 * @param {Object} screens - Grid.useBreakpoint() from antd
 * @return {Array} array of breakpoint size
 */
export const getBreakPoint = (screens: any) => {
  const breakpoints = [];
  for (const key in screens) {
    if (screens.hasOwnProperty(key)) {
      const element = screens[key];
      if (element) {
        breakpoints.push(key);
      }
    }
  }
  return breakpoints;
};

/**
 * Get current path related object from Navigation Tree
 * @param {Array} navTree - Navigation Tree from directory 'configs/NavigationConfig'
 * @param {String} path - Location path you looking for e.g '/app/dashboards/analytic'
 * @return {Object} object that contained the path string
 */
export const getRouteInfo = (navTree: any, path: string): any => {
  if (navTree.path === path) {
    return navTree;
  }
  let route;
  for (const p in navTree) {
    if (navTree.hasOwnProperty(p) && typeof navTree[p] === 'object') {
      route = getRouteInfo(navTree[p], path);
      if (route) {
        return route;
      }
    }
  }
  return route;
};

/**
 * Get first character from first & last sentences of a username
 * @param {String} name - Username
 * @return {String} 2 characters string
 */
export const getNameInitial = (name: string) => {
  const initials = name.match(/\b\w/g) || [];
  return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
};

/**
 * Returns either ascending or descending value
 * @param {Object} a - antd Table sorter param a
 * @param {Object} b - antd Table sorter param b
 * @param {String} key - object key for compare
 * @return {any} a value minus b value
 */
export const antdTableSorter = (a: any, b: any, key: any) => {
  if (typeof a[key] === 'number' && typeof b[key] === 'number') {
    return a[key] - b[key];
  }

  if (typeof a[key] === 'string' && typeof b[key] === 'string') {
    a = a[key].toLowerCase();
    b = b[key].toLowerCase();
    return a > b ? -1 : b > a ? 1 : 0;
  }
  return;
};

export const createEmotionCache = () => {
  return createCache({ key: 'css' });
};

export const getNameInitials = (name = '') =>
  name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map(s => s && upperCase(s[0]))
    .join('');
