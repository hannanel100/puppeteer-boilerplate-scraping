const scraperObject = {
  //Change url to link you're scraping from
  url: "https://global.ihs.com/search_res.cfm?&rid=IHS&input_doc_number=",
  async scraper(browser, specToRequest) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}${specToRequest}...`);
    await page.goto(this.url + specToRequest);
    await page.waitForTimeout(5000);
    //Enter following code here
    //TODO: Add switch statement dealing with other spec publishers, currently works only for AMS
    const currentRevisionElement = await page.$eval(
      "body > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr > td > form > div:nth-child(3) > div.search-result-detail-container > span > span",
      (el) => el.innerText
    );
    const currentRevision = currentRevisionElement
      .trim()
      .split(" ")[1]
      .split(",")[0];
    console.log(currentRevision);
    //Program successfully completed
    await browser.close();
    console.log("Program completed!");
  },
};

module.exports = scraperObject;
