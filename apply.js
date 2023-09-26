import { email, password, firstName, lastName, suffix, street, city, state, postalCode, phoneType, phoneNumber } from './information.js';
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

    await fillBasicInfo(page);
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
        await page.waitForSelector(selector, { timeout: 1000 });
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

async function fillBasicInfo(page) {
    console.log("Filling basic info");

    await page.locator('div[data-automation-id="previousWorker"] input[id="2"]').click();

    await page.locator('input[data-automation-id="legalNameSection_firstName"]').fill(firstName);
    await page.locator('input[data-automation-id="legalNameSection_lastName"]').fill(lastName);
    const suffixDropdown = 'button[data-automation-id="legalNameSection_social"]';
    if (await selectorExists(page, suffixDropdown)) {
        await page.click(suffixDropdown);
        await page.keyboard.type(suffix);
        await page.keyboard.press('Enter');
    }

    await page.locator('input[data-automation-id="addressSection_addressLine1"]').fill(street);
    await page.locator('input[data-automation-id="addressSection_city"]').fill(city);
    await page.locator('button[data-automation-id="addressSection_countryRegion"]').click();
    await page.keyboard.type(state, { delay: 100 });
    await page.keyboard.press('Enter');
    await page.locator('input[data-automation-id="addressSection_postalCode"]').fill(postalCode);

    await page.locator('button[data-automation-id="phone-device-type"]').click();
    await page.keyboard.type(phoneType, {delay: 100});
    await page.keyboard.press('Enter');
    await page.locator('input[data-automation-id="phone-number"]').fill(phoneNumber);

    await page.locator('button[data-automation-id="bottom-navigation-next-button"]').click();
}