# Changelog

## [1.21.0] - 2025-02-06

### Updated Dependencies

#### Major Updates

- **Playwright**: Updated peer dependency from `>=1.52.0` to `>=1.58.2`
- **ESLint**: Updated `@eslint/js` and `eslint` to `9.39.2` (v10 not compatible with `@typescript-eslint/eslint-plugin`)

#### Updated to Latest Versions

- **TypeScript Tooling**: `@types/node`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `typescript`
- **Testing & Reporting**: `allure-commandline`, `allure-playwright`
- **Utilities**: `axios`, `cross-env`, `dotenv`, `winston`
- **Code Quality**: `eslint-config-prettier`, `eslint-import-resolver-typescript`, `eslint-plugin-import`, `eslint-plugin-jsdoc`, `eslint-plugin-playwright`, `eslint-plugin-prettier`, `lint-staged`, `prettier`
- **Build Tools**: `rimraf`

### Notes

- ESLint v10 intentionally not used due to compatibility requirements with TypeScript ESLint plugin ecosystem

## [1.20.0] - 2025-06-03

### Updated Dependencies

- Updated `playwright` from version `1.48.1` to `1.52.0`.
- Updated all corresponding dependencies to their latest versions.

### Updated

- New ESLint v9 configuration
- Added @eslint/js dependency
- Removed .eslintrc.js and .eslintignore (ESLint v8 configuration)

## [1.19.0] - 2024-10-21

### Updated

- Improved the `clickAndNavigate` method to handle element staleness and navigation errors more robustly. The method now waits for the element clicked to become hidden or stale after navigation and includes enhanced error handling for better debugging.

## [1.18.0] - 2024-10-17

### Updated Dependencies

- Updating getAllLocators, getAllTexts, getLocatorCount to auto wait by adding waitForFirstElementToBeAttached method

## [1.17.0] - 2024-10-17

### Updated Dependencies

- Updated `playwright` from version `1.44.1` to `1.48.1`.
- Updated all corresponding dependencies to their latest versions.

### Added

- New GitHub workflow to run tests on pushes to the main branch.
- New GitHub workflow to publish the package to npm.

## [1.16.0] - 2024-09-19

### Updated Dependencies

- Updated `playwright` from version `1.44.1` to `1.47.1`.
- Updated all corresponding dependencies to their latest versions.

## [1.15.0] - 2024-05-24

### Updated Dependencies

- Updated `playwright` from version `1.41.2` to `1.44.1`.
- Updated all corresponding dependencies to their latest versions.

## [1.14.1] - 2024-03-25

- Fix API utils module under exports in package.json

## [1.14.0] - 2024-03-18

### Added

- API Utils for enhanced network interaction within tests. Includes utility functions for performing HTTP requests (GET, POST, PUT, DELETE) using Playwright's `APIRequestContext`. This addition simplifies the process of interacting with APIs directly from test scripts, providing a more integrated and efficient testing workflow.
  - `getAPIRequestContext()`: Retrieves the `APIRequestContext` from the current page, equivalent to the request object from Playwright's fixture, enabling seamless network operations within tests.
  - `getRequest(url: string, options?)`: Performs a GET request to the specified URL with optional configuration.
  - `postRequest(url: string, options?)`: Allows sending POST requests to a specified URL, supporting optional parameters for body content and headers.
  - `putRequest(url: string, options?)`: Facilitates PUT requests for updating resources at the specified URL, with support for optional configuration.
  - `deleteRequest(url: string, options?)`: Implements DELETE requests to remove resources from the specified URL, also supporting optional parameters.

## [0.13.0] - 2024-03-18

### Added

- Stable optional parameter for `action-util` functions like `click`, `fill`, `check`, etc., to increase the reliability of actions performed in tests.
- Enhanced `getFrame` functionality to throw an error if the frame is not found when the optional `force` parameter is set to `true`. Defaults to `false`.

### Changed

- Moved `@playwright/test` dependency to `peerDependencies` to provide more flexibility in version management for users of the library. The required version is now `>=1.41.1`.
- Updated all packages to their latest versions to incorporate the latest features and security updates.

### Replaced

- `.eslintrc` configuration file with `.eslintrc.js` to allow for more dynamic and programmable ESLint configurations.

## [0.12.2] - 2024-02-21

### Fixed

- Improved the `closePage` method for enhanced reliability and usability. The method now automatically invokes `switchToDefaultPage` when such a page is available.

## [0.12.1] - 2024-02-19

### Updated Dependencies

- Updated all corresponding dependencies to their latest versions.

## [0.12.0] - 2024-02-19

### Added

