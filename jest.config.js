/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    ".(ts|tsx)": "ts-jest",
  },
  setupFiles: ["<rootDir>/config.ts"],
  globals: {
    "ts-jest": {
      compiler: "ttypescript",
    },
  },
};
