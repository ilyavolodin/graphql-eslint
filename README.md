# Disclaimer
**This repo is an early alpha version, use at your own risk. Feedback and bug reports are welcome**

# Getting Started

## Installation
This repository contains two projects: Parser and Plugin. Both are necessary to install to lint your GraphQL files.

```
npm install @graphql-eslint/parser @graphql-eslint/eslint-plugin --save-dev
```

## Configuration

In order to enable linting you also have to modify your ESLint configuration file.

```js
{
    ...
    overrides: [{
        files: ['*.js'],
        // move your top level JavaScript/TypeScript configuration here
        // so that JavaScript rules wouldn't try to run on graphQL files
    },{
        files: ['*.graphql'],
        parser: require.resolve('@graphql-eslint/parser'),
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
}
```

It's important that you don't have any rules configured at top level config, and to move all configurations into overrides section. Since JavaScript rules can't run on GraphQL files and vice versa, if you have rules configured at the top level, they will try to also execute for all overrides, as ESLint's configs cascade.

## Integrating with VSCode plugin

By default, ESLint VSCode plugin will not lint files with extentions other then js, jsx, ts, tsx. In order to enable it processing other extentions, add the following section in settings.json or workspace configuration.

```json
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "graphql"
],
"eslint.options": {
    "extentions": [".js", ".graphql"]
}
```

# Available Rules

See [plugin](packages/eslint-plugin/README.md) for details

# Known limitations

Currently, ESLint directives through comments are not supported. So there's no way to disable/enable rules inline in your GraphQL code.