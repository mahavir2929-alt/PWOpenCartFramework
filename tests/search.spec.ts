//import { expect, test } from "@playwright/test";

import { Resultspage } from "../pages/ResultsPage";
import { expect, test } from "../fixtures/basefixture";



const SearchData=[

{searchKey:'macbook',resultscount:3},
{searchKey:'samsung',resultscount:2}

]



for(let product of SearchData ){
test(`verify valid search for ${product.searchKey} @sanity` , async ({ homePage }) => {

  let resultPage:Resultspage=await homePage.doSearch(product.searchKey)
  expect(await resultPage.getSearchResultsCount()).toBe(product.resultscount);
  //await homePage.waitForTimeout(2000)
});
}