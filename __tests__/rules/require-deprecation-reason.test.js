const { RuleTester } = require('eslint');
const fs = require('fs');
const path = require('path');
const rule = require('../../src/rules/require-deprecation-reason');

const getFile = (name) => fs.readFileSync(path.join(__dirname, '../mocks/', name)).toString();

const eslintTester = new RuleTester({
    parser: require.resolve('../../src/parser')
});

eslintTester.run('require-deprecation-reason', rule, {
    valid: [
        getFile('test1.graphql'),
        getFile('/require-deprecation-reason/valid.graphql')
    ],
    invalid: [{
        code: getFile('/require-deprecation-reason/invalid.graphql'),
        errors: 3
    }]
});
