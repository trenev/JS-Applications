const { chromium } = require('playwright-chromium');

const { assert } = require('chai');

let browser, page;
const mochData = {
    1: {author: "Spami", content: "Hello, are you there?"},
    2: {author: "Garry", content: "Yep, whats up :?"}
};

function json(data) {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
}

describe('Tests', async function() {
    this.timeout(10000);

    before(async () => {
        browser = await chromium.launch();
        // browser = await chromium.launch({headless: false, slowMo: 500});
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
    });

    it('load and displays all messages', async () => {
        await page.route('**/jsonstore/messenger', route => {
            route.fulfill(json(mochData));
        });
        await page.goto('http://localhost:5500');
        
        const [response] = await Promise.all([
            page.waitForResponse('**/jsonstore/messenger'),
            page.click('text=Refresh'),
        ]);
        const data = await response.json();

        const textArea = await page.$eval('#messages', (textArea) => textArea.value);
        const messages = Object.values(mochData)
            .map(v => `${v.author}: ${v.content}`)
            .join('\n');

        assert.equal(JSON.stringify(data), JSON.stringify(mochData));
        assert.equal(textArea, messages);
    });

    it('send message', async () => {
        await page.route('**/jsonstore/messenger', route => {
            route.fulfill(json(mochData));
        });
        await page.goto('http://localhost:5500');

        await page.fill('#author', 'Author');
        await page.fill('#content', 'Content');
        
        const [request] = await Promise.all([
            page.waitForRequest(request => request.method() == 'POST'),
            page.click('text=Send'),
        ]);
        const data = JSON.parse(request.postData());

        assert.equal(data.author, 'Author');
        assert.equal(data.content, 'Content');
    });
});