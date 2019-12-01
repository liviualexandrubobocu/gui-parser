const { sequenceOf, char, str, many, letters, withData, coroutine, lookAhead, optionalWhitespace, everythingUntil } = require('arcsecond');

const switchStructure = values => {
    console.log('here ==== ', values);
    return ({
    cases: values[3],
    behaviors: values[3]
});}

const switchParser = coroutine(function * (){
    const switchStatement = yield str('switch');
    const whiteSpace = yield optionalWhitespace;
    yield char('(');
    const testedVariable = yield everythingUntil(char(')'));

    return testedVariable;
}).map(switchStructure);

// const switchParser = sequenceOf([
//     str('switch'),
//     optionalWhitespace,
//     char('('),
//     optionalWhitespace,
//     everythingUntil(char(')')),
//     char(')'),
//     optionalWhitespace,
//     char('{'),
//     caseParsers(everythingUntil(char('}')))
// ]).map(switchStructure);


module.exports = switchParser;