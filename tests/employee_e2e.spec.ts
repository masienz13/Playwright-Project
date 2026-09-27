import { test } from '../fixtures/pom-fixtures';
import { generatedEmployeeCredentials, uniqueEmployeeId, uniqueSuffix } from '../utils/Helper';
import employees from '../data/employees.json';
import path from 'node:path';

const adminUsername = process.env.ORANGEHRM_USERNAME;
const adminPassword = process.env.ORANGEHRM_PASSWORD;
if (!adminUsername || !adminPassword) throw new Error('Set OrangeHRM admin credentials in .env.');

for (const employee of employees) {
  test(`TC03-TC06 CRUD employee data: ${employee.firstName}`, async ({
    loginPage, dashboardPage, addEmployeePage, employeeListPage,
  }) => {
    const suffix = uniqueSuffix();
    const firstName = employee.firstName;
    const lastName = `${employee.lastName}${suffix}`;
    const employeeId = uniqueEmployeeId();
    const credentials = generatedEmployeeCredentials();
    const avatarPath = path.resolve(__dirname, '../data/avatar.jpg');

    await loginPage.goto();
    await loginPage.login(adminUsername, adminPassword);
    await dashboardPage.expectLoaded();

    await addEmployeePage.open();
    await addEmployeePage.createEmployee({
      firstName,
      middleName: employee.middleName,
      lastName,
      employeeId,
      username: credentials.username,
      password: credentials.password,
      avatarPath,
    });

    await employeeListPage.open();
    await employeeListPage.searchByName(firstName, employee.middleName, lastName);
    await employeeListPage.expectEmployeeRow(firstName, employee.middleName, lastName);
    await employeeListPage.openEmployee(firstName, employee.middleName, lastName);
    await employeeListPage.updatePersonalDetails(employee.nationality, employee.dateOfBirth);

    await employeeListPage.open();
    await employeeListPage.searchByName(firstName, employee.middleName, lastName);
    await employeeListPage.deleteEmployee(firstName, employee.middleName, lastName);
    await employeeListPage.searchByName(firstName, employee.middleName, lastName, false);
    await employeeListPage.expectNoRecords();
    await employeeListPage.expectListPage();
  });
}
