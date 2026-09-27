import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) { super(page); }

  async goto(): Promise<void> { await this.open('/web/index.php/auth/login'); }

  async login(username: string, password: string): Promise<void> {
    await this.fill(this.page.getByPlaceholder('Username'), username);
    await this.fill(this.page.getByPlaceholder('Password'), password);
    await this.click(this.page.getByRole('button', { name: 'Login' }));
  }

  async expectInvalidCredentials(): Promise<void> {
    await expect(this.page.getByText('Invalid credentials', { exact: true })).toBeVisible();
  }

  async expectLoginPageVisible(): Promise<void> {
    await expect(this.page).toHaveURL(/auth\/login/);
  }
}
