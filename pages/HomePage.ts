import { Locator, Page } from "@playwright/test";
import { ElementUtil } from "../utils/ElementUtil";
import { Loginpage } from "./Loginpage";
import {Resultspage} from '../pages/ResultsPage'

export class HomePage {
   readonly page: Page;
  private readonly eleUtil: ElementUtil;
  private readonly logoutLink: Locator;
  private readonly loginLink: Locator;
  private readonly search: Locator;
  private readonly searchIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.eleUtil = new ElementUtil(page);
    this.logoutLink = page.getByRole("link", { name: "Logout" });
    this.loginLink=page.getByRole('link', { name: 'Login' })
    this.search = page.getByRole("textbox", { name: "Search" });
    this.searchIcon = page.locator(
      `#search > span.input-group-btn > button.btn`
    );
  }
  async isUserLoggedIn(): Promise<boolean> {
    return await this.eleUtil.isVisible(this.logoutLink, 0);
  }
 
 async logOut():Promise <Loginpage>{
    await this.eleUtil.click(this.logoutLink,{timeout:5000},0)
    await this.eleUtil.click(this.loginLink,{timeout:5000},0)
    return new Loginpage(this.page)

 }

async doSearch(searchKey:string){
 console.log(`search key:${searchKey}`);
 await this.eleUtil.fill(this.search,searchKey)
 await this.eleUtil.click(this.searchIcon)
 return new Resultspage(this.page) 

}




}
