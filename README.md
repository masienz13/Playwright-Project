# OrangeHRM Automation

Playwright + TypeScript capstone for authentication and employee CRUD.

## Setup

1. Install Node.js 20 or newer.
2. Install Java (required by the Allure CLI), then run `npm ci` and `npx playwright install chromium`.
3. Copy `.env.example` to `.env` and set `ORANGEHRM_BASE_URL`, `ORANGEHRM_USERNAME`, and `ORANGEHRM_PASSWORD` for your OrangeHRM instance.
4. Run `npm test`.

The configured base URL should be the OrangeHRM host, for example `https://host.example`; tests navigate to `/web/index.php/auth/login`.

## Tests

- `tests/auth.spec.ts`: successful and failed login.
- `tests/employee_e2e.spec.ts`: employee create, search, update, and delete driven by multiple profiles in `data/employees.json`.
- Tests use Page Objects from `fixtures/pom-fixtures.ts`; selectors and UI actions stay in the page classes.

## Reports

Playwright retains trace, video, and screenshots on failure in `test-results/`. Allure results are written to `allure-results/`; use `npm run test:report` to generate an HTML report.

## GitHub Actions

Add repository secrets `ORANGEHRM_BASE_URL`, `ORANGEHRM_USERNAME`, and `ORANGEHRM_PASSWORD`. The regression workflow runs on pushes and pull requests and uploads Playwright and Allure artifacts.



