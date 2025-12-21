//import { expect, test } from "@playwright/test";

import { Resultspage } from "../pages/ResultsPage";
import { ProductInfoPage } from "../pages/ProductInfoPage";
import { expect, test } from "../fixtures/basefixture";


let search = [
  { searchKey: "macbook", productname: "MacBook Pro", imagecount: 4 },
  { searchKey: "macbook", productname: "MacBook Air", imagecount: 4 },
];

for (let product of search) {
  test(`verify product header ${product.productname} @regression`, async ({ homePage }) => {
    
    let resultPage: Resultspage = await homePage.doSearch(product.searchKey);
    let productInfo: ProductInfoPage = await resultPage.selectProduct(
      product.productname
    );
    expect(await productInfo.getProductHeader()).toBe(product.productname);
  });
}
for (let product of search) {
  test(`verify product images count ${product.productname} @sanity`, async ({
    homePage,
  }) => {
    
    let resultPage: Resultspage = await homePage.doSearch(product.searchKey);
    let productInfo: ProductInfoPage = await resultPage.selectProduct(
      product.productname
    );
    expect(await productInfo.getProductImagesCount()).toBe(product.imagecount);
  });
}

test(`verify product metadata`, async ({ homePage }) => {
 
  let resultPage: Resultspage = await homePage.doSearch("macbook");
  let productInfo: ProductInfoPage = await resultPage.selectProduct(
    "MacBook pro"
  );
  let actualfullproductdetails = productInfo.getProductDetails();
  expect
    .soft((await actualfullproductdetails).get("header"))
    .toBe("MacBook Pro");
  expect.soft((await actualfullproductdetails).get("Brand")).toBe("Apple");
  expect
    .soft((await actualfullproductdetails).get("Product Code"))
    .toBe("Product 18");
  expect
    .soft((await actualfullproductdetails).get("Reward Points"))
    .toBe("800");
    expect((await actualfullproductdetails).get("price")).toBe("$2,000.00")
    expect((await actualfullproductdetails).get("extraprice")).toBe("$2,000.00")

});
