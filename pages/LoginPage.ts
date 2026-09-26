import { Page, Locator } from "@playwright/test";

export class LoginPage {

    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly usernameRequired: Locator;
    readonly passwordRequired: Locator;
    readonly invalidCredentialsMessage: Locator;

    constructor(page: Page) {

        this.page = page;

        this.username =
            page.locator("//input[@placeholder='Username']");

        this.password =
            page.locator("//input[@placeholder='Password']");

        this.loginButton =
            page.locator("//button[@type='submit']");

        this.invalidCredentialsMessage =
            page.getByText('Invalid credentials');
            //p[@class='oxd-text oxd-text--p oxd-alert-content-text']

        this.usernameRequired =
            page.locator("//div[@class='orangehrm-login-slot-wrapper']//div[1]//div[1]//span[1]");

        this.passwordRequired =
            page.locator("//div[@class='orangehrm-login-form']//div[2]//div[1]//span[1]");

    } 

    async navigate() {
        await this.page.goto('/');
    }

    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}