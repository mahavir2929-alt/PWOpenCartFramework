import { Locator, Page } from "@playwright/test";
import { ElementUtil } from "../utils/ElementUtil";
import { Loginpage } from "./Loginpage";
import {ProductInfoPage} from "./ProductInfoPage"

export class Resultspage {
  private readonly page: Page;
  private readonly eleUtil: ElementUtil;
  private readonly results: Locator;

  constructor(page: Page) {
    this.page = page;
    this.eleUtil = new ElementUtil(page);
    this.results = page.locator(".product-thumb");
  }

 async getSearchResultsCount():Promise <number>{
    return await this.results.count();

 }

 async selectProduct(productName:string){
 console.log(' selected the product' +productName);
 await this.eleUtil.click(this.page.getByRole('link', { name: `${productName}` }))
 return new ProductInfoPage(this.page) 

 }
 






}
