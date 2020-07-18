module.exports = {
    testEnvironment: 'node',
    collectCoverageFrom: ['src/**/*.js'],
    coverageReporters: ['text-summary', 'lcov'],
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
