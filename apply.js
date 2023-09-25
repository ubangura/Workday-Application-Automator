import { email, password } from './information.js';
import puppeteer from "puppeteer";

apply();

async function apply() {
    var page = await getPage();
    await page.goto(
        // "url"
    );

    await createAccount(page);

    if (await selectorExists(page, 'div[data-automation-id="errorMessage"]')) {
        await signIn(page);
    }
}

async function getPage() {
    console.log("Getting page");

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
    });
    const page = await browser.newPage();
    return page;
}

async function createAccount(page) {
    console.log("Creating account");

    await page.locator('a[data-automation-id="adventureButton"]').click();

    await page.locator('a[data-automation-id="applyManually"]').click();

    await page.locator('button[data-automation-id="createAccountLink"]').click();

    await page.locator('input[data-automation-id="email"]').fill(email);

    await page.locator('input[data-automation-id="password"]').fill(password);
    await page.locator('input[data-automation-id="verifyPassword"]').fill(password);

    const createAccountCheckbox = 'input[data-automation-id="createAccountCheckbox"]';
    if (await selectorExists(page, createAccountCheckbox)) {
        await page.click(createAccountCheckbox);
    }

    await page.locator('button[data-automation-id="createAccountSubmitButton"]').click();
}

async function selectorExists(page, selector) {
    try {
        await page.waitForSelector(selector, { timeout: 800 });
    } catch (error) {
        return false;
    }
    return true;
}

async function signIn(page) {
    console.log("Account already exists. Signing in");

    await page.locator('button[data-automation-id="signInLink"]').click();

    await page.locator('input[data-automation-id="email"]').fill(email);

    await page.locator('input[data-automation-id="password"]').fill(password);

    await page.locator('button[data-automation-id="signInSubmitButton"]').click({ delay: 400 });
}