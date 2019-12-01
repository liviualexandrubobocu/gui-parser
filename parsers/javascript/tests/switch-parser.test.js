const switchParser = require('../switch-parser.js');

class SwitchStructure {
    constructor(cases, behaviors) {
        this.cases = cases;
        this.behaviors = behaviors;
    }
}

const tab = '    ';
const newLine = '\n';

console.log(switchParser);
test('should return parsed data based on imports', () => {
    expect(switchParser.run('switch(testVariable){}').result).toEqual(
        new SwitchStructure('', '')
    );
});