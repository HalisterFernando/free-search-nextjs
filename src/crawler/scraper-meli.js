import { Cluster } from 'puppeteer-cluster';
import fs from 'fs';
import urlsMeli from '../../database/links-meli.json';

const linksArr = [];
const dataArr = [];

export async function scrapeLinks() {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 10,
    puppeteerOptions: {
      headless: false,
    },
  });

  await cluster.task(async ({ page, data: { url, query } }) => {
    console.log('Started scraping links...');

    await page.goto(url);

    await page.waitForSelector('#cb1-edit');

    await page.type('#cb1-edit', query);

    await Promise.all([page.waitForNavigation(), page.click('.nav-search-btn')]);

    const links = await page.$$eval('.ui-search-result__image > a', (el) => el.map((link) => link.href));

    linksArr.push({ [query]: links });
    console.log(linksArr);
  });

  const queries = ['celular', 'tv', 'refrigerador'];

  for (const query of queries) {
    const url = 'https://www.mercadolivre.com.br/';
    await cluster.queue({ url, query });
    await cluster.idle();
  }

  console.log(linksArr);
  await cluster.close();
  fs.writeFileSync('./database/links-meli.json', JSON.stringify(linksArr, null, 2), 'utf-8');
  console.log('All links have been scraped!');
}

export async function scrapeData() {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 10,
    puppeteerOptions: {
      headless: true,
    },
  });

  await cluster.task(async ({ page, data: { url, category } }) => {
    console.log('Started scraping data...');

    await page.goto(url);
    await page.waitForSelector('.ui-pdp-title');

    const title = await page.$eval('.ui-pdp-title', (el) => el.innerText);
    const price = await page.$eval('.andes-money-amount__fraction', (el) => el.innerText);
    const description = await page.$eval('.ui-pdp-description__content', (el) => el.innerText);
    const image = await page.$eval('.ui-pdp-gallery__figure > img', (el) => el.src);

    const obj = {
      link: url,
      title,
      category,
      price,
      description,
      image,
      from: 'Mercado Livre',
    };
    console.log(obj);
    dataArr.push(obj);
  });

  const [{ celular }, { tv }, { refrigerador }] = urlsMeli;

  for (const url of celular) {
    await cluster.queue({ url, category: 'celular' });
    await cluster.idle();
  }

  for (const url of tv) {
    await cluster.queue({ url, category: 'tv' });
    await cluster.idle();
  }

  for (const url of refrigerador) {
    await cluster.queue({ url, category: 'refrigerador' });
    await cluster.idle();
  }

  await cluster.close();
  fs.writeFileSync('./database/data-meli.json', JSON.stringify(dataArr, null, 2), 'utf-8');
  console.log('All data have been scraped!');
}
