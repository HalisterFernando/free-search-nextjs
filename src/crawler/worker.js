import { scrapeLinks as scrapeBuscapeLinks, scrapeData as scrapeBuscapeData } from './scraper-buscape.js';
import { scrapeLinks as scrapeMeliLinks, scrapeData as scrapeMeliData } from './scraper-meli.js';

(async () => {
  await scrapeMeliLinks();
  await scrapeMeliData();

  await scrapeBuscapeLinks();
  await scrapeBuscapeData();
})();
