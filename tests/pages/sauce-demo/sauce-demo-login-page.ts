import { click, clickAndNavigate, fill } from '@utils/action-utils';
import { failureLoginCredentials, sauceDemoCredentials } from '@testdata/sauce-demo-test-data';
import { expectElementToBeAttached, expectElementToBeVisible } from '@utils/assert-utils';
import { getLocator, getLocatorByPlaceholder, getLocatorByRole } from '@utils/locator-utils';
import { gotoURL } from '@utils/page-utils';

const userName = `#user-name`;
const password = () => getLocator(`#password`).or(getLocatorByPlaceholder('Password', { exact: true }));
const loginButton = () => getLocatorByRole('button', { name: 'Login' });
const logoutLink = `#logout_sidebar_link`;
const errorMessage = `//*[contains(@class,'error-message')]`;

export async function navigateToSauceDemoLoginPage() {
  await gotoURL('https://www.saucedemo.com/');
}

export async function loginWithValidCredentials(validCredentials = sauceDemoCredentials) {
  await fill(userName, validCredentials.username);
  await fill(password(), validCredentials.password);
  await clickAndNavigate(loginButton());
  await expectElementToBeAttached(logoutLink, 'User should be Logged in sucessfully');
}

export async function loginWithInvalidCredentials(invalidCredentials = failureLoginCredentials) {
  await fill(userName, invalidCredentials.username);
  await fill(password(), invalidCredentials.password);
  await click(loginButton());
  await expectElementToBeVisible(errorMessage, 'Error message should be displayed as credentials are invalid');
}

export async function verifyLoginPageisDisplayed() {
  await expectElementToBeVisible(userName, 'Login page should be displayed');
}
