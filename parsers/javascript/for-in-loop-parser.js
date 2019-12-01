import { optionalWhitespace, whitespace } from "arcsecond";

const forOfLoopOpeningParser = sequenceOf([
    str('for'),
    optionalWhitespace,
    char('('),
    optionalWhitespace,
    stringParser,
    whitespace,
    str('in'),
    whitespace,
    stringParser,
    optionalWhitespace,
    char(')'),
    optionalWhitespace,
    char('{')
]);