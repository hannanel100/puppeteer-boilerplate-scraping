const pageScraper = require("./pageScraper");
const mongoDbObject = require("./mongoDB");

async function scrapeAll(browserInstance) {
  let browser;
  let allSpecs = await mongoDbObject.connect();
  const specToRequest = "AMS 2700";

  try {
    browser = await browserInstance;

    await pageScraper.scraper(browser, allSpecs);
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);
