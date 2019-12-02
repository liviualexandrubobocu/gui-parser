const { optionalWhitespace, str, char, everythingUntil, coroutine } = require("arcsecond");
const { ForInLoopStructure } = require('./models/for-in-loop');

const forInLoopStructure = (values) => new ForInLoopStructure(values.obj, values.enumerableProperties, values.statements);


const forInLoopParser = coroutine(function* () {
    yield str('for');
    yield optionalWhitespace;
    yield char('(');
    yield everythingUntil(str('in'));
    yield str('in');
    yield optionalWhitespace;
    const obj = yield everythingUntil(char(")"));
    yield char(')');
    yield optionalWhitespace;
    yield char('{');
    yield optionalWhitespace;
    const statements = yield everythingUntil(char('}'));

    const enumerableProperties = '';

    return {
        obj: obj,
        enumerableProperties: enumerableProperties,
        statements: statements
    };
}).map(forInLoopStructure);

module.exports = forInLoopParser;