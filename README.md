# Hobby Collection Test Automation

## Overview

Automation testing for Hobby Collection web application.

## Scope
- UI Testing
- API Testing
- Performance Testing

## Tools
- Playwright
- Typsecript
- Axios
- k6

## Project Structure

- `src/api`: API tests against the Go backend.
- `src/e2e`: E2E UI tests against the React frontend.
- `src/performance`: k6 performance tests.
- `src/global-setup.ts`: Handles initial authentication (JWT) and prepares the test environment.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```
3. Copy `.env.example` to `.env` and fill in your details:
   ```bash
   cp .env.example .env
   ```

## Running Tests

Run all tests:
```bash
npx playwright test
```

Run only API tests:
```bash
npx playwright test --project=api
```

Run only E2E tests:
```bash
npx playwright test --project=e2e-chromium
```
