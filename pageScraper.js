const wait = require("./utils/wait");
const csvWriter = require("./csvController");
const scraperObject = {
  //Change url to link you're scraping from
  url: "https://global.ihs.com/search_res.cfm?&rid=IHS&input_doc_number=",
  scrapedRevisions: [],
  async scraper(browser, specsArray) {
    let page = await browser.newPage();
    for (let i = 0; i < specsArray.length; i++) {
      if (i % 10 === 0 && i !== 0) {
        await wait(10000);
      } else if (i % 100 === 0) {
        await wait(60000);
      }
      const {
        specification: specToRequest,
        revision: flameRevision,
      } = specsArray[i];

      console.log(`Navigating to ${this.url}${specToRequest}...`);
      await page.goto(this.url + specToRequest);
      await page.waitForTimeout(5000);
      //TODO: Add switch statement dealing with other spec publishers, currently works only for AMS
      const currentRevisionElement = await page.$eval(
        "body > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr > td > form > div:nth-child(3) > div.search-result-detail-container > span > span",
        (el) => el.innerText
      );
      const currentRevision = currentRevisionElement
        .trim()
        .split(" ")[1]
        .split(",")[0];
      if (currentRevision === null || currentRevision === "") {
        console.log(`no revision found for spec ${specIhsScraped.spec}`);
      } else {
        console.log(
          `${specToRequest} current revision: ${currentRevision} flame revision: ${flameRevision}`
        );
        this.scrapedRevisions.push({
          spec: specToRequest,
          flameRev: flameRevision,
          actualRev: currentRevision,
        });
      }
    }
    //Program successfully completed
    await browser.close();
    console.log(this.scrapedRevisions);
    await csvWriter.writeRecords(this.scrapedRevisions);
    console.log("Program completed!");
  },
};

module.exports = scraperObject;
