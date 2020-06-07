
module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'requires all deprications to have a reason',
            category: 'Best practices',
            recommended: 'true'
        },

        schema: []
    },
    create(context) {
        return {
            Directive: (node) => {
                if (node.name.value === 'deprecated') {
                    if (!node.arguments.length || !node.arguments.find((argument) => argument.name.value === 'reason')) {
                        context.report(node, 'All deprications require a reason');
                    }
                }
            }
        };
    }
};
