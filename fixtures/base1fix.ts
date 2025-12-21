import { test as base, expect } from "@playwright/test";
import { Loginpage } from "../pages/Loginpage";
import { HomePage } from "../pages/HomePage";

type MyFixtures = {
  homePage: HomePage;
};

export const test=base.extend<MyFixtures>({
  homePage: async ({ page, baseURL }, use, testinfo) => {
    const loginPage = new Loginpage(page);
    await loginPage.goTologinPage(baseURL);

    const username = testinfo.project.metadata.appUsername;
    const password = testinfo.project.metadata.appPassword;

    const homePage = await loginPage.doLogin(username, password);
    expect(await homePage.isUserLoggedIn()).toBeTruthy();

    await use(homePage)
  },
});

export {expect}