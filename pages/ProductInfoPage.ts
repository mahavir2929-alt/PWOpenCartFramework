import { Locator, Page } from "@playwright/test";
import { ElementUtil } from "../utils/ElementUtil";
import { Loginpage } from "./Loginpage";

export class ProductInfoPage {
  private readonly page: Page;
  private readonly eleUtil: ElementUtil;
  private readonly header: Locator;
  private readonly imageCount: Locator;
  private readonly productMetaData:Locator
  private readonly productPriceData:Locator
   readonly productMap=new Map <string,string|number>
   
  constructor(page: Page) {
    this.page = page;
    this.eleUtil = new ElementUtil(page);
    this.header = page.locator("h1");
    this.imageCount = page.locator('//div[@id="content"]//img');
    this.productMetaData=page.locator('(//div[@id="content"]//ul)[3]/li')
    this.productPriceData=page.locator('(//div[@id="content"]//ul)[4]/li')
  }

  async getProductHeader(): Promise<string> {
    const header = await this.eleUtil.getInnerText(this.header);
    console.log("header is " + header);
    return header.trim();
  }

  async getProductImagesCount():Promise <number> {
    await this.eleUtil.waitForElementVisible(this.imageCount)
    const imagesCount = await this.imageCount.count();
    console.log(
      `total numer of images for ${this.getProductHeader()} is ${imagesCount}`
    );
    return imagesCount;
  }

async getProductDetails():Promise <Map<string,string|number>>{
  this.productMap.set('header',await this.getProductHeader());
 await this.getProductMetaData();
 await this.getProductPricingData();
 await this.printProductDetails();
 return this.productMap
}

private async printProductDetails(){
    for(const [key,value] of this.productMap){
        console.log(key,value);
        
    }
}






//   Brand: Apple
//   Product Code: Product 18
//   Reward Points: 800
//   Availability: Out Of Stock
  private async getProductMetaData(){
  
    let productMetaData:string[]=await this.productMetaData.allInnerTexts()
    for(let meta of productMetaData){
        let metadata:string[]=meta.split(':')
        let metaKey=metadata[0].trim();
        let metaValue=metadata[1].trim();
     this.productMap.set(metaKey,metaValue)  

    }
}
    // $2,000.00
    // Ex Tax: $2,000.00

   private async getProductPricingData(){

    let productPricing:string[]= await this.productPriceData.allInnerTexts();
    let productPrice=productPricing[0].trim();
    let productTax=productPricing[1].split(":")[1].trim();
    this.productMap.set('price',productPrice)
    this.productMap.set('extraprice',productTax)
   }


  
 



  }









