const { RuleTester } = require('eslint');
const fs = require('fs');
const path = require('path');
const rule = require('../../src/rules/require-description');

const getFile = (name) => fs.readFileSync(path.join(__dirname, '../mocks/', name)).toString();

const eslintTester = new RuleTester({
    parser: require.resolve('@graphql-eslint/parser')
});

eslintTester.run('require-description', rule, {
    valid: [
        getFile('test1.graphql'),
        { code: getFile('require-description/validEnum.graphql'), options: [{ enumValues: true }] },
        { code: getFile('require-description/validInput.graphql'), options: [{ inputOptionsValues: true }] },
        { code: getFile('require-description/validObject.graphql'), options: [{ types: true }] }
    ],
    invalid: [{
        code: getFile('require-description/invalidInput.graphql'),
        options: [{
            inputOptionsValues: true
        }],
        errors: 7
    }, {
        code: getFile('require-description/invalidEnum.graphql'),
        options: [{
            enumValues: true
        }],
        errors: 3
    }, {
        code: getFile('require-description/invalidObject.graphql'),
        options: [{
            enumValues: true
        }],
        errors: 3
    }]
});
