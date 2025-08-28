import { email, password, fullName, firstName, lastName, suffix, street, city, state, postalCode, phoneType, phoneNumber, workexperiences, school, degree, fieldOfStudy, gpa, skills, startDate, endDate, resumeFilePath, linkedInLink, githubLink, gender, ethnicity, hispanicOrLatino, veteranStatus, disability } from './information.js';
import puppeteer from "puppeteer";
import { selectorExists, withOptSelector } from './utils.js'

const nextButton = 'button[data-automation-id="bottom-navigation-next-button"]';
const url = 'https://leidos.wd5.myworkdayjobs.com/en-US/External/job/Sr-Software-Engineer_R-00159780-1';

apply(url);

async function apply(url) {
    var page = await getPage();
    page.setDefaultTimeout(15000);

    await page.goto(url);

    await signIn(page);
    if (await selectorExists(page, 'div[data-automation-id="errorMessage"]')) {
        console.log("Account did not exist. Making new account and signing in");
        await createAccount(page);
        await signIn(page);
    }

    await startApp(page)

    await page.waitForSelector('div[data-automation-id="contactInformationPage"]')

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

async function signIn(page) {
    await page.locator('button[data-automation-id="utilityButtonSignIn"]').click();

    await page.locator('input[data-automation-id="email"]').fill(email);

    await page.locator('input[data-automation-id="password"]').fill(password);

    await page.locator('button[data-automation-id="signInSubmitButton"]').click({ delay: 500 });
}

async function createAccount(page) {
    await page.locator('button[data-automation-id="createAccountLink"]').click();

    await page.locator('input[data-automation-id="email"]').fill(email);

    await page.locator('input[data-automation-id="password"]').fill(password);
    await page.locator('input[data-automation-id="verifyPassword"]').fill(password);

    const createAccountCheckbox = 'input[data-automation-id="createAccountCheckbox"]';
    if (await selectorExists(page, createAccountCheckbox)) {
        await page.click(createAccountCheckbox);
    }

    await page.locator('button[data-automation-id="createAccountSubmitButton"]').click()
}

async function startApp(page) {
    console.log("Starting Application")

    await page.locator('a[data-automation-id="adventureButton"]').click();

    await page.locator('a[data-automation-id="adventureButton"]').click();

    await page.locator('a[data-automation-id="applyManually"]').click();
}

async function fillBasicInfo(page) {
    console.log("Filling basic info");

    await withOptSelector(page, 'div[data-automation-id="previousWorker"] input[id="2"]',
        (el) => { el.click(); },
        10000
    );

    /* Name */
    await withOptSelector(page, 'div[data-automation-id="previousWorker"] input[id="2"]',
        el => el.click()
    );

    await withOptSelector(page, 'input[data-automation-id="legalNameSection_firstName"]',
        el => el.fill(firstName)
    );

    await withOptSelector(page, 'input[data-automation-id="legalNameSection_lastName"]',
        el => el.fill(lastName)
    );

    await withOptSelector(page, 'button[data-automation-id="legalNameSection_social"]', async el => {
        await el.click();
        await page.keyboard.type(suffix);
        await page.keyboard.press('Enter');
    });

    /* Address */
    await withOptSelector(page, 'input[data-automation-id="addressSection_addressLine1"]',
        el => el.fill(street)
    );

    await withOptSelector(page, 'input[data-automation-id="addressSection_city"]',
        el => el.fill(city)
    );

    await withOptSelector(page, 'button[data-automation-id="addressSection_countryRegion"]', async el => {
        await el.click();
        await page.keyboard.type(state, { delay: 100 });
        await page.keyboard.press('Enter');
    });

    await withOptSelector(page, 'input[data-automation-id="addressSection_postalCode"]',
        el => el.fill(postalCode)
    );

    /* Phone */
    await withOptSelector(page, 'button[data-automation-id="phone-device-type"]', async el => {
        await el.click();
        await page.keyboard.type(phoneType, { delay: 100 });
        await page.keyboard.press('Enter');
    });

    await withOptSelector(page, 'input[data-automation-id="phone-number"]',
        el => el.fill(phoneNumber)
    );

    await page.locator(nextButton).click();
}

async function fillExperience(page) {
    console.log("Filling experience");

    /* Work */
    let addedWorks = 0;
    for (const work of workexperiences) {
        addedWorks += 1;
        if (!(await selectorExists(page, `div[data-automation-id="workExperience-${addedWorks}"]`))) {
            // If a needed work section doesn't exist...
            if (addedWorks === 1) {
                // Need to add the first section
                await withOptSelector(page, 'div[data-automation-id="workExperienceSection"] button[data-automation-id*="add"]',
                    async el => el.click(),
                    5000
                );
            } else {
                // Add additional sections
                await withOptSelector(page, 'div[data-automation-id="workExperienceSection"] button[data-automation-id*="Add"]',
                    async el => el.click(),
                    5000
                );
            }
        }

        await withOptSelector(page, `div[data-automation-id="workExperience-${addedWorks}"] input[data-automation-id="jobTitle"]`,
            async el => el.fill(work.jobtitle)
        );
        await withOptSelector(page, `div[data-automation-id="workExperience-${addedWorks}"] input[data-automation-id="company"]`,
            async el => el.fill(work.company)
        );
        await withOptSelector(page, `div[data-automation-id="workExperience-${addedWorks}"] input[data-automation-id="location"]`,
            async el => el.fill(work.location)
        );
        await withOptSelector(page, `div[data-automation-id="workExperience-${addedWorks}"] div[data-automation-id="formField-startDate"]
            input[data-automation-id="dateSectionMonth-input"]`, async el => {
            await (await el.waitHandle()).focus();
            await page.keyboard.type(work.startDateMonth, { delay: 100 });
        });
        await withOptSelector(page, `div[data-automation-id="workExperience-${addedWorks}"] div[data-automation-id="formField-startDate"]
            input[data-automation-id="dateSectionYear-input"]`, async el => {
            await (await el.waitHandle()).focus();
            await page.keyboard.type(work.startDateYear, { delay: 100 });
        });
        await withOptSelector(page, `div[data-automation-id="workExperience-${addedWorks}"] div[data-automation-id="formField-endDate"]
            input[data-automation-id="dateSectionMonth-input"]`, async el => {
            await (await el.waitHandle()).focus();
            await page.keyboard.type(work.endDateMonth, { delay: 100 });
        });
        await withOptSelector(page, `div[data-automation-id="workExperience-${addedWorks}"] div[data-automation-id="formField-endDate"]
            input[data-automation-id="dateSectionYear-input"]`, async el => {
            await (await el.waitHandle()).focus();
            await page.keyboard.type(work.endDateYear, { delay: 100 });
        });
        await withOptSelector(page, `div[data-automation-id="workExperience-${addedWorks}"] textarea[data-automation-id="description"]`,
            async el => el.fill(work.description)
        );
    }

    /* Education */

    // Add First Education
    await withOptSelector(page, 'div[data-automation-id="educationSection"] button[data-automation-id="Add"]',
        el => el.click()
    );

    // School input
    await withOptSelector(page, 'div[data-automation-id="formField-schoolItem"] input', async el => {
        await el.fill(school);
        await page.keyboard.press('Enter');
        await page.keyboard.press('Enter', { delay: 1000 });
    });

    // Degree dropdown
    await withOptSelector(page, 'button[data-automation-id="degree"]', async el => {
        await el.click();
        await page.keyboard.type(degree, { delay: 100 });
        await page.keyboard.press('Enter');
    });

    // Field of Study - Currently must be done manually to get correctly
    /*
    await withOptSelector(page, 'div[data-automation-id="formField-field-of-study"] input', async el => {
        await el.fill(fieldOfStudy);
        await page.keyboard.press('Enter');
        await page.keyboard.press('Enter', { delay: 1000 });
    });
    */

    // GPA
    await withOptSelector(page, 'div[data-automation-id="formField-gradeAverage"] input', async () => {
        await page.locator('input[data-automation-id="gpa"]').fill(gpa);
    });

    /* Skills */
    await withOptSelector(page, 'div[data-automation-id="formField-skillsPrompt"] input', async el => {
        for (const skill of skills) {
            await el.fill(skill);
            await page.keyboard.press('Enter');
            await page.keyboard.press('Enter', { delay: 5000 });
        }
    });

    /* Start and End Dates */
    await withOptSelector(page, 'div[data-automation-id="formField-firstYearAttended"] input', async el => {
        await el.fill(endDate);
    });

    await withOptSelector(page, 'div[data-automation-id="formField-lastYearAttended"] input', async el => {
        await el.fill(endDate);
    });

    /* Resume Upload */
    if (await selectorExists(page, 'input[data-automation-id="file-upload-input-ref"]')) {
        const uploadElementHandle = await page.$('input[data-automation-id="file-upload-input-ref"]');
        await uploadElementHandle.uploadFile(resumeFilePath);
    }

    /* Website Links */
    let addedWebs = 0
    if (linkedInLink) {
        const linkedInInput = 'input[data-automation-id="linkedinQuestion"]';
        if (await selectorExists(page, linkedInInput)) {
            // There is an specific linkedIn URL box
            await page.locator(linkedInInput).fill(linkedInLink);
        } else {
            // Must use a generic website box
            addedWebs += 1;
            if (!(await selectorExists(page, `div[data-automation-id="websitePanelSet-${addedWebs}"] input`))) {
                // Needed website box must be created
                await withOptSelector(page, 'div[data-automation-id="websiteSection"] button[data-automation-id="Add"]', async el => {
                    await el.click();
                });
            }
            await page.locator(`div[data-automation-id="websitePanelSet-${addedWebs}"] input`).fill(linkedInLink);
        }
    }
    if (githubLink) {
        addedWebs += 1;
        if (!(await selectorExists(page, `div[data-automation-id="websitePanelSet-${addedWebs}"] input`))) {
            // Needed website box must be created
            await withOptSelector(page, 'div[data-automation-id="websiteSection"] button[data-automation-id="Add"]', async el => {
                await el.click();
            });
        }
        await page.locator(`div[data-automation-id="websitePanelSet-${addedWebs}"] input`).fill(githubLink);
    }

    await page.locator(nextButton).click();
}

async function fillVoluntaryDisclosures(page) {
    console.log("Filling voluntary disclosure info");

    /* Gender */
    await withOptSelector(page, 'button[data-automation-id="gender"]',
        async el => {
            await el.click();
            await page.keyboard.type(gender, { delay: 100 });
            await page.keyboard.press('Enter');
        }
    );

    await new Promise(r => setTimeout(r, 200));

    /* Ethnicity */
    await withOptSelector(page, 'button[data-automation-id="hispanicOrLatino"]',
        async el => {
            await el.click();
            await page.keyboard.type(hispanicOrLatino, { delay: 100 });
            await page.keyboard.press('Enter');
        }
    );

    await withOptSelector(page, 'button[data-automation-id="ethnicityDropdown"]',
        async el => {
            await el.click();
            await page.keyboard.type(ethnicity, { delay: 100 });
            await page.keyboard.press('Enter');
        }
    );

    await new Promise(r => setTimeout(r, 200));

    /* Veteran Status */
    await withOptSelector(page, 'button[data-automation-id="veteranStatus"]',
        async el => {
            await el.click();
            await page.keyboard.type(veteranStatus, { delay: 100 });
            await page.keyboard.press('Enter');
        }
    );

    /* Agreement Checkbox */
    await withOptSelector(page, 'input[data-automation-id="agreementCheckbox"]',
        async el => await el.click()
    );

    /* Next Button */
    await withOptSelector(page, nextButton,
        async el => await el.click()
    );
}

async function fillSelfIdentify(page) {
    console.log("Filling disability info");

    /* Full Name */
    await withOptSelector(page, 'input[data-automation-id="name"]',
        async el => await el.fill(fullName)
    );

    /* Birth Date */
    await withOptSelector(page, 'div[data-automation-id="dateIcon"]',
        async el => await el.click()
    );

    await withOptSelector(page, 'button[data-automation-id="datePickerSelectedToday"]',
        async el => await el.click()
    );

    /* Disability Status */
    if (disability === 'yes') {
        await withOptSelector(page, 'input[id="64cbff5f364f10000ae7a421cf210000"]',
            async el => await el.click()
        );
    } else if (disability === 'no') {
        await withOptSelector(page, 'input[id="64cbff5f364f10000aeec521b4ec0000"]',
            async el => await el.click()
        );
    } else if (disability === 'abstain') {
        await withOptSelector(page, 'input[id="64cbff5f364f10000af3af293a050000"]',
            async el => await el.click()
        );
    }

    /* Next Button */
    await page.locator(nextButton).click();
}