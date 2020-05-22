const path = require('path');
const { expect }  = require('chai');

const { Polly, setupMocha } = require('@pollyjs/core');
// const { setupPolly } = require('setup-polly-jest');
const PuppeteerAdapter = require('@pollyjs/adapter-puppeteer');
const FSPersister = require('@pollyjs/persister-fs');
const puppeteer = require('puppeteer');
Polly.register(PuppeteerAdapter);
Polly.register(FSPersister);

describe('mocha-puppeteer', async () => {
  // browser = await puppeteer.launch({headless: false, args:['--no-sandbox']});
  // page = await browser.newPage();
  // console.log('here is page',page);
  // // NOTE: `context.polly` is not accessible until the jasmine/jest hook `before`
  // // is called. This means it's not accessible in the same tick here. Worth mentioning
  // // since it trolled me while debugging.
  // const context = setupMocha({
  //   adapters: ['puppeteer'],
  //   mode: 'record',
  //   // NOTE: `page` is set by jest.config.js preset "jest-puppeteer"
  //   adapterOptions: { puppeteer: { page } },
  //   persister: 'fs',
  //   persisterOptions: {
  //     fs: {
  //       recordingsDir: path.resolve(__dirname, '../__recordings__')
  //     }
  //   },
  //   matchRequestsBy: {
  //     headers: {
  //       exclude: ['user-agent']
  //     }
  //   }
  // });

  before(async () => {
    browser = await puppeteer.launch({headless: false, args:['--no-sandbox']});
    page = await browser.newPage();
    const context = setupMocha({
      adapters: ['puppeteer'],
      mode: 'record',
      adapterOptions: { puppeteer: { page } },
      persister: 'fs',
      persisterOptions: {
        fs: {
          recordingsDir: path.resolve(__dirname, '../__recordings__')
        }
      },
      matchRequestsBy: {
        headers: {
          exclude: ['user-agent']
        }
      }
    });
    // await page.setRequestInterception(true);

    // const { server } = context.polly;

    // server.host('http://localhost:3000', () => {
    //   server.get('/sockjs-node/*').intercept((_, res) => res.sendStatus(200));
    // });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  });

  after(async () => {
    await browser.close();
  })

  it('should be able to navigate to all routes', async () => {
    const header = await page.$eval('h2', (element) => {
      return element.innerText;
    });
    // await expect(page).toMatchElement('tbody > tr', { timeout: 5000 });
    await expect(header).to.equal('Employees');

    // await expect(page).toClick('a', { text: 'Todos' });
    // await expect(page).toMatchElement('tbody > tr', { timeout: 5000 });
    // await expect(header).toMatch('Todos');

    // await expect(page).toClick('a', { text: 'Users' });
    // await expect(page).toMatchElement('tbody > tr', { timeout: 5000 });
    // await expect(header).toMatch('Users');

    // Wait for all requests to resolve, this can also be replaced with
    // await context.polly.flush();
  });
});
