const { RuleTester } = require('eslint');
const fs = require('fs');
const path = require('path');
const rule = require('../../src/rules/require-deprication-reason');

const getFile = (name) => fs.readFileSync(path.join(__dirname, '../mocks/', name)).toString();

const eslintTester = new RuleTester({
    parser: require.resolve('@graphql-eslint/parser')
});

eslintTester.run('require-deprication-reason', rule, {
    valid: [
        getFile('test1.graphql'),
        getFile('/require-deprication-reason/valid.graphql')
    ],
    invalid: [{
        code: getFile('/require-deprication-reason/invalid.graphql'),
        errors: 3
    }]
});
