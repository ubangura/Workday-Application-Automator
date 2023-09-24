import { } from './information.js';
import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
    });
    const page = await browser.newPage();

    await page.goto(
        "url"
    );

    await browser.close();
})();
