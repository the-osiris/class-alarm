const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');

const username = "kunal.singh@iiitg.ac.in";
const password = "Nocheckans";

let result1, result2;
let temp = "";

const driver = async () => {
    const browser = await puppeteer.launch({ headless: false });
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
        await page.click('#homeCenterDiv > div > div:nth-child(1) > div > div.card-footer.p-0 > a')
    ]);
    // await browser.waitForTarget(() => false);

    await page.waitForTimeout(1000).then(() => console.log('Waited 1 second!'));
    result1 = await page.evaluate(() => {
        let timestampsWeb = document.querySelectorAll("#calendar > div.fc-view-container > div > table > tbody > tr > td > div > div > div.fc-content-skeleton > table > tbody > tr > td > div > div > a > div > div.fc-time");
        const stamplist = [...timestampsWeb];
        return stamplist.map(h => h.innerText);
    });
    // console.log(result1);
    result2 = await page.evaluate(() => {
        let subject = document.querySelectorAll("#calendar > div.fc-view-container > div > table > tbody > tr > td > div > div > div.fc-content-skeleton > table > tbody > tr > td > div > div > a > div > div.fc-title");
        const sublist = [...subject];
        return sublist.map(h => h.innerText);
    });
    // console.log(result2);
    await page.screenshot({ path: 'example.png' });
    temp = "";
    for (let i = 0; i < result1.length; i++) {
        temp = temp + `<tr>
        <td>
        ${result1[i]}
        </td>
        <td>
        ${result2[i]}
        </td>
            </tr>`
    }
    await browser.close();
};
setInterval(async () => {
    await driver();
}, 60000)
const app = express();
app.use(cors({
    origin: "*"
}))

app.get('/', (req, res) => {
    res.json({
        result: temp
    })
})
app.listen(8080, () => {

    console.log('listening on')
});