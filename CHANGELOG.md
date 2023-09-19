# Changelog

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
