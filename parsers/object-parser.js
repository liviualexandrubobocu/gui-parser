const { char } = require('arcsecond');

const openingPassingObject = sequenceOf([
    char('('),
    char('{')
]);

const closingPassingObject = sequenceOf([
    char('}'),
    char(')')
]);

const keyValuePair = (key) => sequenceOf([
    str(key),
    optionalWhitespace,
    char(':'),
    optionalWhitespace,
    arrayParser
]);

module.exports = {
    openingPassingObject: openingPassingObject,
    closingPassingObject: closingPassingObject,
    keyValuePair: keyValuePair
}