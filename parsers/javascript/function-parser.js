const { optionalWhitespace, str, char, everythingUntil, coroutine, whitespace } = require("arcsecond");
const { FunctionStructure } = require('./models/function');
const minify = require('./helpers/minify');

const functionStructure = (obj) => new FunctionStructure(obj.name, obj.parameters, obj.body, obj.output);

const functionParser = coroutine(function* () {
    let body = '';

    yield str('function');
    yield whitespace;
    const name = yield everythingUntil(char('('));
    yield char('(');
    const parameters = yield everythingUntil(char(')'));
    yield char(')');
    yield optionalWhitespace;
    yield char('{');
    yield optionalWhitespace;
    body = yield everythingUntil(char('}'));
    yield char('}');
    yield optionalWhitespace;

    return {
        name: name,
        parameters: minify(parameters),
        body: body,
        output : ''
    };
}).map(functionStructure);


module.exports = functionParser;