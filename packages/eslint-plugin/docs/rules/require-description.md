# Enforce descriptions in your type definitions

Because documentation for GraphQL schemas are usually auto-generated omitting descriptions will not provide any information about types in your schema. It's considered best practice to provide descriptions for all your type definitions.

## Rule Details

This rule requires descriptions to be present in your type definitions files.

Examples of **incorrect** code for this rule:

```graphql
# eslint @graphql-eslint/require-description: ["error", { types: true, fields: true }]

type someTypeName {
    name: String
}
```

Examples of **correct** code for this rule:

```graphql
# eslint @graphql-eslint/require-description: ["error", { types: true, fields: true }]

""" Some type description """
type someTypeName {
    """ Name description """
    name: String
}
```

## Options

This rule accetps an configuration object with four options:
* `"types": boolean` - Requires descriptions for all types. Defaults to `true`
* `"fields": boolean` - Requires descriptions for all fields. Defaults to `true`
* `"enumValues": boolean` - Requires descriptions for all enum values. Defaults to `true`
* `"inputOptionsValues": boolean` - Requires descriptions for all input properties. Defaults to `true`