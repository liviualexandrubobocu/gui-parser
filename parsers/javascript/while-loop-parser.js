const { optionalWhitespace, str, letters, char, everythingUntil, coroutine, lookAhead, possibly } = require("arcsecond");
const { WhileLoopStructure } = require('./models/while-loop');
const minify = require('./helpers/minify');

const whileLoopStructure = (obj) => new WhileLoopStructure(obj.condition, obj.statements);

const { Node, Leaf } = require('./AST/ast');

const parseIncrement = coroutine(function*(providedLookAhead) {
    const possibleBefore = yield(lookAhead(everythingUntil(providedLookAhead)));
    if(possibleBefore !== null){
        const leaf = new Leaf('id', possibleBefore);
        return new Node(providedLookAhead, leaf);
    }
    yield lookAhead;
    const possibleAfter = yield possibly(lookAhead(str()));
    if(possibleAfter !== null){
        const leaf = new Leaf('id', possibleAfter);
        return new Node(providedLookAhead, leaf);
    }

});

const parseLessThan = coroutine(function*(providedLookAhead) {
    let opStack = [];
    const leftOperand = yield everythingUntil(providedLookAhead);
    const p1 = new Leaf('id', leftOperand);
    opStack.push(yield providedLookAhead);
    const possibleRightTree = consume.run(yield letters).result;
    if(possibleTree.children){
        const p2 = new Node(possibleTree.op, ...possibleTree.children);
    } else {
        const p2 = new Leaf(possibleTree.op, possibleTree.children[0]);
    }
    const p3 = new Node(opStack.pop(), p1, p2);

    return p3;
});

const parseForLoop = () => {};
const parseAddition = () => {};

const parseWhileLoop = coroutine(function*(providedLookAhead) {
    const opStack = [];
    opStack.push(yield str(providedLookAhead));
    yield everythingUntil(char('('));
    yield char('(');

    const leftTree = consume.run(yield everythingUntil(char(')'))).result;
    yield char (')');
    yield everythingUntil(char('{'));
    yield char('{');
    const rightTree = consume.run(yield everythingUntil(char('}'))).result;
    yield char('}');

    return new Node(providedLookAhead, leftTree, rightTree);
});

const consume = coroutine(function*(message){
    let tree = null;

    for(let providedLookAhead in lookAheadsTable){
        const possibleTree = yield lookAhead(possibly(str(`${providedLookAhead}`)));
        if(possibleTree !== null){
            console.log(lookAheadsTable[providedLookAhead]);
            tree = lookAheadsTable[providedLookAhead](providedLookAhead).run(message).result;
            break;
        }
    }
    
    return tree;
});

const lookAheadsTable = {
    'while': parseWhileLoop,
    'for': parseForLoop,
    '+': parseAddition,
    '++': parseIncrement,
    '<': parseLessThan
};
// const whileLoopParser = coroutine(function* () {
    
//     consume();
    
//     yield optionalWhitespace;
//     yield char('(');
//     const condition = yield everythingUntil(char(')'));
//     yield char(')');
//     yield optionalWhitespace;
//     yield char('{');
//     yield optionalWhitespace;
//     statements = yield everythingUntil(char('}'));
//     yield char('}');
//     yield optionalWhitespace;

//     return {
//         condition: condition,
//         statements: minify(statements)
//     };
// }).map(whileLoopStructure);

const whileLoopParser = coroutine(function* () {
    const str = yield possibly(letters);
    return consume.run(str).result;
})


module.exports = whileLoopParser;