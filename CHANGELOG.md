## [0.4.5] - 2023-08-24

### Added

- Added export for ActionUtils, AssertUtils, ElementUtils, LocatorUtils, PageUtils, ParameterTypes, Timeouts

## [0.4.4] - 2023-08-22

### Added

- export for custom-logger

## [0.4.3] - 2023-08-22

### Changed

- Removed page-setup library to avoid error like Playwright Test did not expect test.beforeEach()

## [0.4.2] - 2023-08-22

### Fixed

- Fixed Customlogger export to be available for import

## [0.4.1] - 2023-08-22

### Fixed

- Fixed newly added libraries to be available to be imported

## [0.4.0] - 2023-08-22

### Changed

- Changed devDependencies, dependencies and peerDependencies so that consuming project will have the dependencies available as needed.
- Updated all the dependencies to latest version.

### Added

- assert-utils library for playwright assertions
- custom-logger library for logging and colored outputs
- page-setup library to setPage before each test

## [0.3.0] - 2023-08-22

### Changed

- Replaced playwright with @playwright/test dependency

## [0.2.0] - 2023-08-21

### Added

- Relative imports for utilities

## [0.1.0] - 2023-08-20

### Added

- Initial release.
