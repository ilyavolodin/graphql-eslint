module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'requires all deprecations to have a reason',
            category: 'Best practices',
            recommended: 'true',
            url: 'https://github.com/ilyavolodin/graphql-eslint/blob/master/docs/rules/require-deprecation-reason.md'
        },
        schema: []
    },
    create(context) {
        return {
            Directive: (node) => {
                if (node.name.value === 'deprecated') {
                    if (!node.arguments.length || !node.arguments.find((argument) => argument.name.value === 'reason')) {
                        context.report(node, 'All deprecations require a reason');
                    }
                }
            }
        };
    }
};
