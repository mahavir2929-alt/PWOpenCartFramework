import { Locator, Page } from "@playwright/test";
import { ElementUtil } from "../utils/ElementUtil";

export class Loginpage {
  private readonly page: Page;
  readonly eleUtil: ElementUtil;
  readonly emaildId: Locator;
  readonly password: Locator;
  readonly loginBtn: string;
  readonly warningMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.eleUtil = new ElementUtil(page);
    this.emaildId = page.getByRole("textbox", { name: "E-Mail Address" });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.loginBtn = `input[type="submit"][value="Login"]`;
    this.warningMsg = page.locator(".alert.alert-danger.alert-dismissible");
  }

  async goTologinPage() {
    await this.page.goto(
      "https://naveenautomationlabs.com/opencart/index.php?route=account/login"
    );
  }

  async doLogin(email: string, password: string): Promise<string> {
    await this.eleUtil.fill(this.emaildId, email);
    await this.eleUtil.fill(this.password, password);
    await this.eleUtil.click(this.loginBtn);
    let pageTitle = this.page.title();
    console.log(`page titile is:${pageTitle} `);
    return pageTitle;
  }

 async getInavlidLoginMessage():Promise <string|null>{
    let errorText=this.eleUtil.getText(this.warningMsg)
    return errorText  
}




}
