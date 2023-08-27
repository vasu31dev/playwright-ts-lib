# Changelog

## [0.5.0] - 2023-08-27

### Added

- Introduced Prettier linting support for Windows through the `cross-env` package.
- Included `src` directory in the npm package to facilitate source code debugging.

## [0.4.6] - 2023-08-23

### Fixed

- Removed the `postinstall` script to prevent installation issues.

## [0.4.5] - 2023-08-24

### Added

- Extended the API by exporting `ActionUtils`, `AssertUtils`, `ElementUtils`, `LocatorUtils`, `PageUtils`, `ParameterTypes`, and `Timeouts`.

## [0.4.4] - 2023-08-22

### Added

- Introduced an export for the `custom-logger` to enhance logging capabilities.

## [0.4.3] - 2023-08-22

### Changed

- Eliminated the `page-setup` library to resolve conflicts with Playwright Test's `test.beforeEach()`.

## [0.4.2] - 2023-08-22

### Fixed

- Resolved an issue where `Customlogger` was not available for import.

## [0.4.1] - 2023-08-22

### Fixed

- Fixed import issues with newly added libraries.

## [0.4.0] - 2023-08-22

### Changed

- Refined `devDependencies`, `dependencies`, and `peerDependencies` for better compatibility with consuming projects.
- Updated all dependencies to their latest versions.

### Added

- Introduced `assert-utils` library for enhanced Playwright assertions.
- Added `custom-logger` library for improved logging and colored console output.
- Implemented `page-setup` library to configure the page before each test.

## [0.3.0] - 2023-08-22

### Changed

- Transitioned from `playwright` to `@playwright/test` for better test handling.

## [0.2.0] - 2023-08-21

### Added

- Enabled relative imports for utility functions.

## [0.1.0] - 2023-08-20

### Added

- Initial release with basic features.
