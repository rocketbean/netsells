/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  clearMocks: true,
  testTimeout : 20000,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  verbose: true,
  silent: true,
  testEnvironment: 'node',
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  transformIgnorePatterns: [
      '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$',
      '[/\\\\]package/*',
      '[/\\\\]container/*',
  ],
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/__tests__/*.[jt]s?(x)",
  ],
  forceExit: true
};
