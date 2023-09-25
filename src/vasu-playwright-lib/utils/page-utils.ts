/**
 * page-factory.ts: This module is responsible for setting and managing instances of pages.
 * It provides a centralized way to set and access pages, ensuring that each test has a clean, isolated page instance.
 * This helps to maintain the state and context of each test independently, improving test reliability and debugging.
 * It also includes functions for switching between pages, closing pages, and reverting to the default page.
 */

import { SMALL_TIMEOUT } from '../constants/timeouts';
import { Page, expect } from '@playwright/test';
import { SwitchPageOptions } from '../types/optional-parameter-types';

let page: Page;

/**
 * Returns the current Page.
 * @returns {Page} The current Page.
 */
export function getPage(): Page {
  return page;
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
  const timeoutInMs = options?.timeout || SMALL_TIMEOUT;
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
  await pageInstance.waitForLoadState(options?.loadState || 'load');
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
 * If there are other pages open, it will switch back to the default page.
 * @param {number} winNum - The index of the page to close.
 */
export async function closePage(winNum?: number): Promise<void> {
  if (!winNum) {
    await page.close();
    return;
  }
  expect(winNum, 'Window number should be Valid').toBeGreaterThan(0);
  const allPages = getAllPages();
  const noOfWindows = allPages.length;
  if (noOfWindows >= 1) {
    const pageInstance = allPages[winNum - 1];
    await pageInstance.close();
  }
  if (noOfWindows > 1) {
    await switchToDefaultPage();
  }
}
