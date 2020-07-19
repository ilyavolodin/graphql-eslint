module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'require mutation argument to be always called "input" and input type to be called Mutation name + "Input"',
            category: 'Stylistic Issues',
            recommended: 'false',
            url: 'https://github.com/ilyavolodin/graphql-eslint/blob/master/docs/rules/input-name.md'
        },
        schema: [{
            type: 'object',
            properties: {
                checkInputType: {
                    type: 'boolean',
                    default: 'true'
                }
            },
            additionalProperties: false
        }]
    },
    create(context) {
        const listners = {
            'FieldDefinition > InputValueDefinition': (node) => {
                if (node.name.value !== 'input') {
                    context.report(node.name, `Input "${node.name.value}" should be called "input"`);
                }
            }
        };
        if (context.options && context.options[0] && context.options[0].checkInputType) {
            listners['FieldDefinition > InputValueDefinition NamedType'] = (node) => {
                const findInputType = (item) => {
                    let currentNode = item;
                    while (currentNode.type !== 'InputValueDefinition') {
                        currentNode = currentNode.parent;
                    }
                    return currentNode;
                };

                const mutationName = `${findInputType(node).parent.name.value}Input`;

                if (node.name.value !== mutationName) {
                    context.report(node, `InputType "${node.name.value}" name should be "${mutationName}"`);
                }
            };
        }
        return listners;
    }
};
