//import { expect, test } from "@playwright/test";
import { Loginpage } from "../pages/Loginpage";
import { HomePage } from "../pages/HomePage";
import { expect, test } from "../fixtures/basefixture";

test("verify valid login @login", async ({ homePage }) => {
 await expect(homePage.page).toHaveTitle('My Account')
 
});

test ('verify invalid login',async ({page,baseURL})=>{
    let loginPage = new Loginpage(page);
    await loginPage.goTologinPage(baseURL);   
    await loginPage.doLogin("opencart11@open.com", "opencart");
    let errorMsg1=await loginPage.getinvalidLoginMsg()
    expect(errorMsg1).toContain(' Warning: No match for E-Mail Address and/or Password.')


})