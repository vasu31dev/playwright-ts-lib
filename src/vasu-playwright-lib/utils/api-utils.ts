import { getPage } from './page-utils';
import { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * Retrieves the APIRequestContext from the current page equivalent to request from playwright fixture.
 * @returns {APIRequestContext} The Playwright API request context.
 */
export function getAPIRequestContext(): APIRequestContext {
  return getPage().request;
}

/**
 * Performs a GET request to the specified URL.
 * @param {string} url - The URL to send the GET request to.
 * @param {Parameters<APIRequestContext['get']>[1]} options - Optional parameters for the GET request.
 * @returns {Promise<APIResponse>} A promise that resolves with the API response.
 */
export async function getRequest(url: string, options?: Parameters<APIRequestContext['get']>[1]): Promise<APIResponse> {
  return await getAPIRequestContext().get(url, options);
}

/**
 * Performs a POST request to the specified URL.
 * @param {string} url - The URL to send the POST request to.
 * @param {Parameters<APIRequestContext['post']>[1]} options - Optional parameters for the POST request.
 * @returns {Promise<APIResponse>} A promise that resolves with the API response.
 */
export async function postRequest(
  url: string,
  options?: Parameters<APIRequestContext['post']>[1],
): Promise<APIResponse> {
  return await getAPIRequestContext().post(url, options);
}

/**
 * Performs a PUT request to the specified URL.
 * @param {string} url - The URL to send the PUT request to.
 * @param {Parameters<APIRequestContext['put']>[1]} options - Optional parameters for the PUT request.
 * @returns {Promise<APIResponse>} A promise that resolves with the API response.
 */
export async function putRequest(url: string, options?: Parameters<APIRequestContext['put']>[1]): Promise<APIResponse> {
  return await getAPIRequestContext().put(url, options);
}

/**
 * Performs a DELETE request to the specified URL.
 * @param {string} url - The URL to send the DELETE request to.
 * @param {Parameters<APIRequestContext['delete']>[1]} options - Optional parameters for the DELETE request.
 * @returns {Promise<APIResponse>} A promise that resolves with the API response.
 */
export async function deleteRequest(
  url: string,
  options?: Parameters<APIRequestContext['delete']>[1],
): Promise<APIResponse> {
  return await getAPIRequestContext().delete(url, options);
}
