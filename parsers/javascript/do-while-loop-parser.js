const { optionalWhitespace, str, char, everythingUntil, coroutine, lookAhead, possibly } = require("arcsecond");
const { DoWhileLoopStructure } = require('./models/do-while-loop');
const minify = require('./helpers/minify');

const doWhileLoopStructure = (obj) => new DoWhileLoopStructure(obj.condition, obj.statements);

const doWhileLoopParser = coroutine(function* () {
    let statements = '';
    yield str('do');
    yield char('{');
    yield optionalWhitespace;
    statements = yield everythingUntil(char('}'));
    yield char('}');
    yield optionalWhitespace;

    yield str('while');
    yield optionalWhitespace;
    yield char('(');
    const condition = yield everythingUntil(char(')'));
    yield char(')');
    yield optionalWhitespace;
    yield char(';');

    return {
        condition: condition,
        statements: minify(statements)
    };
}).map(doWhileLoopStructure);


module.exports = doWhileLoopParser;