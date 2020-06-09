const { RuleTester } = require('eslint');
const fs = require('fs');
const path = require('path');
const rule = require('../../src/rules/prettier');

const getFile = (name) => fs.readFileSync(path.join(__dirname, '../mocks/', name)).toString();

const eslintTester = new RuleTester({
    parser: require.resolve('@graphql-eslint/parser')
});

eslintTester.run('prettier', rule, {
    valid: ['scalar Test\n'],
    invalid: [{
        code: getFile('test1.graphql'),
        errors: 6,
        output: getFile('test1.fixed.graphql')
    }]
});
