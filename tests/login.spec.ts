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

const loginInvalidData: string[][] = [
  // Username       Password       Scenario              Expected Output
  ["WrongAdmin", "admin123", "Invalid username", "Invalid credentials"],
  ["Admin", "wrong123", "Invalid password", "Invalid credentials"],
  ["WrongAdmin", "wrong123", "Both invalid", "Invalid credentials"],
  ["", "admin123", "Empty username", "Required"],
  ["Admin", "", "Empty password", "Required"],
  ["", "", "Both fields empty", "Required"]
];

for (const [username, password, scenario, expectedOutput] of loginInvalidData) {

  test(`Verify ${scenario}`, async ({ page }) => {

    await loginPage.login(username, password);

    if (expectedOutput === "Dashboard") {

      await expect(
        dashboardPage.dashboardHeading
      ).toBeVisible();

    } else if (expectedOutput === "Invalid credentials") {

      await expect(
        loginPage.invalidCredentialsMessage
      ).toHaveText("Invalid credentials");

    } else if (scenario === "Empty username") {

      await expect(
        loginPage.usernameRequired
      ).toHaveText("Required");

    } else if (scenario === "Empty password") {

      await expect(
        loginPage.passwordRequired
      ).toHaveText("Required");

    } else if (scenario === "Both fields empty") {

      await expect(
        loginPage.usernameRequired
      ).toHaveText("Required");

      await expect(
        loginPage.passwordRequired
      ).toHaveText("Required");
    }
  })
};