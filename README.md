# Disclaimer
**This repo is an early alpha version, use at your own risk. Feedback and bug reports are welcome**

# Getting Started

## Installation
This repository contains a project that allows you to lint GraphQL files through ESLint.

```
npm install @graphql-eslint/eslint-plugin --save-dev
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
        parser: require.resolve('@graphql-eslint/eslint-plugin/src/parser'),
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

By default, ESLint VSCode plugin will not lint files with extensions other then js, jsx, ts, tsx. In order to enable it processing other extensions, add the following section in settings.json or workspace configuration.

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

* [naming-convention](docs/rules/naming-convention.md) - Rule that enforces naming convention in your code
* [prettier](docs/rules/prettier.md) - Rule that enforces styling convention in your code
* [require-deprecation-reason](docs/rules/require-deprecation-reason.md) - Rule that requires all `@deprecated` directives to have a reason
* [require-description](docs/rules/require-description.md) - Rule that requires descriptions to be present in your code
* [description-style](docs/rules/description-style.md) - Rule that enforces style of the description comments
* [input-name](docs/rules/input-name.md) - Rule that requires the same name of input parameters and controls InputType names

# Known limitations

Currently, ESLint directives through comments are not supported. So there's no way to disable/enable rules inline in your GraphQL code.