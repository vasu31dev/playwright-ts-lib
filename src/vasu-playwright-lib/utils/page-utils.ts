/**
 * page-factory.ts: This module is responsible for setting and managing instances of pages.
 * It provides a centralized way to set and access pages, ensuring that each test has a clean, isolated page instance.
 * This helps to maintain the state and context of each test independently, improving test reliability and debugging.
 * It also includes functions for switching between pages, closing pages, and reverting to the default page.
 */

import { SMALL_TIMEOUT } from '../constants/timeouts';
import { BrowserContext, Page, Response, expect } from '@playwright/test';
import {
  GotoOptions,
  NavigationOptions,
  SwitchPageOptions,
  WaitForLoadStateOptions,
} from '../types/optional-parameter-types';
import { getDefaultLoadState } from '../constants';

let page: Page;

/**
 * Returns the current Page.
 * @returns {Page} The current Page.
 */
export function getPage(): Page {
  return page;
}

export function getContext(): BrowserContext {
  return page.context();
}

/**
 * Sets the current Page.
 * @param {Page} pageInstance - The Page instance to set as the current Page.
 */
export function setPage(pageInstance: Page): void {
  page = pageInstance;
}

/**
 * Returns an array of all pages within the current context.
 * @returns {Page[]} An array of Page objects.
 */
export function getAllPages(): Page[] {
  return page.context().pages();
}

/**
 * Switches to a different page by its index (1-based).
 * If the desired page isn't immediately available, this function will wait and retry for up to 'SMALL_TIMEOUT' seconds.
 * @param {number} winNum - The index of the page to switch to.
 * @throws {Error} If the desired page isn't found within 'SMALL_TIMEOUT' seconds.
 */
export async function switchPage(winNum: number, options?: SwitchPageOptions): Promise<void> {
  const startTime = Date.now();
  const timeoutInMs = options?.timeout ?? SMALL_TIMEOUT;
  // Wait until the desired page number exists or timeout is reached
  while (getAllPages().length < winNum && Date.now() - startTime < timeoutInMs) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Assert that the desired page number exists
  expect(getAllPages().length, `Page number ${winNum} not found after ${timeoutInMs} seconds`).toBeGreaterThanOrEqual(
    winNum,
  );

  // Switch to the desired page and wait for it to load
  const pageInstance = getAllPages()[winNum - 1];
  await pageInstance.waitForLoadState(options?.loadState ?? 'load');
  setPage(pageInstance);
}

/**
 * Switches back to the default page (the first one).
 */
export async function switchToDefaultPage(): Promise<void> {
  const allPages = getAllPages();
  const noOfWindows = allPages.length;
  if (noOfWindows > 0) {
    const pageInstance = allPages[0];
    await pageInstance.bringToFront();
    setPage(pageInstance);
  }
}

/**
 * Closes a page by its index (1-based).
 * If no index is provided, the current page is closed.
 * If there are other pages open, it will switch back to the default page (Intial Page 1) if available.
 * @param {number} winNum - The index of the page to close.
 */
export async function closePage(winNum?: number): Promise<void> {
  if (!winNum) {
    await page.close();
    await switchToDefaultPage();
    return;
  }
  expect(winNum, 'Window number should be Valid').toBeGreaterThan(0);
  const allPages = getAllPages();
  const noOfWindows = allPages.length;
  if (noOfWindows >= 1) {
    const pageInstance = allPages[winNum - 1];
    await pageInstance.close();
  }
  await switchToDefaultPage();
}

/**
 * 1. Navigations: This section contains functions for navigating within a web page or between web pages.
 * These functions include going to a URL, waiting for a page to load, reloading a page, and going back to a previous page.
 */

/**
 * Navigates to the specified URL.
 * @param {string} path - The URL to navigate to.
 * @param {GotoOptions} options - The navigation options.
 * @returns {Promise<null | Response>} - The navigation response or null if no response.
 */
export async function gotoURL(
  path: string,
  options: GotoOptions = { waitUntil: getDefaultLoadState() },
): Promise<null | Response> {
  return await getPage().goto(path, options);
}

/**
 * Returns the URL of the page.
 * @param {NavigationOptions} [options] - Optional navigation options.
 * @returns {Promise<string>} - The URL of the page.
 */
export async function getURL(options: NavigationOptions = { waitUntil: 'load' }): Promise<string> {
  try {
    await waitForPageLoadState(options);
    return getPage().url();
  } catch (error) {
    console.error(`getURL- ${error instanceof Error ? error.message : String(error)}`);
    return '';
  }
}

/**
 * Waits for a specific page load state.
 * @param {NavigationOptions} options - The navigation options.
 */
export async function waitForPageLoadState(options?: NavigationOptions): Promise<void> {
  let waitUntil: WaitForLoadStateOptions = getDefaultLoadState();

  if (options?.waitUntil && options.waitUntil !== 'commit') {
    waitUntil = options.waitUntil;
  }

  await getPage().waitForLoadState(waitUntil);
}

/**
 * Reloads the current page.
 * @param {NavigationOptions} options - The navigation options.
 */
export async function reloadPage(options?: NavigationOptions): Promise<void> {
  await Promise.all([getPage().reload(options), getPage().waitForEvent('framenavigated')]);
  await waitForPageLoadState(options);
}

/**
 * Navigates back to the previous page.
 * @param {NavigationOptions} options - The navigation options.
 */
export async function goBack(options?: NavigationOptions): Promise<void> {
  await Promise.all([getPage().goBack(options), getPage().waitForEvent('framenavigated')]);
  await waitForPageLoadState(options);
}

/**
 * Waits for a specified amount of time.
 * @param {number} ms - The amount of time to wait in milliseconds.
 */
export async function wait(ms: number): Promise<void> {
  // eslint-disable-next-line playwright/no-wait-for-timeout
  await getPage().waitForTimeout(ms);
}

/**
 * Retrieves the size of the browser window. This function uses the `evaluate` method to execute code in the context of the page,
 * allowing it to access the `window` object and retrieve the current window dimensions.
 * @returns A promise that resolves to an object containing the width and height of the window.
 */
export async function getWindowSize(): Promise<{ width: number; height: number }> {
  return await getPage().evaluate(() => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });
}

/**
 * Saves the storage state of the current page.
 *
 * This function captures the storage state of the page, which includes cookies,
 * local storage, and session storage. The state can be saved to a file if a path is provided.
 *
 * @param {string} [path] - The optional file path where the storage state will be saved.
 * If not provided, the state will only be returned but not saved to a file.
 *
 * @returns {Promise<ReturnType<BrowserContext['storageState']>>} - A promise that resolves to the storage state.
 *
 * @example
 *
 * // Save storage state to a file
 * saveStorageState('./state.json');
 *
 * // Get storage state without saving to a file
 * const state = await saveStorageState();
 *
 * @see {@link https://playwright.dev/docs/api/class-browsercontext#browser-context-storage-state | Playwright BrowserContext.storageState}
 */
export async function saveStorageState(path?: string): Promise<ReturnType<BrowserContext['storageState']>> {
  return await getPage().context().storageState({ path });
}
