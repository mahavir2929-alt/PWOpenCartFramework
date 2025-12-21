import { Locator, Page } from "@playwright/test";
import { ElementUtil } from "../utils/ElementUtil";
import {HomePage} from '../pages/HomePage'
import {RegisterPage} from '../pages/RegisterPage'

export class Loginpage {
  private readonly page: Page;
  private readonly eleUtil: ElementUtil;
  readonly emailId: Locator;
  readonly password: Locator;
  readonly loginBtn: string;
  readonly warningMsg: Locator;
  private readonly registerLink:Locator

  constructor(page: Page) {
    this.page = page;
    this.eleUtil = new ElementUtil(page);
    this.emailId = page.getByRole("textbox", { name: "E-Mail Address" });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.loginBtn = `input[type="submit"][value="Login"]`;
    this.warningMsg = page.locator(".alert.alert-danger.alert-dismissible");
    this.registerLink=page.getByText('Register',{exact:true})
  }

  async goTologinPage(baseURL:string|undefined) {
    await this.page.goto(
      baseURL+'route=account/login'
    );
  }

  async doLogin(email: string, password: string): Promise<HomePage> {
    await this.eleUtil.fill(this.emailId, email);
    await this.eleUtil.fill(this.password, password);
    await this.eleUtil.click(this.loginBtn);
    return new HomePage(this.page)
    //const pageTitle = await this.page.title();
    //console.log(`home page title :${pageTitle}`);
    //return pageTitle;

  }

  async getinvalidLoginMsg(): Promise<string | null> {
    const errortext = await this.eleUtil.getText(this.warningMsg);
    console.log("error text is " + errortext);
    return errortext;
  }

  async navigateToRegisterPage():Promise<RegisterPage>{
    this.eleUtil.click(this.registerLink,{force:true},1)
    return new RegisterPage(this.page)
   
  }

}
