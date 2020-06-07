
module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'requires description around GraphQL nodes',
            category: 'Best practices',
            recommended: 'true'
        },

        schema: [{
            type: 'object',
            properties: {
                types: {
                    type: 'boolean',
                    default: true
                },
                enumValues: {
                    type: 'boolean',
                    default: false
                },
                inputOptionsValues: {
                    type: 'boolean',
                    default: false
                }
            }
        }]
    },
    create(context) {
        return {
            ObjectTypeDefinition: (node) => {
                if (context.options[0].types) {
                    if (!node.description || !node.description.value) {
                        context.report(node, 'Missing description for type');
                    }
                }
            },
            FieldDefinition: (node) => {
                if (context.options[0].types) {
                    if (!node.description || !node.description.value) {
                        context.report(node, 'Missing description for type');
                    }
                }
            },
            EnumValueDefinition: (node) => {
                if (context.options[0].enumValues) {
                    if (!node.description || !node.description.value) {
                        context.report(node, 'Missing description for enum value');
                    }
                }
            },
            InputValueDefinition: (node) => {
                if (context.options[0].inputOptionsValues) {
                    if (!node.description || !node.description.value) {
                        context.report(node, 'Missing description for input value');
                    }
                }
            }
        };
    }
};
