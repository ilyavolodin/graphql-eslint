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
        files: ['__tests__/**/*.test.js'],
        env: { jest: true }
    }, {
        files: ['*.graphql'],
        parser: require.resolve('./src/parser/'),
        plugins: ['@graphql-eslint'],
        rules: {
            '@graphql-eslint/naming-convention': ['error', {
                FieldDefinition: 'camelCase',
                EnumValueDefinition: 'camelCase',
                InputValueDefinition: 'camelCase',
                TypeDefinition: 'PascalCase',
                FragmentDefinition: 'PascalCase',
                ScalarTypeDefinition: 'PascalCase'
            }],
            '@graphql-eslint/require-deprecation-reason': ['error'],
            '@graphql-eslint/require-description': ['error', { types: true, enumValues: true, inputOptionsValues: true }],
            '@graphql-eslint/prettier': ['error']
        }
    }]
};
