/**
 * action-utils.ts: This module provides a set of utility functions for performing various actions in Playwright tests.
 * These actions include navigation, interaction with page elements, handling of dialogs, and more.
 */
import { Locator } from '@playwright/test';
import { getPage } from './page-utils';
import {
  ActionOptions,
  CheckOptions,
  ClearOptions,
  ClickOptions,
  DoubleClickOptions,
  DragOptions,
  FillOptions,
  HoverOptions,
  PressSequentiallyOptions,
  SelectOptions,
  StabilityOption,
  TimeoutOption,
  UploadOptions,
  UploadValues,
  VisibilityOption,
} from '../types/optional-parameter-types';
import { SMALL_TIMEOUT, STANDARD_TIMEOUT } from '../constants/timeouts';
import { getLocator, getVisibleLocator } from './locator-utils';
import { getDefaultLoadState } from '../constants/loadstate';
import { waitForElementToBeStable } from './element-utils';

/**
 * 1. Actions: This section contains functions for interacting with elements on a web page.
 * These functions include clicking, filling input fields, typing, clearing input fields, checking and unchecking checkboxes, selecting options in dropdowns, and more.
 */

/**
 * Returns a locator, ensuring visibility by default, with the option to override visibility and stability checks.
 * Intended for internal use, this function facilitates retrieving locators under specific conditions—
 * visibility (enabled by default) and stability (optional), as per the requirements for further actions.
 * Users have the flexibility to adjust these checks via the `options` parameter.
 *
 * @param input - The selector string or Locator object used to find the element. This serves as the base for locating the element.
 * @param options - Optional. Configuration for locator retrieval. Allows overriding the default behavior for visibility and enables stability checks.
 * Use `{ onlyVisible: false }` to include non-visible elements and `{ stable: true }` to wait for the element to stabilize.
 * @returns A Promise that resolves to a Locator. This locator has been checked for visibility (enabled by default) and,
 * if specified in `options`, for stability, ensuring it meets the specified conditions.
 */
async function getLocatorWithStableAndVisibleOptions(
  input: string | Locator,
  options?: ActionOptions,
): Promise<Locator> {
  const locator = getVisibleLocator(input, options);
  if (options?.stable) await waitForElementToBeStable(input, options);
  return locator;
}

/**
 * Clicks on a specified element.
 * @param {string | Locator} input - The element to click on.
 * @param {ClickOptions} options - The click options.
 */
export async function click(input: string | Locator, options?: ClickOptions): Promise<void> {
  const locator = await getLocatorWithStableAndVisibleOptions(input, options);
  await locator.click(options);
}

/**
 * Clicks on a specified element and waits for navigation.
 * @param {string | Locator} input - The element to click on.
 * @param {ClickOptions} options - The click options.
 */
