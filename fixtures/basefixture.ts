import { test as base, expect } from "@playwright/test";
import { Loginpage } from "../pages/Loginpage";
import { HomePage } from "../pages/HomePage";

type Myfixtures = {
  homePage: HomePage;
};

export const test = base.extend<Myfixtures>({
  homePage: async ({ page, baseURL }, use, testInfo) => {
    const loginPage = new Loginpage(page);
    await loginPage.goTologinPage(baseURL);

    const username = testInfo.project.metadata.appUsername;
    const password = testInfo.project.metadata.appPassword;

    const homePage = await loginPage.doLogin(username, password);
    expect(homePage.isUserLoggedIn()).toBeTruthy();

    await use(homePage);
  },
});

export{expect}