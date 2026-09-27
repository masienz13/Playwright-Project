import { expect, type Locator, type Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  protected async click(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.click();
  }

  protected async fill(locator: Locator, value: string): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.fill(value);
  }

  protected async waitForPageReady(): Promise<void> {
    await this.page.locator('body').waitFor({ state: 'visible' });
    const spinner = this.page.locator('.oxd-loading-spinner');
    if (await spinner.count()) await spinner.first().waitFor({ state: 'hidden' });
  }

  async open(path: string): Promise<void> {
    await this.page.goto(path);
    await this.waitForPageReady();
  }
}