export async function clickAndNavigate(input: string | Locator, options?: ClickOptions): Promise<void> {
  const timeout = options?.timeout || STANDARD_TIMEOUT;
  try {
    // Adding 100 ms to the framenavigated timeout prioritizes locator error during click over navigation error, aiding in accurate debugging.
    await Promise.all([click(input, options), getPage().waitForEvent('framenavigated', { timeout: timeout + 100 })]);
    await getPage().waitForLoadState(options?.loadState || getDefaultLoadState(), {
      timeout: timeout,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'TimeoutError' && error.message.includes('framenavigated')) {
      throw new Error(`After the click action, the page did not navigate to a new page\n ${error.message}`);
    } else {
      throw error;
    }
  }
}

/**
 * Fills a specified element with a value.
 * @param {string | Locator} input - The element to fill.
 * @param {string} value - The value to fill the element with.
 * @param {FillOptions} options - The fill options.
 */
export async function fill(input: string | Locator, value: string, options?: FillOptions): Promise<void> {
  const locator = await getLocatorWithStableAndVisibleOptions(input, options);
  await locator.fill(value, options);
}

/**
 * Fills a specified element with a value and press Enter.
 * @param {string | Locator} input - The element to fill.
 * @param {string} value - The value to fill the element with.
 * @param {FillOptions} options - The fill options.
 */
export async function fillAndEnter(input: string | Locator, value: string, options?: FillOptions): Promise<void> {
  const locator = await getLocatorWithStableAndVisibleOptions(input, options);
  await locator.fill(value, options);
  await locator.press('Enter');
}

/**
 * Fills a specified element with a value and press Tab.
 * @param {string | Locator} input - The element to fill.
 * @param {string} value - The value to fill the element with.
 * @param {FillOptions} options - The fill options.
 */
export async function fillAndTab(input: string | Locator, value: string, options?: FillOptions): Promise<void> {
  const locator = await getLocatorWithStableAndVisibleOptions(input, options);
  await locator.fill(value, options);
  await locator.press('Tab');
}

/**
 * Types a value into a specified element, simulating keystrokes character by character.
 * @param {string | Locator} input - The element into which the value will be typed. This can be either a string representing the selector or a Locator object.
 * @param {string} value - The string value to be typed into the element, character by character.
 * @param {PressSequentiallyOptions} [options] - Optional configuration for the typing action.
 */
export async function pressSequentially(
  input: string | Locator,
  value: string,
  options?: PressSequentiallyOptions,
): Promise<void> {
  const locator = await getLocatorWithStableAndVisibleOptions(input, options);
  await locator.pressSequentially(value, options);
}

/**
 * Simulates the action of pressing a key or a combination of keys on the page.
 * This function is useful for scenarios where you need to simulate key presses like 'Enter', 'Tab', etc on the page..
 * @param {string} key - The key or combination of keys to be pressed. For example, 'Enter', 'Tab', or 'Control+A'.
 * @param {PressSequentiallyOptions} [options] - Optional configuration for the key press action. This can include options like delay between key presses.
 */
export async function pressPageKeyboard(key: string, options?: PressSequentiallyOptions): Promise<void> {
  await getPage().keyboard.press(key, options);
}

/**
 * Simulates the action of pressing a key or a combination of keys on a specified element.
 * This function is useful for scenarios where you need to simulate key presses like 'Enter', 'Tab', etc on a specified element..
 * @param {string} key - The key or combination of keys to be pressed. For example, 'Enter', 'Tab', or 'Control+A'.
 * @param {string | Locator} input - The element on which the key press action will be performed. This can be either a string representing the selector or a Locator object.
 * @param {PressSequentiallyOptions} [options] - Optional configuration for the key press action. This can include options like delay between key presses.
 */
export async function pressLocatorKeyboard(
  input: string | Locator,
  key: string,
  options?: PressSequentiallyOptions,
): Promise<void> {
  const locator = await getLocatorWithStableAndVisibleOptions(input, options);
  await locator.press(key, options);
}

/**
 * Clears the value of a specified element.
 * @param {string | Locator} input - The element to clear.
 * @param {ClearOptions} options - The clear options.
 */
export async function clear(input: string | Locator, options?: ClearOptions): Promise<void> {
  const locator = await getLocatorWithStableAndVisibleOptions(input, options);
  await locator.clear(options);
}

/**
 * Checks a specified checkbox or radio button.
 * @param {string | Locator} input - The checkbox or radio button to check.
 * @param {CheckOptions} options - The check options.
 */
export async function check(input: string | Locator, options?: CheckOptions): Promise<void> {
  const locator = await getLocatorWithStableAndVisibleOptions(input, options);
  await locator.check(options);
}

/**
 * Unchecks a specified checkbox or radio button.
 * @param {string | Locator} input - The checkbox or radio button to uncheck.
 * @param {CheckOptions} options - The uncheck options.
 */
export async function uncheck(input: string | Locator, options?: CheckOptions): Promise<void> {
  const locator = await getLocatorWithStableAndVisibleOptions(input, options);
  await locator.uncheck(options);
}

/**
 * Selects an option in a dropdown by its value.
 * @param {string | Locator} input - The dropdown to select an option in.
 * @param {string} value - The value of the option to select.
 * @param {SelectOptions} options - The select options.
 */
export async function selectByValue(input: string | Locator, value: string, options?: SelectOptions): Promise<void> {
  const locator = await getLocatorWithStableAndVisibleOptions(input, options);
  await locator.selectOption({ value: value }, options);
}

/**
 * Selects options in a dropdown by their values (multi select).
 * @param {string | Locator} input - The dropdown to select options in.
 * @param {Array<string>} value - The values of the options to select.
 * @param {SelectOptions} options - The select options.
 */
export async function selectByValues(
  input: string | Locator,
  value: Array<string>,
  options?: SelectOptions,
): Promise<void> {
  const locator = await getLocatorWithStableAndVisibleOptions(input, options);
  await locator.selectOption(value, options);
}

/**
 * Selects an option in a dropdown by its text.
 * @param {string | Locator} input - The dropdown to select an option in.
 * @param {string} text - The text of the option to select.
 * @param {SelectOptions} options - The select options.
 */
export async function selectByText(input: string | Locator, text: string, options?: SelectOptions): Promise<void> {
  const locator = await getLocatorWithStableAndVisibleOptions(input, options);
  await locator.selectOption({ label: text }, options);
}

/**
 * Selects an option in a dropdown by its index.
 * @param {string | Locator} input - The dropdown to select an option in.
 * @param {number} index - The index of the option to select.
 * @param {SelectOptions} options - The select options.
 */
export async function selectByIndex(input: string | Locator, index: number, options?: SelectOptions): Promise<void> {
  const locator = await getLocatorWithStableAndVisibleOptions(input, options);
  await locator.selectOption({ index: index }, options);
}

/**
 * 2. Alerts: This section contains functions for handling alert dialogs.
 * These functions include accepting and dismissing alerts, and getting the text of an alert.
 * Note: These functions currently have some repetition and could be optimized by applying the DRY (Don't Repeat Yourself) principle.
 */

/**
 * Accepts an alert dialog.
 * @param {string | Locator} input - The element to click to trigger the alert.
 * @param {string} [options.promptText] - The text to enter into a prompt dialog. Optional.
 * @param {number} [options.timeout] - Maximum time to wait for the alert to appear in milliseconds. Optional.
 * @returns {Promise<string>} - The message of the dialog.
 */
export async function acceptAlert(
  input: string | Locator,
  options?: { promptText?: string } & TimeoutOption,
): Promise<string> {
  const timeoutInMs = options?.timeout || SMALL_TIMEOUT;
  const locator = getLocator(input);
  let dialogMessage = '';

  const dialogPromise = getPage()
    .waitForEvent('dialog', { timeout: timeoutInMs })
    .then(async dialog => {
      dialogMessage = dialog.message();
      return await dialog.accept(options?.promptText);
    })
    .catch(() => {
      throw new Error(`No dialog appeared after waiting for ${timeoutInMs} ms.`);
    });

  await locator.click();
  await dialogPromise;
  return dialogMessage;
}

/**
 * Dismisses an alert dialog.
 * @param {string | Locator} input - The element to click to trigger the alert.
 * @param {number} [options.timeout] - Maximum time to wait for the alert to appear in milliseconds. Optional.
 * @returns {Promise<string>} - The message of the dialog.
 */
export async function dismissAlert(input: string | Locator, options?: TimeoutOption): Promise<string> {
  const timeoutInMs = options?.timeout || SMALL_TIMEOUT;
  const locator = getLocator(input);
  let dialogMessage = '';

  const dialogPromise = getPage()
    .waitForEvent('dialog', { timeout: timeoutInMs })
    .then(async dialog => {
      dialogMessage = dialog.message();
      return await dialog.dismiss();
    })
    .catch(() => {
      throw new Error(`No dialog appeared after waiting for ${timeoutInMs} ms.`);
    });

  await locator.click();
  await dialogPromise;
  return dialogMessage;
}

/**
 * Gets the text of an alert dialog and dismisses the alert triggered.
 * @param {string | Locator} input - The element to click to trigger the alert.
 * @param {number} [options.timeout] - Maximum time to wait for the alert to appear in milliseconds. Optional.
 * @returns {Promise<string>} - The message of the dialog.
 */

export async function getAlertText(input: string | Locator, options?: TimeoutOption): Promise<string> {
  const timeoutInMs = options?.timeout || SMALL_TIMEOUT;
  const locator = getLocator(input);
  let dialogMessage = '';

  const dialogPromise = getPage()
    .waitForEvent('dialog', { timeout: timeoutInMs })
    .then(async dialog => {
      dialogMessage = dialog.message();
      return await dialog.dismiss();
    })
    .catch(() => {
      throw new Error(`No dialog appeared after waiting for ${timeoutInMs} ms.`);
    });

  await locator.click();
  await dialogPromise;
  return dialogMessage;
}

// This function will hang when the alert is not triggered
/* export async function getAlertText(input: string | Locator): Promise<string> {
  const locator = getLocator(input);
  let dialogMessage = '';
  const dialogHandler = (dialog: Dialog) => {
    dialogMessage = dialog.message();
    dialog.dismiss().catch(e => console.error('Error dismissing dialog:', e));
  };
  getPage().once('dialog', dialogHandler);
  await locator.click();
  getPage().off('dialog', dialogHandler);
  return dialogMessage;
} */

/**
 * Hovers over a specified element.
 * @param {string | Locator} input - The element to hover over.
 * @param {HoverOptions} options - The hover options.
 */
export async function hover(input: string | Locator, options?: HoverOptions): Promise<void> {
  const locator = await getLocatorWithStableAndVisibleOptions(input, options);
  await locator.hover(options);
}

/**
 * Focuses on a specified element.
 * @param {string | Locator} input - The element to focus on.
 * @param {TimeoutOption} options - The timeout options.
 */
export async function focus(
  input: string | Locator,
  options?: TimeoutOption & VisibilityOption & StabilityOption,
): Promise<void> {
  const locator = await getLocatorWithStableAndVisibleOptions(input, options);
  await locator.focus(options);
}

/**
 * Drags and drops a specified element to a destination.
 * @param {string | Locator} input - The element to drag.
 * @param {string | Locator} dest - The destination to drop the element at.
 * @param {DragOptions} options - The drag options.
 */
export async function dragAndDrop(
  input: string | Locator,
  dest: string | Locator,
  options?: DragOptions,
): Promise<void> {
  const drag = await getLocatorWithStableAndVisibleOptions(input, options);
  const drop = await getLocatorWithStableAndVisibleOptions(dest, options);
  await drag.dragTo(drop, options);
}

/**
 * Double clicks on a specified element.
 * @param {string | Locator} input - The element to double click on.
 * @param {DoubleClickOptions} options - The double click options.
 */
export async function doubleClick(input: string | Locator, options?: DoubleClickOptions): Promise<void> {
  const locator = await getLocatorWithStableAndVisibleOptions(input, options);
  await locator.dblclick(options);
}

/**
 * Downloads a file from a specified element.
 * @param {string | Locator} input - The element to download the file from.
 * @param {string} path - The path to save the downloaded file to.
 */
export async function downloadFile(input: string | Locator, path: string, options?: ClickOptions): Promise<void> {
  const locator = await getLocatorWithStableAndVisibleOptions(input, options);
  const downloadPromise = getPage().waitForEvent('download');
  await click(locator, options);
  const download = await downloadPromise;
  // Wait for the download process to complete
  console.log(await download.path());
  // Save downloaded file somewhere
  await download.saveAs(path);
}

/**
 * Uploads files to a specified element.
 * @param {string | Locator} input - The element to upload files to.
 * @param {UploadValues} path - The files to upload.
 * @param {UploadOptions} options - The upload options.
 */
export async function uploadFiles(input: string | Locator, path: UploadValues, options?: UploadOptions): Promise<void> {
  const locator = await getLocatorWithStableAndVisibleOptions(input, options);
  await locator.setInputFiles(path, options);
}

/**
 * Scrolls a specified element into view.
 * @param {string | Locator} input - The element to scroll into view.
 * @param {TimeoutOption} options - The timeout options.
 */
export async function scrollLocatorIntoView(input: string | Locator, options?: TimeoutOption): Promise<void> {
  const locator = getLocator(input);
  await locator.scrollIntoViewIfNeeded(options);
}

/**
 * 3. JS: This section contains functions that use JavaScript to interact with elements on a web page.
 * These functions include clicking on an element using JavaScript.
 */

/**
 * Clicks on a specified element using JavaScript execution.
 * This method is particularly useful in tests where the standard Playwright `click` function fails to trigger the click event properly.
 * It directly invokes the `click` method on the HTMLElement, bypassing any potential issues with CSS, visibility, or DOM events.
 * @param {string | Locator} input - The element to click on. Can be a string selector or a Playwright `Locator` object.
 * @param {TimeoutOptions} options - Currently the timeout options for evaluate is not taking effect.
 */
export async function clickByJS(input: string | Locator, options?: TimeoutOption): Promise<void> {
  const locator = getLocator(input);
  await locator.evaluate((el: HTMLElement) => el.click(), options);
}

/**
 * Clears the value of an input element and triggers an input event.
 * This method is particularly useful in tests where the standard clear or fill functions fail to clear the text.
 * The `input` event is dispatched with the `bubbles` option set to true,
 * allowing the event to bubble up through the DOM, which can trigger event
 * listeners attached to parent elements, ensuring the application reacts as expected.
 * @param {string | Locator} input - The element whose input value is to be cleared. Can be a string selector or a Playwright Locator.
 * @param {TimeoutOptions} options - Currently the timeout options for evaluate is not taking effect.
 */
export async function clearByJS(input: string | Locator, options?: TimeoutOption): Promise<void> {
  const locator = getLocator(input);
  await locator.evaluate(element => {
    (element as HTMLInputElement).value = '';
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  }, options);
}
