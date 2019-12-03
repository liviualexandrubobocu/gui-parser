const { optionalWhitespace, str, char, everythingUntil, coroutine, lookAhead, possibly } = require("arcsecond");
const { WhileLoopStructure } = require('./models/while-loop');
const minify = require('./helpers/minify');

const whileLoopStructure = (obj) => new WhileLoopStructure(obj.condition, obj.statements);


const whileLoopParser = coroutine(function* () {
    let statements = '';

    yield str('while');
    yield optionalWhitespace;
    yield char('(');
    const condition = yield everythingUntil(char(')'));
    yield char(')');
    yield optionalWhitespace;
    yield char('{');
    yield optionalWhitespace;
    statements = yield everythingUntil(char('}'));
    yield char('}');
    yield optionalWhitespace;

    return {
        condition: condition,
        statements: minify(statements)
    };
}).map(whileLoopStructure);


module.exports = whileLoopParser;