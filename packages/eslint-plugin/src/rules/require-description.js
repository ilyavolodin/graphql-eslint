
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
                fields: {
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
                        context.report(node.name, 'Missing description for type {{name}}', { name: node.name.value });
                    }
                }
            },
            FieldDefinition: (node) => {
                if (context.options[0].fields) {
                    if (!node.description || !node.description.value) {
                        context.report(node.name, 'Missing description for field {{name}}', { name: node.name.value });
                    }
                }
            },
            EnumValueDefinition: (node) => {
                if (context.options[0].enumValues) {
                    if (!node.description || !node.description.value) {
                        context.report(node.name, 'Missing description for enum value {{name}}', { name: node.name.value });
                    }
                }
            },
            InputValueDefinition: (node) => {
                if (context.options[0].inputOptionsValues) {
                    if (!node.description || !node.description.value) {
                        context.report(node.name, 'Missing description for input value {{name}}', { name: node.name.value });
                    }
                }
            }
        };
    }
};
