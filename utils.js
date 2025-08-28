async function selectorExists(page, selector) {
    try {
        await page.waitForSelector(selector, { timeout: 1000 });
    } catch (error) {
        return false;
    }
    return true;
}

async function withOptSelector(page, selector, callback, searchTimeout = 2000) {
    let el;
    try {
        await page.waitForSelector(selector, {timeout: searchTimeout});
        el = page.locator(selector);
    }
    catch (err) {
        if (err.name === 'TimeoutError') {
            console.warn(`Selector not found within timeout limit: ${selector}`)
            return false; // element not found in time
        }
        throw err; // some other unexpected error
    }
    return await callback(el);
}

export class WorkExperience {
    constructor({ jobtitle, company, location, startDateMonth, startDateYear, endDateMonth, endDateYear, description }) {
        this.jobtitle = jobtitle;
        this.company = company;
        this.location = location;
        this.startDateMonth = startDateMonth;
        this.startDateYear = startDateYear;
        this.endDateMonth = endDateMonth;
        this.endDateYear = endDateYear;
        this.description = description;
    }
}

export { selectorExists, withOptSelector };