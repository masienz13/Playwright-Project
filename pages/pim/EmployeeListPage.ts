import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class EmployeeListPage extends BasePage {
  constructor(page: Page) { super(page); }

  async open(): Promise<void> {
    await this.click(this.page.getByRole('link', { name: 'PIM' }));
    await expect(this.page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();
  }

  private getField(label: string): Locator {
    return this.page.locator('.oxd-input-group').filter({ has: this.page.getByText(label, { exact: true }) }).locator('input').first();
  }

  private employeeRow(firstName: string, middleName: string, lastName: string): Locator {
    const row = this.page.getByRole('row').filter({ has: this.page.getByRole('cell', { name: lastName, exact: true }) });
    return row.filter({ hasText: `${firstName} ${middleName}` });
  }

  async searchByName(firstName: string, middleName: string, lastName: string, selectSuggestion = true): Promise<void> {
    const fullName = `${firstName} ${middleName} ${lastName}`;
    await this.fill(this.getField('Employee Name'), fullName);
    if (selectSuggestion) {
      const suggestion = this.page.locator('.oxd-autocomplete-option').filter({ hasText: fullName }).first();
      await expect(suggestion).toBeVisible();
      await suggestion.click();
    }
    await this.click(this.page.getByRole('button', { name: 'Search' }));
    await this.page.locator('.oxd-loading-spinner').waitFor({ state: 'hidden' }).catch(() => undefined);
  }

  async expectEmployeeRow(firstName: string, middleName: string, lastName: string): Promise<void> {
    await expect(this.employeeRow(firstName, middleName, lastName)).toBeVisible();
  }

  async openEmployee(firstName: string, middleName: string, lastName: string): Promise<void> {
    await this.click(this.employeeRow(firstName, middleName, lastName).getByRole('cell').nth(1));
    await expect(this.page.getByRole('tab', { name: 'Personal Details' })).toBeVisible();
  }

  async updatePersonalDetails(nationality: string, dateOfBirth: string): Promise<void> {
    const nationalityGroup = this.page.locator('.oxd-input-group').filter({ has: this.page.getByText('Nationality', { exact: true }) });
    await this.click(nationalityGroup.locator('.oxd-select-text'));
    await this.click(this.page.getByRole('option', { name: nationality, exact: true }));

    await this.fill(this.getField('Date of Birth'), dateOfBirth);
    await this.click(this.page.locator('form').getByRole('button', { name: 'Save' }).first());
    await expect(this.page.getByText('Successfully Updated')).toBeVisible();
  }

  async deleteEmployee(firstName: string, middleName: string, lastName: string): Promise<void> {
    const row = this.employeeRow(firstName, middleName, lastName);
    await this.click(row.getByRole('button').last());
    const dialog = this.page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await this.click(dialog.getByRole('button', { name: 'Yes, Delete' }));
    await expect(this.page.getByText('Successfully Deleted')).toBeVisible();
  }

  async expectNoRecords(): Promise<void> {
    await expect(this.page.locator('span.oxd-text--span').getByText('No Records Found', { exact: true })).toBeVisible();
  }

  async expectListPage(): Promise<void> {
    await expect(this.page).toHaveURL(/pim\/viewEmployeeList/);
  }
}