- New method `clearByJS` in case Playwright's clear function doesn't work as expected. This method provides an alternative way to clear input fields using JavaScript.
- `clickAndNavigate` function now throws a more descriptive error message to facilitate easier debugging.
- Added new method `fillAndTab` in `action-utils` for filling input fields and simulating a tab press, improving form handling automation.
- New method `getContext` added in `page-utils`, offering a straightforward way to retrieve the browser context for advanced testing scenarios.

### Changed

- `pressKeyboard` function is now divided into `pressPageKeyboard` and `pressLocatorKeyboard` functions to provide more targeted keyboard interaction capabilities. This change allows for more precise control over where keyboard inputs are sent, whether to the page or specific element locators.

### Breaking Changes

- Splitting `pressKeyboard` into `pressPageKeyboard` and `pressLocatorKeyboard` may require updates to existing tests that utilize the original `pressKeyboard` method. This modification aims to enhance test script specificity and efficiency but will necessitate changes to maintain compatibility.

## [0.11.4] - 2024-02-01

### Updated Dependencies

- Updated `playwright` from version `1.40.1` to `1.41.2`.
- Updated all corresponding dependencies to their latest versions.

### Enhancements

- **`acceptAlert`, `dismissAlert`, `getAlertText` Function**: Improved the functions to efficiently handle the alert dialogs. It now ensures that the function does not hang if an alert is not triggered after the specified timeout period.

### Added

- **`expectAlertToHaveText` Function**: Introduced a new function for asserting that the text from an alert dialog exactly matches a provided string.

- **`expectAlertToMatchText` Function**: Added a new function that allows assertions against the text from an alert dialog to be made using either a string for partial matches or a regular expression for pattern matching.

## [0.11.3] - 2024-01-31

### Added

- Published the `src` folder in the npm package to facilitate easier debugging by consumers of the library.

## [0.11.2] - 2024-01-31

### Updated Dependencies

- Updated `playwright` from version `1.40.0` to `1.41.1`.
- Updated all corresponding dependencies to their latest versions.

## [0.11.1] - 2024-01-31

### Fixed

- Corrected the path of the compiled `dist` folder by adjusting the `exports` section in `package.json` to properly include the `src` folder. This ensures correct resolution of module paths when the package is consumed.

## [0.11.0] - 2024-01-31

### Added

- Added Tests within the repository to ensure library updates function as expected.

### Changed

- Configuration to publish only the `src` folder, excluding test-related files and directories from the npm package.

## [0.10.1] - 2024-01-18

### Changed

- Moved page related functions from `action-utils` and `element-utils` to `page-utils`.
- `action-utils` to `page-utils` : `gotoURL`, `waitForPageLoadState`, `reloadPage`, `goBack`, `wait`
- - `element-utils` to `page-utils` : `getURL`, `getWindowSize`, `saveStorageState`

## [0.10.0] - 2024-01-17

### Updated Dependencies

- Updated `playwright` from version `1.40.1` to `1.41.0`.
- Updated all corresponding dependencies to their latest versions.

## [0.9.0] - 2024-01-09

### Added

- `expectElementNotToBeInViewport` reusable method for asserting an element's absence in the current viewport.
- `onlyVisible` parameter to locators in action-utils for enhanced stability and precision. `setDefaultLocatorFilterVisibility` to allow dynamic configuration.
- Getter and setter functions for `defaultLoadState` to allow dynamic configuration.

## [0.8.1] - 2023-12-14

### Updated

- `getFrame` method now throws an error if the frame is not found. Added an optional `force` parameter for conditional error handling.
- Updated all corresponding dependencies to their latest versions.

## [0.8.0] - 2023-12-03

### Changed

- Moved `playwright` from peer dependencies to dependencies section and updated from version `1.38.1` to `1.40.1`.
- Updated all corresponding dependencies to their latest versions.

### Updated Dependencies

- `@types/node` from `^20.8.7` to `^20.10.3`
- `@typescript-eslint/eslint-plugin` from `^6.8.0` to `^6.13.1`
- `@typescript-eslint/parser` from `^6.8.0` to `^6.13.1`
- `axios` from `^1.5.1` to `^1.6.2`
- `eslint` from `^8.52.0` to `^8.55.0`
- `eslint-config-prettier` from `^9.0.0` to `^9.1.0`
- `eslint-plugin-jsdoc` from `^46.8.2` to `^46.9.0`
- `eslint-plugin-playwright` from `^0.18.0` to `^0.19.0`
- `lint-staged` from `^15.0.2` to `^15.2.0`
- `prettier` from `^3.0.3` to `^3.1.0`
- `typescript` from `5.2.2` to `5.3.2`

### Notes

- This update includes significant dependency upgrades and a change in the way Playwright is included in the project. It is recommended to test existing functionalities thoroughly to ensure compatibility with the new versions.

