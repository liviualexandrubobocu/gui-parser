const { optionalWhitespace, str, char, everythingUntil, coroutine, lookAhead, possibly } = require("arcsecond");
const { ForLoopStructure } = require('./models/for-loop');
const minify = require('./helpers/minify');

const forLoopStructure = (obj) => new ForLoopStructure(obj.initialization, obj.condition, obj.finalStatement, obj.statements);


const forLoopParser = coroutine(function* () {
    let statements = [];

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
    } else {
        yield char('{');
        yield optionalWhitespace;
        const searchForRecursion = yield lookAhead(possibly(str('for')));
        if(searchForRecursion !== null){
            const statementsBeforeRecursion = yield everythingUntil(str('for'));
            statements.push(minify(statementsBeforeRecursion));

            let recursiveStrParser = yield everythingUntil(char('}'));
            recursiveStrParser += '}';

            statements.push({ descendant: forLoopParser.run(recursiveStrParser).result });
        }
        statements.push(minify(yield everythingUntil(char('}'))));
        yield(char('}'));
    }
    
    return {
        initialization: initialization,
        condition: condition,
        finalStatement: finalStatement,
        statements: statements
    };
}).map(forLoopStructure);


module.exports = forLoopParser;