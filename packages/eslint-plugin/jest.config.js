module.exports = {
    displayName: 'plugin',
    testEnvironment: 'node',
    testRegex: './__tests__/rules/.+\\.js$',
    collectCoverageFrom: ['src/**/*.js', '!src/**/index.js'],
    collectCoverage: true,
    coverageReporters: ['text-summary', 'lcov']
};
