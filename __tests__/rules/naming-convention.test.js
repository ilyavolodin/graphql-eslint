const { RuleTester } = require('eslint');
const fs = require('fs');
const path = require('path');
const rule = require('../../src/rules/naming-convention');

const getFile = (name) => fs.readFileSync(path.join(__dirname, '../mocks/', name)).toString();

const eslintTester = new RuleTester({
    parser: require.resolve('../../src/parser')
});

eslintTester.run('naming-convention', rule, {
    valid: [{
        code: getFile('test1.graphql'),
        options: [{
            TypeDefinition: 'PascalCase', FieldDefinition: 'camelCase', EnumValueDefinition: 'UPPER_CASE', InputValueDefinition: 'camelCase', FragmentDefinition: 'PascalCase'
        }]
    }, {
        code: 'type B { test: String }',
        options: [{ TypeDefinition: 'PascalCase' }]
    }, {
        code: 'type B { test: String }',
        options: [{ leadingUnderscore: 'forbid', trailingUnderscore: 'forbid' }]
    }, {
        code: 'type __B { __test__: String }',
        options: [{
            leadingUnderscore: 'allow', trailingUnderscore: 'allow', TypeDefinition: 'PascalCase', FieldDefinition: 'camelCase'
        }]
    }, {
        code: 'scalar BSONDecimal',
        options: [{
            ScalarTypeDefinition: 'PascalCase'
        }]
    }, {
        code: 'interface B { test: String }',
        options: [{ TypeDefinition: 'PascalCase' }]
    }, {
        code: 'enum B { TEST }',
        options: [{ TypeDefinition: 'PascalCase', EnumValueDefinition: 'UPPER_CASE' }]
    }, {
        code: 'input Test { item: String }',
        options: [{ TypeDefinition: 'PascalCase', InputValueDefinition: 'camelCase' }]
    }, {
        code: 'input test { item: String } enum B { Test } interface A { i: String } fragment PictureFragment on Picture { uri } scalar Hello'
    }],
    invalid: [{
        code: 'type b { test: String }',
        options: [{ TypeDefinition: 'PascalCase', FieldDefinition: 'PascalCase' }],
        errors: [{ message: 'Type name "b" should be in PascalCase format' }, { message: 'Field name "test" should be in PascalCase format' }]
    }, {
        code: 'type __b { test__: String }',
        options: [{ leadingUnderscore: 'forbid', trailingUnderscore: 'forbid' }],
        errors: [{ message: 'Leading underscores are not allowed' }, { message: 'Trailing underscores are not allowed' }]
    }, {
        code: 'scalar BSONDecimal',
        options: [{
            ScalarTypeDefinition: 'snake_case'
        }],
        errors: [{ message: 'Scalar name "BSONDecimal" should be in snake_case format' }]
    }, {
        code: getFile('large.graphql'),
        options: [{
            TypeDefinition: 'PascalCase',
            FieldDefinition: 'camelCase',
            EnumValueDefinition: 'UPPER_CASE',
            InputValueDefinition: 'camelCase',
            FragmentDefinition: 'PascalCase',
            ScalarTypeDefinition: 'PascalCase',
            leadingUnderscore: 'allow'
        }],
        errors: 27
    }, {
        code: 'enum B { test }',
        options: [{ TypeDefinition: 'camelCase', EnumValueDefinition: 'UPPER_CASE' }],
        errors: [{ message: 'Enumerator name "B" should be in camelCase format' }, { message: 'Enumeration value name "test" should be in UPPER_CASE format' }]
    }, {
        code: 'input test { _Value: String }',
        options: [{ TypeDefinition: 'PascalCase', InputValueDefinition: 'snake_case' }],
        errors: [{ message: 'Input type name "test" should be in PascalCase format' }, { message: 'Input property name "_Value" should be in snake_case format' }, { message: 'Leading underscores are not allowed' }]
    }]
});
