const forOfLoopParser = require('../for-of-loop-parser.js');
const { ForOfLoopStructure } = require('../models/for-of-loop');

test('should get name of iterable array', () => {
    expect(forOfLoopParser.run('for(let element of elements){}').result).toEqual(
        new ForOfLoopStructure('elements', '')
    );
});
