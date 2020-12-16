const pageScraper = require("./pageScraper");
async function scrapeAll(browserInstance) {
  let browser;
  const specToRequest = "AMS 2700";
  try {
    browser = await browserInstance;
    await pageScraper.scraper(browser, specToRequest);
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);
