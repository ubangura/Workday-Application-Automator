import { email, password } from './information.js';
import puppeteer from "puppeteer";

apply();

async function apply() {
    var page = await getPage();
    await page.goto(
        "url"
    );
    await createAccount(page);
}

async function getPage() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
    });
    const page = await browser.newPage();
    return page;
}

async function createAccount(page) {
    await page.locator('a[data-automation-id="adventureButton"]').click();

    await page.locator('a[data-automation-id="applyManually"]').click();

    await page.locator('button[data-automation-id="createAccountLink"]').click();

    await page.locator('input[data-automation-id="email"]').fill(email);

    await page.locator('input[data-automation-id="password"]').fill(password);
    await page.locator('input[data-automation-id="verifyPassword"]').fill(password);

    const createAccountCheckbox = await page.$('input[data-automation-id="createAccountCheckbox"]');
    if (createAccountCheckbox != null) {
        await createAccountCheckbox.click();
    }

    await page.locator('button[data-automation-id="createAccountSubmitButton"]').click();
}