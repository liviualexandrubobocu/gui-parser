const whileLoopParser = require('../while-loop-parser.js');
const { WhileLoopStructure } = require('../models/while-loop');

const { Node, Leaf } = require('../AST/ast');

// test('should get condition from empty while loop statement', () => {
//     whileLoopParser.fork('while(condition){}', (error, parsingState) => {
//         const e = new Error(error);
//         e.parsingState = parsingState;
//         throw e;
//     }, (result) => {
//         expect(result).toEqual(new WhileLoopStructure('condition', ''));
//     });
// });

test('should get into AST the following while', () => {
    whileLoopParser.fork('while(i<3){ i++; }', (error, parsingState) => {
        const e = new Error(error);
        e.parsingState = parsingState;
        throw e;
    }, (result) => {
        const p1 = new Leaf('id', 'i');
        const p2 = new Leaf('num', 3);
        const p3 = new Node('<', p1, p2);
        const p4 = new Leaf('id', 'i');
        const p5 = new Node('++', p4);
        const p6 = new Node('while', p3, p5);

        expect(result).toEqual(p6);
    });
});