const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // Ensure this pattern matches your test file
    baseUrl: "https://www.saucedemo.com",
  },
});
