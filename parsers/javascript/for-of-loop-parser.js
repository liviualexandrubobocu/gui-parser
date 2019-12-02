const { optionalWhitespace, str, char, everythingUntil, coroutine } = require("arcsecond");
const { ForOfLoopStructure } = require('./models/for-of-loop');

const forOfLoopStructure = (values) => new ForOfLoopStructure(values.iterable, values.statements);


const forOfLoopParser = coroutine(function* () {
    yield str('for');
    yield optionalWhitespace;
    yield char('(');
    yield everythingUntil(str('of'));
    yield str('of');
    yield optionalWhitespace;
    const iterable = yield everythingUntil(char(")"));
    yield char(')');
    yield optionalWhitespace;
    yield char('{');
    yield optionalWhitespace;
    const statements = yield everythingUntil(char('}'));

    return {
        iterable: iterable,
        statements: statements
    };
}).map(forOfLoopStructure);


module.exports = forOfLoopParser;