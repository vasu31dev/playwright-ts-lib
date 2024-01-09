/**
 * loadstate.ts
 *
 * This module provides two key constants: `defaultLoadState` and `defaultVisibleOnlyOption`.
 *
 * - `defaultLoadState` is used to set the initial page load state. It serves as the default value
 * in functions such as `gotoURL`, `waitForPageLoadState`, and `clickAndNavigate`.
 *
 * - `defaultVisibleOnlyOption` configures the default visibility setting for locators. It dictates
 * whether locators should, by default, find only visible elements. This setting is particularly
 * useful in action utilities like `click`, `fill` etc.
 *
 * Both constants can be initialized within this module and can be overridden in specific functions
 * as necessary, allowing for flexible and context-specific configurations.
 *
 * @module loadstate
 */

import { WaitForLoadStateOptions } from '../types/optional-parameter-types';

/**
 * Represents the load state option for waiting for specific events during page navigation.
 * This constant is utilized in the gotoURL, waitForPageLoadState, and clickAndNavigate helper functions.
 * It can be set to values like 'load', 'domcontentloaded', or 'networkidle'.
 */
let defaultLoadState: WaitForLoadStateOptions = 'domcontentloaded';

export function getDefaultLoadState(): WaitForLoadStateOptions {
  return defaultLoadState;
}

export function setDefaultLoadState(value: WaitForLoadStateOptions): void {
  defaultLoadState = value;
}

/**
 * Default visibility setting for locators.
 * This object holds the global configuration for whether locators should by default only find visible elements.
 * It can be used across the project to maintain a consistent behavior for element visibility handling.
 */
export const defaultVisibleOnlyOption = { onlyVisible: true };

/**
 * Sets the default visibility filter for locator functions.
 * This function allows changing the global default setting for whether locators should only find visible elements.
 * @param value - The value to set for the default visibility filter (true if only visible elements should be found).
 */
export function setDefaultLocatorFilterVisibility(value: boolean): void {
  defaultVisibleOnlyOption.onlyVisible = value;
}
