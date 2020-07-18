const { RuleTester } = require('eslint');
const fs = require('fs');
const path = require('path');
const rule = require('../../src/rules/description-style');

const getFile = (name) => fs.readFileSync(path.join(__dirname, '../mocks/', name)).toString();

const eslintTester = new RuleTester({
    parser: require.resolve('../../src/parser')
});

eslintTester.run('description-style', rule, {
    valid: [{
        code: getFile('../mocks/require-description/validEnum.graphql'),
        options: [{ style: 'block' }]
    },
    getFile('../mocks/require-description/validObject.graphql')
    ],
    invalid: [{
        code: getFile('../mocks/require-description/validEnum.graphql'),
        errors: 3
    }, {
        code: getFile('../mocks/require-description/validObject.graphql'),
        options: [{ style: 'block' }],
        errors: 3
    }]
});