## [0.7.3] - 2023-12-03

### Added

- Added `pressKeyboard` method to simulate keyboard interactions, such as pressing keys or key combinations.
- Added `getWindowSize` method to retrieve the current size of the browser window, including width and height.

## [0.7.2] - 2023-10-24

### Updated

- Updated package versions. Major updates to current latest versions include `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `allure-playwright`, and `lint-staged`.

## [0.7.1] - 2023-10-23

### Updated

- Changed the version specifier for the `@playwright/test` peer dependency from `^1.38.1` to `~1.38.1` to pin to patch releases and avoid a known issue in version 1.39.0. For more details on the issue, see [microsoft/playwright#27733](https://github.com/microsoft/playwright/issues/27733).

## [0.7.0] - 2023-09-25

### Breaking Changes

- Replaced the `type` reusable function with `pressSequentially`. This change enhances the typing simulation but may require updates to existing test scripts that use the `type` function.

### Updated

- Upgraded the Playwright dependency from version 1.37.1 to 1.38.1 to leverage new features and performance improvements.

## [0.6.3] - 2023-09-25

### Updated

- Upgraded all dependencies to their latest stable versions.

## [0.6.2] - 2023-09-25

### Fixed

- **`closePage` Function**: Resolved an issue where the optional parameter was not being handled correctly. This fix enhances the function's reliability and prevents unexpected behavior.

## [0.6.1] - 2023-09-19

### Fixed

- Fixed the assertions for page size.

## [0.6.0] - 2023-09-19

### Added

- Added `getAllPages` and `expectPageSizeToBeEqualTo` reusable functions.
- Added `getFrame` reusable function.

### Changed

- `saveStorageState` function will now return the storage state instead of `void`.

### Updated

- Updated all the dependencies to the latest versions.

### Optimized

- Optimized `page-utils` with better error handling for `switchPage`, `switchToDefaultPage`, `closePage` functions.
- Added `SwitchPageOptions` optional parameter type to `switchPage`.

## [0.5.4] - 2023-09-03

### Added

- Added new utility functions in `element-util`:
  - `waitForElementToBeAttached`: Waits for an element to be attached to the DOM.
  - `waitForElementToBeDetached`: Waits for an element to be detached from the DOM.
  - `waitForElementToBeVisible`: Waits for an element to be visible on the page.
  - `waitForElementToBeHidden`: Waits for an element to be hidden on the page.

## [0.5.3] - 2023-09-03

### Added

- Introduced `waitForElementToBeStable` function to improve element stability checks during test execution. This function waits for an element to be stable in its position before proceeding with further actions.

## [0.5.2] - 2023-09-01

### Fixed

- Fixed `clickByJS` to work correctly with both `SVGElement` and `HTMLElement` by adding type checks.

## [0.5.1] - 2023-08-30

### Added

- Introduced axios and Allure report as new dependencies.

### Updated

- Upgraded all dependencies to their latest stable versions.

## [0.5.0] - 2023-08-27

### Added

- Added Prettier linting support for Windows via the `cross-env` package.
- Included `src` directory in the npm package for easier source code debugging.

## [0.4.6] - 2023-08-23

### Fixed

- Removed the `postinstall` script to fix the installation issues.

## [0.4.5] - 2023-08-24

### Added

- Extended API by exporting various utility classes like `ActionUtils`, `AssertUtils`, `ElementUtils`, `LocatorUtils`, `PageUtils`, `ParameterTypes`, and `Timeouts`.

## [0.4.4] - 2023-08-22

### Added

- Exported `custom-logger` for enhanced logging capabilities.

## [0.4.3] - 2023-08-22

### Changed

- Removed `page-setup` library to avoid conflicts with Playwright Test's `test.beforeEach()` method.

## [0.4.2] - 2023-08-22

### Fixed

- Addressed an issue preventing the import of `Customlogger`.

## [0.4.1] - 2023-08-22

### Fixed

- Resolved import issues related to newly added libraries.

## [0.4.0] - 2023-08-22

### Changed

- Optimized `devDependencies`, `dependencies`, and `peerDependencies` for better project compatibility.

### Updated

- Updated all dependencies to the latest versions.

### Added

- Introduced `assert-utils` for advanced Playwright assertions.
- Added `custom-logger` for improved and colored console output.
- Implemented `page-setup` for pre-test page configurations.

## [0.3.0] - 2023-08-22

### Changed

- Migrated from `playwright` to `@playwright/test` for enhanced test handling.

## [0.2.0] - 2023-08-21

### Added

- Enabled relative imports for utility functions.

## [0.1.0] - 2023-08-20

### Added

- Initial release with basic functionalities.
