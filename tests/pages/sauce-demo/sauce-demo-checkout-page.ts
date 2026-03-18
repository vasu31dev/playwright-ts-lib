import { checkoutInfo } from '@testdata/sauce-demo-test-data';
import { clickAndNavigate, fill } from '@utils/action-utils';
import { expectElementToContainText } from '@utils/assert-utils';
import { getLocator, getLocatorByRole } from '@utils/locator-utils';

const cartLink = () => getLocator('#shopping_cart_container').locator('a');
const checkoutButton = () => getLocatorByRole('button', { name: 'Checkout' });
const firstNameInput = () => getLocator('#first-name');
const lastNameInput = () => getLocator('#last-name');
const postalCodeInput = () => getLocator('#postal-code');
const continueButton = () => getLocatorByRole('button', { name: 'Continue' });
const finishButton = () => getLocatorByRole('button', { name: 'Finish' });
const orderCompleteMessage = () => getLocator('[data-test="complete-header"]');

export async function goToCart() {
  await clickAndNavigate(cartLink());
}

export async function clickCheckout() {
  await clickAndNavigate(checkoutButton());
}

export async function fillCheckoutInfo(info = checkoutInfo) {
  await fill(firstNameInput(), info.firstName);
  await fill(lastNameInput(), info.lastName);
  await fill(postalCodeInput(), info.postalCode);
}

export async function clickContinue() {
  await clickAndNavigate(continueButton());
}

export async function clickFinish() {
  await clickAndNavigate(finishButton());
}

export async function verifyOrderComplete() {
  await expectElementToContainText(orderCompleteMessage(), /thank you for your order/i, {
    message: 'Checkout complete message should be displayed',
  });
}
