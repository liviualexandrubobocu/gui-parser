const forLoopParser = require('../for-loop-parser.js');
const { ForLoopStructure } = require('../models/for-loop');

test('should get initialization, condition and finalExpression', () => {
    forLoopParser.fork('for(let i = 0; i < 10; i++){ }', (error, parsingState) => {
        const e = new Error(error);
        e.parsingState = parsingState;
        throw e;
    }, (result, parsingState) => {
        expect(result).toEqual(new ForLoopStructure('let i = 0', 'i < 10', 'i++', ['']));
    });
});


test('should get initialization, condition, finalExpression and statements', () => {
    forLoopParser.fork(`for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            console.log(j);
        }
    }`, (error, parsingState) => {
        const e = new Error(error);
        e.parsingState = parsingState;
        throw e;
    }, (result) => {
        expect(result).toEqual(new ForLoopStructure('let i = 0', 'i < 10', 'i++', 
        [
            '',
            {
                descendant: new ForLoopStructure('let j = 0', 'j < 10', 'j++', ['console.log(j);'])
            },
            ''
        ]
        ));
    });
});

test('should get statements with no initialization, condition or finalExpression', () => {
    forLoopParser.fork(`for (;;) {
        if (i > 3) break;
        console.log(i);
        i++;
      }`, (error, parsingState) => {
        const e = new Error(error);
        e.parsingState = parsingState;
        throw e;
    }, (result, parsingState) => {
        expect(result).toEqual(new ForLoopStructure('', '', '', ['if(i>3)break;console.log(i);i++;']));
    });
});

test('should return initalization, condition and finalExpression with no statememts', () => {
    forLoopParser.fork('for(let i = 0; i < 10; i++);', (error, parsingState) => {
        const e = new Error(error);
        e.parsingState = parsingState;
        throw e;
    }, (result, parsingState) => {
        expect(result).toEqual(new ForLoopStructure('let i = 0', 'i < 10', 'i++', []));
    });
});