const doWhileLoopParser = require('../do-while-loop-parser.js');
const { DoWhileLoopStructure } = require('../models/do-while-loop');

test('should get condition from empty do while loop statement', () => {
    doWhileLoopParser.fork('do{}while(condition);', (error, parsingState) => {
        const e = new Error(error);
        e.parsingState = parsingState;
        throw e;
    }, (result, parsingState) => {
        expect(result).toEqual(new DoWhileLoopStructure('condition', ''));
    });
});
