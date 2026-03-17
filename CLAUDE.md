# Project: vasu-playwright-utils

Playwright TypeScript utility library providing reusable helper methods for browser automation and testing.

## Build & Run

- **Build:** `npm run build` (runs `tsc -p tsconfig.build.json`, cleans `dist/` first)
- **Type check:** `npm run validate` (runs `tsc --noEmit`)
- **Clean:** `npm run clean` (removes `dist/`)
- **Full reset:** `npm run ready` (removes dist, node_modules, reinstalls, validates, builds, tests)

## Test

- **All tests:** `npm test` (Playwright Test)
- **Chromium only:** `npm run test:chromium`
- **Headed (local dev):** `npm run local`
- **Smoke/Regression:** `npm run test:smoke`, `npm run test:reg`

## Lint & Format

- **Lint:** `npm run lint`
- **Lint fix:** `npm run lint:fix`
- **Format:** `npm run format` (Prettier)

## Architecture

```
src/vasu-playwright-lib/
  index.ts              # Main entry, re-exports everything
  utils/
    action-utils.ts     # click, fill, hover, drag, alerts, download, upload
    assert-utils.ts     # expectElement*, expectPage* assertions
    locator-utils.ts    # getLocator, getLocatorByRole/Text/TestId, frames
    element-utils.ts    # getText, isElementVisible, waitForElement*
    page-utils.ts       # setPage/getPage, gotoURL, navigation, switchPage
    api-utils.ts        # getRequest, postRequest, putRequest, deleteRequest
  types/
    optional-parameter-types.ts  # All option types (ClickOptions, FillOptions, etc.)
  constants/            # Timeouts, load state defaults
  setup/                # Test setup helpers, custom logger
```

### Subpath Exports

Consumers can import from the main package or specific subpaths:

```typescript
import { click, fill } from 'vasu-playwright-utils';
import { click } from 'vasu-playwright-utils/action-utils';
import { expectElementToBeVisible } from 'vasu-playwright-utils/assert-utils';
```

## Coding Conventions

- All exported functions have JSDoc comments
- Functions are `async` and accept `string | Locator` as input
- Options use the pattern: `options?: XxxOptions` (intersection types from Playwright + custom extensions)
- Visibility is enforced by default (`onlyVisible: true`); callers can opt out with `{ onlyVisible: false }`
- `setPage(page)` must be called before using any utility functions

## AI Agents

Specialized agents are available in `agents/` (symlinked from `.claude/agents/`) for browser testing workflows:

- **playwright-test-planner** (green) - Explores a web app and creates a comprehensive test plan in `specs/`
- **playwright-test-generator** (blue) - Executes test plan steps in the browser and generates test files using `vasu-playwright-utils`
- **playwright-test-healer** (red) - Debugs and fixes failing Playwright tests

All agents use `playwright-cli` bash commands for browser interaction (not MCP).

When the user asks to create a test plan, generate a test, or fix a failing test, use the corresponding agent.

When the user doesn't specify a file, agents should search `tests/specs/`, `tests/pages/`, and `specs/` for existing files matching the context (app name, feature, URL) before creating new ones.

## AI Skills

Skills are available in `.claude/skills/` and are auto-discovered:

- **playwright-cli** — Browser automation commands. When writing or verifying Playwright tests, **always use `playwright-cli`** to open the URL, take a snapshot, and interact with the page to capture real selectors. Never guess selectors — verify them in the browser first.
- **vasu-playwright-utils** — Library API and locator strategy. Follow `references/locators.md` for locator priority when writing selectors.
- **Browser strategy** — Agents follow a tiered approach: `WebFetch` for reconnaissance, `playwright-cli` for interactive discovery and selector capture. Users can say "use browser mode" or "use lite mode" to override. See `references/browser-strategy.md`.

Source of truth for skills shipped in npm: `skills/vasu-playwright-utils/` (symlinked from `.claude/skills/vasu-playwright-utils`).

## Code Formatting

After writing or editing `.ts` files, run `npx prettier --write` on the changed files. This project uses Prettier (config in `.prettierrc`).
