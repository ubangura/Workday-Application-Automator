# Workday Application Automator ⚡
> Automates repetitive Workday applications by filling in constant information across most portals, including basic contact, education, and demographic information.

> <!-- TABLE OF CONTENTS -->
<details open="open">
  <summary> 📖 Table of Contents</summary>
  <ul>
    <li><a href="#motivation"> Motivation</a></li>
    <li><a href="#overview"> Overview</a></li>
    <li><a href="#getting-started-guide"> Getting Started Guide</a>
    </li>
  </ul>
</details>

---

<!-- Motivation -->
<h2 id="motivation"> 💡 Motivation</h2>

The search for software engineering internships can be a time-consuming process. The first step to getting an internship is the application and many companies opt to use the Workday system for application portals. 😬

> <!-- Workday Application Issues -->
<details open="open">
  <summary> ❗ Workday Application Issues</summary>
  <ul>
    <li>Need to create an account for each company</li>
    <li>Resume autofill struggles with proper formatting & auto-filling some information </li>
    <li>Inability to save answers to questions regarding gender, ethnicity, education, etc., even if your answer won't ever change</li>
  </ul>
</details>

Each application can take about 2-3 minutes to fill out, because of these issues.

---

<!-- OVERVIEW -->
<h2 id="overview"> ☁️ Overview</h2>

https://github.com/ubangura/Workday-Application-Automator/assets/110050333/758743e3-fa8b-4c1a-9400-4da079f6d710

---

<!-- Getting Started Guide -->
<h2 id="getting-started-guide"> 🛠️ Getting Started Guide</h2>

> Note: You will need Node.js installed on your local computer. If you need to install, you can do so at [Download Node.js](https://nodejs.dev/en/download/).

Run the command below in the terminal to copy the code from the repository to your local computer.
```bash
git clone https://github.com/ubangura/Workday-Application-Automator.git
```

In the newly created directory, run the command to install Puppeteer.
```bash
npm i puppeteer
```

Then simply replace the default information in information.js with your own, add the URL to a job posting on Workday in apply.js, and run the command to start the automation script.
```bash
node apply.js
```
