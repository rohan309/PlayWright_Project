import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import loginData from '../test-data/loginData.json';

test("Verify valid login)", async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.navigate();

  await loginPage.login(
    loginData.validUser.username,
    loginData.validUser.password
  );

  await expect(dashboardPage.dashboardHeading).toBeVisible();
});