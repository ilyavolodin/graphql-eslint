const formats = {
    camelCase: /^[a-z][^_]*$/g,
    PascalCase: /^[A-Z][^_]*$/g,
    snake_case: /^[a-z_]*$/g,
    UPPER_CASE: /^[A-Z_]*$/g
};

function checkNameFormat(value, style, leadingUnderscore, trailingUnderscore) {
    let name = value;
    if (leadingUnderscore === 'allow') {
        [, name] = name.match(/^_*(.*)$/);
    }
    if (trailingUnderscore === 'allow') {
        name = name.replace(/_*$/, '');
    }
    return new RegExp(formats[style]).test(name);
}

const schemaOption = {
    type: 'string',
    enum: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE']
};

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'requires description around GraphQL nodes',
            category: 'Best practices',
            recommended: 'true',
            url: 'https://github.com/ilyavolodin/graphql-eslint/blob/master/docs/rules/naming-convention.md'
        },

        schema: [{
            type: 'object',
            properties: {
                FieldDefinition: schemaOption,
                EnumValueDefinition: schemaOption,
                InputValueDefinition: schemaOption,
                TypeDefinition: schemaOption,
                FragmentDefinition: schemaOption,
                ScalarTypeDefinition: schemaOption,
                leadingUnderscore: {
                    type: 'string',
                    enum: ['allow', 'forbid'],
                    default: 'forbid'
                },
                trailingUnderscore: {
                    type: 'string',
                    enum: ['allow', 'forbid'],
                    default: 'forbid'
                }
            }
        }]
    },
    create(context) {
        const options = context.options[0] || {};
        const checkNode = (node, style, nodeType) => {
            if (!checkNameFormat(node.value, style, options.leadingUnderscore, options.trailingUnderscore)) {
                context.report(node, '{{nodeType}} name "{{nodeName}}" should be in {{format}} format', { format: style, nodeType, nodeName: node.value });
            }
        };
        return {
            Name: (node) => {
                if (node.value.startsWith('_') && options.leadingUnderscore === 'forbid') {
                    context.report(node, 'Leading underscores are not allowed');
                }
                if (node.value.endsWith('_') && options.trailingUnderscore === 'forbid') {
                    context.report(node, 'Trailing underscores are not allowed');
                }
            },
            ObjectTypeDefinition: (node) => {
                if (options.TypeDefinition) {
                    checkNode(node.name, options.TypeDefinition, 'Type');
                }
            },
            InterfaceTypeDefinition: (node) => {
                if (options.TypeDefinition) {
                    checkNode(node.name, options.TypeDefinition, 'Interface');
                }
            },
            EnumTypeDefinition: (node) => {
                if (options.TypeDefinition) {
                    checkNode(node.name, options.TypeDefinition, 'Enumerator');
                }
            },
            InputObjectTypeDefinition: (node) => {
                if (options.TypeDefinition) {
                    checkNode(node.name, options.TypeDefinition, 'Input type');
                }
            },
            FieldDefinition: (node) => {
                if (options.FieldDefinition) {
                    checkNode(node.name, options.FieldDefinition, 'Field');
                }
            },
            EnumValueDefinition: (node) => {
                if (options.EnumValueDefinition) {
                    checkNode(node.name, options.EnumValueDefinition, 'Enumeration value');
                }
            },
            InputValueDefinition: (node) => {
                if (options.InputValueDefinition) {
                    checkNode(node.name, options.InputValueDefinition, 'Input property');
                }
            },
            FragmentDefinition: (node) => {
                if (options.FragmentDefinition) {
                    checkNode(node.name, options.FragmentDefinition, 'Fragment');
                }
            },
            ScalarTypeDefinition: (node) => {
                if (options.ScalarTypeDefinition) {
                    checkNode(node.name, options.ScalarTypeDefinition, 'Scalar');
                }
            }
        };
    }
};
