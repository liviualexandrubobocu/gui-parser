const functionParser = require('../function-parser.js');
const { FunctionStructure } = require('../models/function');

test('should return function name and parameters', () => {
    functionParser.fork('function testName(param1, param2){}', (error, parsingState) => {
        const e = new Error(error);
        e.parsingState = parsingState;
        throw e;
    }, (result) => {
        expect(result).toEqual(new FunctionStructure('testName', 'param1,param2', '', ''));
    });
})