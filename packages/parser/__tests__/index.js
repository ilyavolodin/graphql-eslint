const parser = require('../src');

describe('parser', () => {
    it('parseForESLint() should return ast and tokens', () => {
        const code = `""" generic query placeholder """
            type Query`;

        const result = parser.parseForESLint(code, { fileName: 'test.graphql' });
        expect(result.ast).toMatchSnapshot();
        expect(result.ast.tokens).toBeTruthy();
    });

    it('should throw on invalid code', () => {
        const code = 'Hello World!';

        expect(() => { parser.parseForESLint(code); }).toThrow();
    });

    it('should correctly preserve "type" property', () => {
        const code = `query GetUser($userId: ID!) {
            user(id: $userId) {
                id
            }
        }`;

        const result = parser.parseForESLint(code, { fileName: 'test.graphql' });

        const field = result.ast.definitions[0].variableDefinitions[0];

        expect(field.type).toBe('VariableDefinition');
        expect(field.fieldType.type).toBe('NonNullType');
    });
});
