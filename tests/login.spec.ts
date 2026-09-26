import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import loginData from '../test-data/loginData.json';

let loginPage!: LoginPage;
let dashboardPage!: DashboardPage;

test.beforeEach(async ({ page }) => {

  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);

  await loginPage.navigate();
});

test("Verify valid login", async ({ page }) => {

  await loginPage.login(
    loginData.validUser.username,
    loginData.validUser.password
  );

  await expect(dashboardPage.dashboardHeading).toBeVisible();

});

test("Verify invalid login", async ({ page }) => {

  await loginPage.login(
    loginData.invalidUser.username,
    loginData.invalidUser.password
  );

  await expect(loginPage.username).toBeVisible();
});