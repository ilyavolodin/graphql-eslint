module.exports = {
    projects: ['<rootDir>/packages/*/jest.config.js'],
    collectCoverageFrom: ['**/*.js', '!jest.config.js', '!**/coverage/**/*.js'],
    collectCoverage: true,
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
};
