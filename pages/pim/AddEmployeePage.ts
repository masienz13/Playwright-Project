import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class AddEmployeePage extends BasePage {
  constructor(page: Page) { super(page); }

  async open(): Promise<void> {
    await this.click(this.page.getByRole('link', { name: 'PIM' }));
    await this.click(this.page.getByRole('link', { name: 'Add Employee' }));
    await expect(this.page.getByRole('heading', { name: 'Add Employee' })).toBeVisible();
  }

  private getField(label: string): Locator {
    return this.page.locator('.oxd-input-group').filter({ has: this.page.getByText(label, { exact: true }) }).locator('input').first();
  }

  async createEmployee(input: {
    firstName: string; middleName: string; lastName: string; employeeId: string;
    username: string; password: string; avatarPath: string;
  }): Promise<void> {
    await this.fill(this.page.getByPlaceholder('First Name'), input.firstName);
    await this.fill(this.page.getByPlaceholder('Middle Name'), input.middleName);
    await this.fill(this.page.getByPlaceholder('Last Name'), input.lastName);
    await this.fill(this.getField('Employee Id'), input.employeeId);
    await this.page.locator('input[type="file"]').setInputFiles(input.avatarPath);
    await this.page.locator('.oxd-form-loader').waitFor({ state: 'hidden' });

    await this.click(this.page.locator('.oxd-switch-input'));
    await expect(this.page.getByRole('checkbox')).toBeChecked();
    await this.page.locator('.oxd-form-loader').waitFor({ state: 'hidden' });
    await this.fill(this.getField('Username'), input.username);
    await this.fill(this.getField('Password'), input.password);
    await this.fill(this.getField('Confirm Password'), input.password);

    await this.click(this.page.getByRole('button', { name: 'Save' }));
    await expect(this.page.getByText('Successfully Saved')).toBeVisible();
  }
}

