const { char, str, coroutine, optionalWhitespace, everythingUntil } = require('arcsecond');

const { SwitchStructure } = require('./models/switch.js');
const fs = require('fs');

const switchStructure = (values) => new SwitchStructure(values.condition, values.cases, values.behaviors);

const minify = (str) => str.replace(/\s/g,'');

const switchParser = coroutine(function* () {
    try {
        yield str('switch');
        yield optionalWhitespace;
        yield char('(');
        const testedVariable = yield everythingUntil(char(')'));
        yield optionalWhitespace;
        yield char(')');
        yield optionalWhitespace;
        yield char('{');
        yield everythingUntil(str('case'));
        yield str('case');
        yield optionalWhitespace;
        const testedCase = yield everythingUntil(char(':'));
        yield char(':');
        const testedBehavior = yield everythingUntil(str('default'));

        return {
            condition: testedVariable,
            cases: [
                {
                    case: testedCase,
                    behavior: minify(testedBehavior)
                }
            ],
            behaviors: []
        };
    } catch(error){
        fs.writeFileSync('../../errors.txt', JSON.stringify(error));
        throw new Error(error);
    }
    
}).map(switchStructure);


module.exports = switchParser;