import { email, password, fullName, firstName, lastName, suffix, street, city, state, postalCode, phoneType, phoneNumber, school, degree, fieldOfStudy, gpa, startDate, endDate, resumeFilePath, linkedInLink, githubLink, gender, ethnicity, hispanicOrLatino, veteranStatus } from './information.js';
import puppeteer from "puppeteer";

const nextButton = 'button[data-automation-id="bottom-navigation-next-button"]';

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

    await page.waitForSelector('div[data-automation-id="myExperiencePage"]', { timeout: 0 });

    await fillExperience(page);

    await page.waitForSelector('div[data-automation-id="voluntaryDisclosuresPage"]', { timeout: 0 });

    await fillVoluntaryDisclosures(page);

    await page.waitForSelector('div[data-automation-id="selfIdentificationPage"]', { timeout: 0 });

    await fillSelfIdentify(page);
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

    /* Name */
    await page.locator('input[data-automation-id="legalNameSection_firstName"]').fill(firstName);
    await page.locator('input[data-automation-id="legalNameSection_lastName"]').fill(lastName);
    const suffixDropdown = 'button[data-automation-id="legalNameSection_social"]';
    if (await selectorExists(page, suffixDropdown)) {
        await page.click(suffixDropdown);
        await page.keyboard.type(suffix);
        await page.keyboard.press('Enter');
    }

    /* Address */
    await page.locator('input[data-automation-id="addressSection_addressLine1"]').fill(street);
    await page.locator('input[data-automation-id="addressSection_city"]').fill(city);
    await page.locator('button[data-automation-id="addressSection_countryRegion"]').click();
    await page.keyboard.type(state, { delay: 100 });
    await page.keyboard.press('Enter');
    await page.locator('input[data-automation-id="addressSection_postalCode"]').fill(postalCode);

    /* Phone */
    await page.locator('button[data-automation-id="phone-device-type"]').click();
    await page.keyboard.type(phoneType, { delay: 100 });
    await page.keyboard.press('Enter');
    await page.locator('input[data-automation-id="phone-number"]').fill(phoneNumber);

    await page.locator(nextButton).click();
}

async function fillExperience(page) {
    console.log("Filling experience");

    /* Education */
    const addFirstEducation = 'div[data-automation-id="educationSection"] button[data-automation-id="Add"]';
    if (await selectorExists(page, addFirstEducation)) {
        await page.click(addFirstEducation);
    }

    await page.locator('input[data-automation-id="school"]').fill(school);

    await page.locator('div[data-automation-id="formField-field-of-study"] input').fill(fieldOfStudy);
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter', { delay: 1000 });

    await page.locator('input[data-automation-id="gpa"]').fill(gpa);

    await page.locator('button[data-automation-id="degree"]').click();
    await page.keyboard.type(degree, { delay: 100 });
    await page.keyboard.press('Enter');

    const startDateInput = 'div[data-automation-id="formField-startDate"] input';
    if (await selectorExists(page, startDateInput)) {
        await page.locator(startDateInput).fill(startDate);
        await page.locator('div[data-automation-id="formField-endDate"] input').fill(endDate);
    }

    /* Resume */
    const uploadElementHandle = await page.$('input[data-automation-id="file-upload-input-ref"]');
    await uploadElementHandle.uploadFile(resumeFilePath);

    /* Additional Websites - LinkedIn & GitHub */
    const linkedInInput = 'input[data-automation-id="linkedinQuestion"]';

    if (await selectorExists(page, linkedInInput)) {
        await page.locator(linkedInInput).fill(linkedInLink);
        await page.locator('div[data-automation-id="websiteSection"] button[data-automation-id="Add"]').click();
        await page.locator('div[data-automation-id="websitePanelSet-1"] input').fill(githubLink);
    } else {
        await page.locator('div[data-automation-id="websiteSection"] button[data-automation-id="Add"]').click();
        await page.locator('div[data-automation-id="websitePanelSet-1"] input').fill(linkedInLink);
        await page.locator('div[data-automation-id="websiteSection"] button[data-automation-id="Add Another"]').click()
        await page.locator('div[data-automation-id="websitePanelSet-2"] input').fill(githubLink);
    }


    await page.locator(nextButton).click();
}

async function fillVoluntaryDisclosures(page) {
    console.log("Filling voluntary disclosure info");

    /* Gender */
    await page.locator('button[data-automation-id="gender"]').click();
    await page.keyboard.type(gender, { delay: 100 });
    await page.keyboard.press('Enter');

    await new Promise(r => setTimeout(r, 200));

    /* Ethnicity */
    const hispanicLatinoDropdown = 'button[data-automation-id="hispanicOrLatino"]';
    if (await selectorExists(hispanicLatinoDropdown)) {
        await page.click(hispanicLatinoDropdown);
        await page.keyboard.type(hispanicOrLatino, { delay: 100 });
        await page.keyboard.type('Enter');
    }

    await page.locator('button[data-automation-id="ethnicityDropdown"]').click();
    await page.keyboard.type(ethnicity, { delay: 100 });
    await page.keyboard.press('Enter');

    await new Promise(r => setTimeout(r, 200));

    /* Veteran Status */
    await page.locator('button[data-automation-id="veteranStatus"]').click();
    await page.keyboard.type(veteranStatus, { delay: 100 });
    await page.keyboard.press('Enter');

    await page.locator('input[data-automation-id="agreementCheckbox"]').click();

    await page.locator(nextButton).click();
}

async function fillSelfIdentify(page) {
    console.log("Filling disability info");

    await page.locator('input[data-automation-id="name"]').fill(fullName);

    await page.locator('div[data-automation-id="dateIcon"]').click();
    await page.locator('button[data-automation-id="datePickerSelectedToday"]').click();

    await page.locator('input[id="64cbff5f364f10000ae7a421cf210000"]').click();

    await page.locator(nextButton).click();
}