# Changelog

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
