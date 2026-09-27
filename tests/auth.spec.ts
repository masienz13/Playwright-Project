import { test } from '../fixtures/pom-fixtures';

const username = process.env.ORANGEHRM_USERNAME;
const password = process.env.ORANGEHRM_PASSWORD;
if (!username || !password) throw new Error('ORANGEHRM_USERNAME and ORANGEHRM_PASSWORD must be set in .env.');

test.describe('Authentication', () => {
  test('TC01 login success reaches dashboard', async ({ loginPage, dashboardPage }) => {
    await loginPage.goto();
    await loginPage.login(username, password);
    await dashboardPage.expectLoaded();
    await dashboardPage.expectLoggedInUserVisible();
  });

  test('TC02 invalid password shows credentials error', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(username, `Invalid-${Date.now()}!`);
    await loginPage.expectInvalidCredentials();
    await loginPage.expectLoginPageVisible();
  });
});

