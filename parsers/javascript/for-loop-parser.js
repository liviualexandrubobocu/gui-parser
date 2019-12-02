const { optionalWhitespace, str, char, everythingUntil, coroutine } = require("arcsecond");
const { ForLoopStructure } = require('./models/for-loop');

const forLoopStructure = (obj) => new ForLoopStructure(obj.initialization, obj.condition, obj.finalStatement, obj.statements);


const forLoopParser = coroutine(function* () {
    yield str('for');
    yield optionalWhitespace;
    yield char('(');
    const initialization = yield everythingUntil(char(';'));
    yield char(';');
    yield optionalWhitespace;
    const condition = yield everythingUntil(char(';'));
    yield char(';');
    yield optionalWhitespace;
    const finalStatement = yield everythingUntil(char(')'));
    yield char(')');
    yield optionalWhitespace;
    yield char('{');
    yield optionalWhitespace;
    const statements = yield everythingUntil(char('}'));

    return {
        initialization: initialization,
        condition: condition,
        finalStatement: finalStatement,
        statements: statements
    };
}).map(forLoopStructure);


module.exports = forLoopParser;