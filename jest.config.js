module.exports = {
    projects: ['<rootDir>/packages/*/jest.config.js'],
    collectCoverageFrom: ['**/*.js', '!jest.config.js', '!**/coverage/**/*.js'],
    moduleDirectories: ['node_modules'],
    collectCoverage: true,
    coverageReporters: ['text-summary', 'lcov'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
};
