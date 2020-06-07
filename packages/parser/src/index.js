const graphql = require('graphql');

function populateLines(input) {
    const lines = new Map();
    const list = input.match(/^.*$/gm);
    let lineStart = 0;
    list.forEach((line) => {
        lines.set(lineStart, line);
        lineStart += line.length + 1;
    });
    return lines;
}

function getLineColumn(lines, charIndex) {
    const iterator = lines.entries();
    let prev = null;
    let item = iterator.next();
    let index = 0;
    while (item && !item.done && item.value[0] <= charIndex) {
        prev = item;
        index += 1;
        if (item.done) {
            break;
        }
        item = iterator.next();
    }
    return {
        line: index,
        column: Math.abs(charIndex - prev.value[0])
    };
}

exports.parseForESLint = function parseForESLint(code, options) {
    const lines = populateLines(code);
    const source = new graphql.Source(code, (options && options.filePath) || '');
    const lexer = new graphql.Lexer(source);
    const originalAst = graphql.parse(source, {});
    const comments = [];
    let ast = originalAst;
    try {
        ast = graphql.visit(originalAst, {
            leave(node) {
                const start = getLineColumn(lines, node.loc.start);
                const end = getLineColumn(lines, node.loc.end);
                const { kind } = node;
                const newNode = { ...node };
                if (newNode.type) {
                    newNode.fieldType = newNode.type;
                }
                newNode.oldLoc = {
                    start: node.loc.start,
                    end: node.loc.end
                };
                newNode.loc.start = start;
                newNode.loc.end = end;
                newNode.type = kind;
                newNode.range = [newNode.oldLoc.start, newNode.oldLoc.end];
                return newNode;
            }
        });
    } catch (e) {
        throw new Error(e);
    }

    const tokens = [];
    let token = lexer.advance();
    while (token && token.kind !== '<EOF>') {
        tokens.push({ ...token, range: [token.start, token.end] });
        if (token.kind === 'String' || token.kind === 'BlockString') {
            comments.push({ ...token, range: [token.start, token.end] });
        }
        token = lexer.advance();
    }

    ast.tokens = tokens;
    ast.comments = [];
    ast.range = {};

    return {
        ast,
        scopeManager: {
            variables: [], scopes: [{ set: new Map(), variables: [], through: [] }], globalScope: { set: new Map(), variables: [] }, getDeclaredVariables: () => {}
        },
        visitorKeys: {
            Document: ['definitions'],
            ObjectTypeDefinition: ['interfaces', 'directives', 'fields', 'name'],
            ObjectTypeExtension: ['interfaces', 'directives', 'fields', 'name'],
            InputObjectTypeDefinition: ['directives', 'fields', 'name'],
            InputValueDefinition: ['directives', 'fieldType', 'defaultValue', 'directives', 'name'],
            FieldDefinition: ['directives', 'fieldType', 'arguments', 'name'],
            EnumTypeDefinition: ['directives', 'directives', 'values', 'name'],
            ScalarTypeDefinition: ['directives', 'name'],
            OperationDefinition: ['variableDefinitions', 'directives', 'selectionSet', 'name'],
            SelectionSet: ['selections', 'name'],
            Field: ['arguments', 'directiveSet', 'selectionSet', 'name'],
            NonNullType: ['fieldType'],
            NamedType: ['name'],
            VariableDefinitions: ['variable', 'type', 'defaultValue', 'directives', 'name'],
            Variable: ['name'],
            Directive: ['name, arguments'],
            Argument: ['name', 'value'],
            ListType: ['fieldType', 'name']
        }
    };
};
