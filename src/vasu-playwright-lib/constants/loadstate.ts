/**
 * loadstate.ts
 * This module provides the LOADSTATE constant that can be used to override the initial page load state and navigation load state auto waits.
 * The LOADSTATE is used as default value in the gotoURL, waitForPageLoadState, and clickAndNavigate helper functions.
 * Instead of hardcoding the LOADSTATE, initialize it here with a value that can be used for the entire project, and override in functions as necessary based on the need.
 * @module loadstate
 */

import { WaitForLoadStateOptions } from '../types/optional-parameter-types';

/**
 * Represents the load state option for waiting for specific events during page navigation.
 * This constant is utilized in the gotoURL, waitForPageLoadState, and clickAndNavigate helper functions.
 * @type {WaitForLoadStateOptions}
 * @const
 * @default 'domcontentloaded'
 */
export const LOADSTATE: WaitForLoadStateOptions = 'domcontentloaded';
