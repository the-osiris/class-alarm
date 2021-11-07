const puppeteer = require('puppeteer');

const username = "kunal.singh@iiitg.ac.in";
const password = "Nocheckans";

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://iiitg.codetantra.com/login.jsp');

    await page.type('#loginId', username);
    await page.type('#password', password);

    await Promise.all([
        page.waitForNavigation(),
        await page.click('#loginBtn'),
    ]);
    await Promise.all([
        page.waitForNavigation(),
        // await page.waitForXPath('//*[@id="homeCenterDiv"]/div/div[1]/div/div[2]/a'),
        await page.click('#homeCenterDiv > div > div:nth-child(1) > div > div.card-footer.p-0 > a')
    ]);

    await page.screenshot({ path: 'example.png' });

    await browser.close();
})();