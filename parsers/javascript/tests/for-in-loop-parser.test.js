const forInLoopParser = require('../for-in-loop-parser.js');
const { ForInLoopStructure } = require('../models/for-in-loop');

test('should get name of object with enumerable properties', () => {
    expect(forInLoopParser.run('for(let property in obj){}').result).toEqual(
        new ForInLoopStructure('obj', '', '')
    );
});
