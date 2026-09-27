import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  constructor(page: Page) { super(page); }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/dashboard\/index/);
    await expect(this.page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  }

  async expectLoggedInUserVisible(): Promise<void> {
    await expect(this.page.locator('.oxd-userdropdown-tab')).toBeVisible();
    await expect(this.page.locator('.oxd-userdropdown-tab')).toHaveText(/\S+/);
  }

  async openPim(): Promise<void> {
    await this.click(this.page.getByRole('link', { name: 'PIM' }));
    await expect(this.page).toHaveURL(/pim\/viewEmployeeList/);
  }
}
