import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

console.log("BASE_URL:", process.env.BASE_URL);

export default defineConfig({

    testDir: './tests',

    timeout: 30000,

    expect: {
        timeout: 5000
    },

    retries: 1,

    reporter: [
        ['html'],
        ['allure-playwright']
    ],

    use: {
        baseURL: process.env.BASE_URL,

        headless: false,

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',

        trace: 'on-first-retry'
    },

    projects: [
        {
            name: 'chromium',
            use: {
                browserName: 'chromium',
                viewport: null,
                launchOptions: {
                    args: ['--start-maximized']
                }
            }
        }


        /*{
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] }
        }*/
    ]
});