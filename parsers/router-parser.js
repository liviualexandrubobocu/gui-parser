const fs = require('fs');
const { between, many, str, parse, possibly, anyOfString, regex, digits, char, choice, sequenceOf, anythingExcept, sepBy, whitespace, recursiveParser, letters, optionalWhitespace } = require('arcsecond');

// DEFINING TYPES

// Create a single value type constructor
const makeBasicType = typeName => value => ({
    type: typeName,
    value: value,
    toString: () => `${typeName}(${value})`
});

// Create a multi-valued type constructor
const makeMultiType = typeName => values => ({
    type: typeName,
    value: values,
    toString: () => `${typeName}(${values.map(v => v.toString()).join(', ')})`
});

const stringType = makeBasicType('String');
const numberType = makeBasicType('Number');
const booleanType = makeBasicType('Boolean');

const arrayType = makeMultiType('Array');
const objectType = makeMultiType('Object');

const keyValuePair = (key, value) => ({
    type: 'KeyValuePair',
    value: [key, value],
    toString: () => `KeyValuePair(${key.toString()}, ${value.toString()})`
});

const nullType = () => ({
    type: 'Null',
    value: null,
    toString: () => 'Null'
});

// PARSE BOOLEAN and null

const nullParser = str('null').map(nullType);
const trueParser = str('true').map(booleanType);
const falseParser = str('false').map(booleanType);

// PARSE NUMBERS

const whitespaceSurrounded = between(whitespace)(whitespace);
const joinedMany = parser => many(parser).map(x => x.join(''));
const betweenQuotes = between(char('"'))(char('"'));

const possiblyWhitespaceSurrounded = between(optionalWhitespace)(optionalWhitespace);
const betweenCurlyBrackets = between(possiblyWhitespaceSurrounded (char('{')))(possiblyWhitespaceSurrounded(char('}')));
//const betweenCurlyBrackets = between(whitespaceSurrounded (char('{')))(whitespaceSurrounded(char('}')));
const betweenSquareBrackets = between(whitespaceSurrounded(char('[')))(whitespaceSurrounded(char(']')));
const commaSeparated = sepBy(whitespaceSurrounded(char(',')));

// possibly parser returning empty string instead of null;
const orEmptyString = parser => possibly(parser).map(x => (x) ? x: '');

//sequences of matches joined together as strings instead of arrays
const joinedSequence = parsers => sequenceOf(parsers).map(x => x.join(''));

const numberParser = joinedSequence([
        orEmptyString(char('-')),
        choice([
            char('0'),
            regex(/^[1-9][0-9]*/),
        ]),
        orEmptyString(joinedSequence(
            char('.'),
            digits
        )),
        orEmptyString(joinedSequence([
            anyOfString('eE'),
            orEmptyString(anyOfString('-+')),
            digits
        ]))
    ]).map(x => numberType(Number(x)));


const stringParser = betweenQuotes(joinedMany(choice([
    joinedSequence([
        char('\\'),
        char('"'),
    ]),
    anythingExcept(char('"'))
])));

const mappedStringParser = stringParser.map(stringType);

const jsonParser = recursiveParser(() => choice([
    nullParser,
    trueParser,
    falseParser,
    numberParser,
    stringParser,
    arrayParser,
    objectParser
]));

const keyValuePairParser = sequenceOf([
    stringParser,
    whitespaceSurrounded(char(':')),
    jsonParser
]).map((key, _, value) => keyValuePair(key, value));

const arrayParser = betweenSquareBrackets(commaSeparated(jsonParser)).map(arrayType);
const objectParser = betweenCurlyBrackets(commaSeparated(keyValuePairParser)).map(objectType);

const routerContent = fs.readFileSync('./ng-route/src/app/app-routing.module.ts', 'utf8');
// console.log(routerContent);

const parseText = parse (keyValuePairParser);

const importType = typeName => values => ({
    type: typeName,
    names: values[1],
    location: values[4]
});

const importsParser = sequenceOf([
    str('import'),
    betweenCurlyBrackets(letters),
    str('from'),
    optionalWhitespace,
    stringParser
]).map(importType('es6'));


const keyValuePairType = () => (values) => ({
    key: values[0],
    value: values[1],
});

const moduleClassName = sequenceOf([
    str('export'),
    whitespaceSurrounded(str('class')),
    stringParser,
    char('{') 
]).map()


module.exports = importsParser;