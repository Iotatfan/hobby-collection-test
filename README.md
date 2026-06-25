# Hobby Collection Test Automation

## Overview

Automation test suite for the Hobby Collection web application. This repository uses Playwright to cover API and E2E UI flows for the Hobby Collection frontend and backend.

## Scope

- API testing for backend endpoints.
- E2E UI testing for the React frontend.
- BDD scenario documentation for collection workflows.
- CI execution through GitHub Actions.
- Performance testing is planned but not implemented yet.

## Tools

- Playwright
- TypeScript
- dotenv
- GitHub Actions
- k6 (planned)

## Project Structure

| Path | Purpose |
| --- | --- |
| `src/api/tests` | Playwright API tests. |
| `src/e2e/tests` | Playwright E2E UI tests. |
| `src/e2e/pages` | Page Object classes used by E2E tests. |
| `src/global-setup.ts` | Gets a JWT token and writes `state.json` for authenticated E2E tests. |
| `features` | Gherkin feature files. |
| `docs` | Test case and BDD documentation. |
| `.github/workflows/playwright.yml` | CI workflow for API and E2E tests. |
| `playwright.config.ts` | Playwright project configuration. |

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

3. Copy `.env.example` to `.env` and fill in your local values:
   ```bash
   cp .env.example .env
   ```

4. Make sure the backend and frontend are running before executing tests.

## Environment Variables

| Variable | Description | Example |
| --- | --- | --- |
| `API_BASE_URL` | Backend API base URL. | `http://localhost:8080` |
| `FE_BASE_URL` | Frontend app base URL. | `http://localhost:5173` |
| `TEST_USER_PASSWORD` | Password used by `global-setup.ts` to request a JWT token. | `change_me` |

## Running Tests

Run all tests:
```bash
npm test
```

Run only Read Only API tests:
```bash
npx playwright test --project=api-read
```

Run only E2E tests:
```bash
npx playwright test --project=e2e-chromium
```

Open the latest Playwright HTML report:
```bash
npx playwright show-report
```

## Implementation Checklist

### Project Setup

| Done | Item | Current Coverage | Remaining Work |
| --- | --- | --- | --- |
| [x] | Playwright setup | `playwright.config.ts` defines API and E2E projects, retries, workers, and HTML reporting. | Add more reporters if needed for CI summaries, such as JUnit. |
| [x] | Environment setup | `.env.example` documents API, frontend, and test password variables. | Add validation for missing required environment variables. |
| [x] | Authentication setup | `src/global-setup.ts` requests a JWT token and stores it in `state.json`. | Fail fast when authentication is required but token generation fails. |
| [ ] | CI pipeline | GitHub Actions checks out backend/frontend/test repos, starts services, runs Playwright, and uploads the report. | Confirm service start commands and ports match the current frontend/backend projects. |
| [ ] | Test data management | Tests currently depend on available backend/frontend data. | Add fixtures, setup/teardown, or API seeding for deterministic tests. |

### Collection List

| Done | Item | Current Coverage | Remaining Work |
| --- | --- | --- | --- |
| [x] | Page Object | `CollectionListPage` centralizes selectors for cover images, statistics, category tabs, and badges. | Add selectors as new collection list behavior is tested. |
| [x] | E2E: collection cards | `collectionList.e2e.spec.ts` verifies collection cards are shown. | Add empty state and loading state coverage. |
| [x] | E2E: statistics | Verifies `Total Items`, `Completed`, `Backlog`, and `P-Bandai / Limited` stats are visible. | Add failure-state coverage when the statistics API returns an error. |
| [x] | E2E: category filters | Verifies filters are working when selected. | Add mocked API responses for deterministic category data. |
| [ ] | E2E: API error handling | BDD scenarios describe error behavior. | Add Playwright tests for list API failure and statistics API failure. |
| [ ] | API: collection list schema | `collectionList.api.spec.ts` checks `GET /collection` returns a successful response. | Add response body, schema, pagination, filtering, and unauthorized/error assertions. |

### Collection Detail

| Done | Item | Current Coverage | Remaining Work |
| --- | --- | --- | --- |
| [ ] | Page Object | Not implemented. | Add `CollectionDetailPage` for detail title, image, metadata, status, and navigation selectors. |
| [ ] | E2E tests | Not implemented. | Add tests for opening a collection detail page and validating displayed data. |
| [ ] | API tests | Not implemented. | Add detail endpoint coverage for success, not found, and unauthorized responses. |
| [ ] | BDD scenarios | Placeholder exist. | Complete scenarios for successful detail loading and error handling. |

### Collection Upload Form

| Done | Item | Current Coverage | Remaining Work |
| --- | --- | --- | --- |
| [ ] | Page Object | Not implemented. | Add `CollectionUploadPage` for form fields, file input, submit button, validation messages, and success/error states. |
| [ ] | E2E tests | Not implemented.  | Add tests for successful upload, required fields, validation errors, and file handling. |
| [ ] | API tests | Not implemented. | Add create/upload endpoint coverage for success, validation errors, and unauthorized responses. |
| [ ] | BDD scenarios | Placeholder exist.  | Define upload form scenarios before automating the full flow. |

### Collection Edit Form

| Done | Item | Current Coverage | Remaining Work |
| --- | --- | --- | --- |
| [ ] | Page Object | Not implemented. | Add `CollectionEditPage` for prefilled form fields, save/cancel controls, validation messages, and success/error states. |
| [ ] | E2E tests | Not implemented.  | Add tests for prefilled data, successful update, validation, cancel flow, and API failure handling. |
| [ ] | API tests | Not implemented. | Add update endpoint coverage for success, validation errors, not found, and unauthorized responses. |
| [ ] | BDD scenarios | Placeholder exist.  | Define edit form scenarios before automating the full flow. |

### Collection Shelves

| Done | Item | Current Coverage | Remaining Work |
| --- | --- | --- | --- |
| [ ] | Page Object | Not implemented. | Add `CollectionShelvesPage` after shelves behavior is defined. |
| [ ] | E2E tests | Not implemented. | Define expected UI behavior, then add E2E coverage. |
| [ ] | API tests | Not implemented. | Add shelves endpoint coverage when backend behavior is available. |
| [ ] | BDD scenarios | Placeholder exist. | Write scenarios for shelves list, shelf detail, and shelf item behavior. |

### Documentation

| Done | Item | Current Coverage | Remaining Work |
| --- | --- | --- | --- |
| [x] | README | Documents setup, commands, project structure, and implementation checklist. | Keep updated as features are added. |
| [x] | BDD: collection list | `features/collectionList.feature` and `docs/bdd-features.md` describe collection list scenarios. | Fix typos and remove duplicate scenario names. |
| [ ] | BDD: other features | Detail, upload, edit, and shelves sections are placeholders. | Add complete scenarios for each feature. |

### Performance

| Done | Item | Current Coverage | Remaining Work |
| --- | --- | --- | --- |
| [ ] | k6 setup | Not implemented. | Add k6 scripts under `src/performance` or a dedicated `performance` folder. |
| [ ] | Performance scenarios | Not implemented. | Add scenarios for collection list API, detail API, and high-traffic user journeys. |

## Notes

- `state.json`, `playwright-report`, and `test-results` are generated during test execution.
- Keep selectors in Page Object files when adding E2E coverage.
