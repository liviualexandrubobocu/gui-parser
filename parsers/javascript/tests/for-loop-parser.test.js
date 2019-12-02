const forLoopParser = require('../for-loop-parser.js');
const { ForLoopStructure } = require('../models/for-loop');

test('should get initialization condition and finalExpression', () => {
    expect(forLoopParser.run('for(let i = 0; i < 10; i++){}').result).toEqual(
        new ForLoopStructure('let i = 0', 'i < 10', 'i++', '')
    );
});