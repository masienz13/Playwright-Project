import { test as base, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { AddEmployeePage } from '../pages/pim/AddEmployeePage';
import { EmployeeListPage } from '../pages/pim/EmployeeListPage';

interface PomFixtures {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  addEmployeePage: AddEmployeePage;
  employeeListPage: EmployeeListPage;
}

export const test = base.extend<PomFixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  dashboardPage: async ({ page }, use) => use(new DashboardPage(page)),
  addEmployeePage: async ({ page }, use) => use(new AddEmployeePage(page)),
  employeeListPage: async ({ page }, use) => use(new EmployeeListPage(page)),
});

export { expect };
