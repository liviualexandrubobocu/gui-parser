const ifBlockParser = require('../if-block-parser.js');

class IfBlockStructure {
    constructor(condition, behavior) {
        this.condition = condition;
        this.behavior = behavior;
    }
}

const tab = '    ';
const newLine = '\n';

test('should return parsed data based on imports', () => {
    expect(ifBlockParser.run('if(){}').result).toEqual(
        new IfBlockStructure('', '')
    );

    expect(ifBlockParser.run('if(){}').result).toEqual(
        new IfBlockStructure('', '')
    );

    expect(ifBlockParser.run('if(test){ runMethod(); }').result).toEqual(
        new IfBlockStructure('test', 'runMethod(); ')
    );

    expect(ifBlockParser.run(`if(test){ 
        runMethod(); 
    }`).result).toEqual(
        new IfBlockStructure('test', `runMethod(); ${newLine}${tab}`)
    );

    expect(ifBlockParser.run(`if(test){ 
        runMethod();
        runSecondMethod(); 
    }`).result).toEqual(
        new IfBlockStructure('test', `runMethod();${newLine}${tab}${tab}runSecondMethod(); ${newLine}${tab}`)
    );
});