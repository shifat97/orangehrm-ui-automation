# OrangeHRM UI Automation

A robust and scalable UI automation framework for [OrangeHRM](https://opensource-demo.orangehrmlive.com/) built with **Playwright**, **TypeScript**, and following the **Page Object Model (POM)** design pattern.

## 🚀 Features

- **Architecture:** Clean implementation of the Page Object Model (POM).
- **Performance:** Utilizes Playwright's Authentication Setup to reuse login state, drastically reducing test execution time.
- **Reliability:** Custom fixtures for simplified page instantiation and cleaner test code.
- **Data-Driven:** Dynamic test data generation using `@faker-js/faker`.
- **Reporting:** Detailed HTML reports with screenshots and videos on failure.
- **Parallelism:** Fully parallel test execution for faster feedback cycles.
- **Cross-Browser:** Configured for Chromium, with easy extension to Firefox and WebKit.

## 🔍 Automated Pages

This project currently covers the following modules of the OrangeHRM application:

- **Login Page:** Authentication flows, including valid and invalid credential scenarios.
- **Dashboard Page:** Verification of dashboard components and side-panel navigation.
- **Admin Page:** User management, including searching, record selection, and data validation.
- **Add User Page:** Complex form handling for creating new administrative and ESS users.

## 🛠 Tech Stack

- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Test Runner:** [Playwright](https://playwright.dev/)
- **Data Generation:** [Faker.js](https://fakerjs.dev/)

## 📂 Project Structure

```text
├── data/               # Static and dynamic test data
├── fixtures/           # Custom Playwright fixtures
├── pages/              # Page Object Models (POM)
├── tests/              # Test suites
│   ├── auth.setup.ts   # Global authentication setup
│   └── ...             # Feature-specific tests
├── playwright.config.ts # Playwright configuration
└── package.json        # Dependencies and scripts
```

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/orangehrm-ui-automation.git
    cd orangehrm-ui-automation
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Install Playwright browsers:
    ```bash
    npx playwright install --with-deps chromium
    ```

## 🧪 Running Tests

### Execute All Tests (Headless)

```bash
npm test
```

### Run Tests in UI Mode

```bash
npm run test:ui
```

### Run Tests in Headed Mode

```bash
npm run test:headed
```

### Run Specific Test File

```bash
npx playwright test tests/admin.spec.ts
```

## 📊 Reporting

After the tests complete, a detailed HTML report is generated. To view it:

```bash
npm run test:report
```

##

_Developed by Md. Shifat Bin Reza ([LinkedIn](https://www.linkedin.com/in/shifat2))_
