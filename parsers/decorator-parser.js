const { sequenceOf, char, string } = require('arcsecond');
const { openingPassingObject } = require('object-parser');

const decoratorParser = (decoratorName) => sequenceOf([
    char('@'),
    string(decoratorName),
    openingPassingObject
]);

module.exports = decoratorParser;