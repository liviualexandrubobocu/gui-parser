const { sequenceOf, char, str, optionalWhitespace, everythingUntil } = require('arcsecond');


const ifBlockStructure = values => ({
    condition: values[4],
    behavior: values[9]
});

const ifBlockParser = sequenceOf([
    str('if'),
    optionalWhitespace,
    char('('),
    optionalWhitespace,
    everythingUntil(char(')')),
    char(')'),
    optionalWhitespace,
    char('{'),
    optionalWhitespace,
    everythingUntil(char('}')),
]).map(ifBlockStructure);

module.exports = ifBlockParser;