// eslint-disable-next-line import/no-extraneous-dependencies
const airbnb = require('eslint-config-airbnb-base/rules/style');

const [, , options] = airbnb.rules.indent;

module.exports = {
    overrides: [{
        files: ['*.js'],
        extends: ['airbnb-base'],
        rules: {
            indent: ['error', 4, options],
            'comma-dangle': 'off',
            'max-len': 'off'
        },
    }, {
        files: ['**/tests/**/*.js'],
        extends: ['airbnb-base'],
        rules: {
            indent: ['error', 4, options],
            'comma-dangle': 'off',
            'max-len': 'off'
        },
        env: { jest: true }
    }, {
        files: ['*.graphql'],
        parser: require.resolve('@graphql-eslint/parser')
    }]
};
