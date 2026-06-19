# Workday Application Automator ⚡

> **This project has been superseded.**
> I am rebuilding this from scratch as a proper Chrome extension — no Node.js, no terminal, no manual config.
>
> **→ [snapfill.pages.dev](https://snapfill.pages.dev) — join the waitlist**

---

Automates repetitive Workday applications by filling in constant information across most portals, including basic contact, education, and demographic information.

> **Note:** This repository is archived and no longer maintained. It still works but requires manual setup and only covers basic fields. SnapFill handles the full application automatically.

## Table of Contents

- [Motivation](#motivation)
- [Overview](#overview)
- [Getting Started Guide](#getting-started-guide)

## Motivation

The search for software engineering internships can be a time-consuming process. The first step to getting an internship is the application, and many companies opt to use the Workday system for application portals. 😬

### Workday application issues

- Need to create an account for each company
- Resume autofill struggles with proper formatting and auto-filling some information
- Inability to save answers to questions regarding gender, ethnicity, education, etc., even if your answer won't ever change

Each application can take about 2–3 minutes to fill out because of these issues.

## Overview

https://github.com/ubangura/Workday-Application-Automator/assets/110050333/758743e3-fa8b-4c1a-9400-4da079f6d710

## Getting Started Guide

> Note: You will need Node.js installed on your local computer. If you need to install it, you can do so at [Download Node.js](https://nodejs.dev/en/download/).

Run the command below in the terminal to copy the code from the repository to your local computer.

```bash
git clone https://github.com/ubangura/Workday-Application-Automator.git
```

In the newly created directory, install Puppeteer:

```bash
npm install puppeteer
```

Then replace the default information in `information.js` with your own data, add a Workday job posting URL to `apply.js`, and run the automation script:

```bash
node apply.js
```

## Star History

[![Star History Chart](https://api.star-history.com/chart?repos=ubangura/Workday-Application-Automator&type=date&legend=bottom-right)](https://www.star-history.com/?repos=ubangura%2FWorkday-Application-Automator&type=date&legend=bottom-right)
