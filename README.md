# Multi-Step Registration Form Demo

This demo was built by **Dejun (Darren) Tu ** for Payoneer interview only.

## Project Setup

To set up and run this project on your local machine, please follow these steps.

**1. Clone the Repository**

First, clone the project repository from your source control to your local machine.

```
git clone git@github.com:heiooyooy/payoneer-react-demo.git
cd payoneer-react-demo
```

**2. Install Dependencies**

This project uses `npm` for package management. Run the following command to install all the necessary project dependencies listed in `package.json`.

```
npm install
```

This will install React, Vite, Vitest, TypeScript, and all testing libraries.

## How to Run the Application

Once the dependencies are installed, you can start the local development server.

**Start the Development Server**

Run the following command in your terminal:

```
npm run dev
```

This will start the Vite development server, typically on `http://localhost:5173`. You can now open this URL in your web browser to view and interact with the registration form. The server supports Hot Module Replacement (HMR), so any changes you make to the source code will be reflected in the browser instantly without a full page reload.

## How to Run the Tests

The project is configured with a complete test suite using Vitest and React Testing Library.

**Run** All Tests

To execute the entire suite of unit and integration tests in watch mode, run:

```
npm test
```

This command will start the Vitest test runner. It will automatically re-run the tests whenever you save a change to a component or a test file.

**Run** Tests with Coverage Report

To run all tests once and generate a report showing test coverage, use the following command:

```
npm run coverage
```

After the tests run, a `coverage` directory will be created in your project root. You can open the `index.html` file inside that directory to view a detailed, line-by-line report of which parts of your code are covered by tests.