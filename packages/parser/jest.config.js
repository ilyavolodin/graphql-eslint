module.exports = {
    displayName: 'parser',
    testEnvironment: 'node',
    testRegex: './__tests__/.+\\.js$',
    collectCoverageFrom: ['src/**/*.js'],
    collectCoverage: true,
    coverageReporters: ['text-summary', 'lcov']
};
