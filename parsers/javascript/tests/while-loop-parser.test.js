const whileLoopParser = require('../while-loop-parser.js');
const { WhileLoopStructure } = require('../models/while-loop');

test('should get condition from empty while loop statement', () => {
    whileLoopParser.fork('while(condition){}', (error, parsingState) => {
        const e = new Error(error);
        e.parsingState = parsingState;
        throw e;
    }, (result, parsingState) => {
        expect(result).toEqual(new WhileLoopStructure('condition', ''));
    });
});
