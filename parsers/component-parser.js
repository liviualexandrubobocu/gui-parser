const { sequenceOf, possibly, optionalWhiteSpace, whitespace } = require('arcsecond');
const { entityParser } = require('./entity-parser');

const componentText = `import { Component } from '@angular/core';
@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.scss']
})
export class AppComponent {
title = 'ng-route';
}`;

const lines = componentText.split('\n');
const componentDecorator = decoratorParser('Component');

const possibleComponentProperties = ['selector', 'templateUrl', 'styleUrls'];

const componentParser = entityParser(lines, possibleComponentProperties, componentDecorator);


const classOpeningParser = sequenceOf([
    possibly(str('export')),
    optionalWhiteSpace,
    str('class'),
    whitespace,
    stringParser,
    optionalWhiteSpace,
    char('{'),
    optionalWhiteSpace,
]);

const PUBLIC_ACCESS_KEYWORD = 'public';
const PRIVATE_ACCESS_KEYWORD = 'private';
const PROTECTED_ACCESS_KEYWORD = 'protected';

const optionalSemiColon = possible(char(';'));

const genericFieldParser = (type) => sequenceOf([
    str(type),
    optionalWhiteSpace,
    stringParser,
    possibleTypeParser,
    optionalWhiteSpace,
    char('='),
    optionalWhiteSpace,
    valueParser,
    optionalSemiColon
]);

const fieldParser = (line) => coroutine(function*(){
    let accessKeywords = [PUBLIC_ACCESS_KEYWORD, PRIVATE_ACCESS_KEYWORD, PROTECTED_ACCESS_KEYWORD];
    let i = 0;
    while(accessKeywords[i]){
        if(lookAhead(str(accessKeywords[i])).run(line)){
            if(lookAhead(genericFieldParser(accessKeywords[i])).run(line)){
                yield genericFieldParser(accessKeywords[i]);
                return;
            }
        }
        i++;
    }
    
});

const possibleFieldParser = possible(fieldParser);

const possibleConstructorParser = possible(constructorParser);

const methodCallParser = sequenceOf([
    char('('),
    possibleWhiteSpace,
    char(')')
]);

const openingBracketParser = sequenceOf([
    possibleWhiteSpace,
    char('{'),
    possibleWhiteSpace
])
 
const constructorParser = sequenceOf([
    str('constructor'),
    possibleWhiteSpace,
    methodCallParser,
    openingBracketParser
]);


const classParser = coroutine(function* () {
    let line = lines[0];

    if(lookAhead(classOpeningParser).run(line).map(lookAheadFinding)){
        yield classOpeningParser;
        lines.splice(0, 1);
        continue;
    } else return;

    let i = 0;
    while(lines[i]){
        line = lines[i];
        if(lookAhead(possibleFieldParser).run(line).map(lookAheadFinding)){
            yield possibleFieldParser;
            lines.splice(i, 1);
            i++;
            continue;
        }
        i++;
    }

    i = 0;
    while(lines[i]){
        line = lines[i];
        if(lookAhead(constructorParser).run(line).map(lookAheadFinding)){
            yield constructorParser;
            lines.splice(i, 1);
            break;
        }
    }


});

const interfaceParser = sequenceOf([
    possibly(str('export')),
    optionalWhiteSpace,
    str('interface'),
    whitespace,
    stringParser
])

const constVariableParser = sequenceOf([
    possibly(str('export')),
    optionalWhiteSpace,
    str('const'),
    whitespace,
    stringParser
])

componentParser.run();

module.exports = componentParser;