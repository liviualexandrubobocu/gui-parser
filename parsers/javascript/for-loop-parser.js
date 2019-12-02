const { optionalWhitespace, str, char, everythingUntil, coroutine, lookAhead, possibly } = require("arcsecond");
const { ForLoopStructure } = require('./models/for-loop');
const minify = require('./helpers/minify');

const forLoopStructure = (obj) => new ForLoopStructure(obj.initialization, obj.condition, obj.finalStatement, obj.statements);


const forLoopParser = coroutine(function* () {
    let statements = '';

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
    const wantedString = yield lookAhead(possibly(everythingUntil(char(';'))));
    if(wantedString !== null && minify(wantedString) === ''){ 
        yield char(';');
        statements = '';
    } else {
        yield char('{');
        yield optionalWhitespace;
        statements = yield everythingUntil(char('}'));
        yield(char('}'));
    }
    
    return {
        initialization: initialization,
        condition: condition,
        finalStatement: finalStatement,
        statements: minify(statements)
    };
}).map(forLoopStructure);


module.exports = forLoopParser;