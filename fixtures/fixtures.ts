import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { AdminPage } from '../pages/AdminPage';
import { AddUserPage } from '../pages/AddUserPage';

type MyFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    adminPage: AdminPage;
    addUserPage: AddUserPage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
    adminPage: async ({ page }, use) => {
        await use(new AdminPage(page));
    },
    addUserPage: async ({ page }, use) => {
        await use(new AddUserPage(page));
    },
});

export { expect } from '@playwright/test';
