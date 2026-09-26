import { Page, Locator } from "@playwright/test";

export class DashboardPage {

    readonly page: Page;
    readonly dashboardHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        // this.dashboardHeading = page.locator("//h6[@class='oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module']");
        this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    }

    async isDashboardVisible(): Promise<boolean> {
        return await this.dashboardHeading.isVisible();
    }
}


