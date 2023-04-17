import { Cluster } from 'puppeteer-cluster';
import fs from 'fs';
import urlsBuscape from '../../database/links-buscape.json';

const linksArr = [];
const dataArr = [];

export async function scrapeLinks() {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 20,
    puppeteerOptions: {
      headless: true,
    },
  });

  await cluster.task(async ({ page, data: { url, query } }) => {
    console.log('Started scraping links...');

    await page.goto(url);

    await page.waitForSelector('[data-test="input-search"]');

    await page.type('[data-test="input-search"]', query);

    await Promise.all([page.waitForNavigation(), page.click('.AutoCompleteStyle_submitButton__GkxPO')]);

    const links = await page.$$eval('.SearchCard_ProductCard_Inner__7JhKb', (el) => el.map((link) => link.href));

    linksArr.push({ [query]: links });
    console.log(linksArr);
  });

  const queries = ['celular', 'tv', 'refrigerador'];

  for (const query of queries) {
    const url = 'https://www.buscape.com.br/';
    await cluster.queue({ url, query });
    await cluster.idle();
  }

  console.log(linksArr);
  await cluster.close();
  fs.writeFileSync('./database/links-buscape.json', JSON.stringify(linksArr, null, 2), 'utf-8');
  console.log('All links have been scraped!');
}

export async function scrapeData() {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 20,
    puppeteerOptions: {
      headless: true,
    },
  });

  await cluster.task(async ({ page, data: { url, category } }) => {
    console.log('Started scraping data...');

    await page.goto(url);

    let title;
    let price;
    let description;
    let image;

    switch (true) {
      case url.includes('lead'):
        title = await page.$eval('.Overview_OfferName__8qA_4 > strong', (el) => el.innerText);
        price = await page.$eval(
          '.Text_Text__Q54vF.Text_LabelXxlRegular__sF1jq.Text_LabelXxxRegularAtLarge__XvU_S.OfferPrice_Main__hZooh',
          (el) => el.innerText
        );
        description = await page.$eval('.DetailsSection_MerchantContent__45_Z4 > p', (el) => el.innerText);
        image = await page.$eval(
          '.swiper-slide.Carousel_SlideItem__c7xrN.Carousel_PreventImageOversized__T_jjw.swiper-slide-active > img',
          (el) => el.src
        );
        break;

      default:
        title = await page.$eval(
          '.Text_Text__h_AF6.Text_MobileTitleM__24Ah0.Text_MobileTitleLAtLarge__CTrpI',
          (el) => el.innerText
        );
        price = await page.$eval('.Price_ValueContainer__1U9ia > strong', (el) => el.innerText);
        description = await page.$$eval(
          '.AttributeBlock_GroupContent__nhYRo > p.Text_Text__h_AF6.Text_MobileLabelS___fuke',
          (els) => els.map((el) => el.innerText)
        );
        image = await page.$eval('[alt=PRODUCT_ZOOM]', (el) => el.src);
        break;
    }

    const obj = {
      link: url,
      title,
      category,
      price,
      description,
      image,
      from: 'Buscapé',
    };
    console.log(obj);
    dataArr.push(obj);
  });

  const [{ celular }, { tv }, { refrigerador }] = urlsBuscape;

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
  fs.writeFileSync('./database/data-buscape.json', JSON.stringify(dataArr, null, 2), 'utf-8');
  console.log('All data have been scraped!');
}
