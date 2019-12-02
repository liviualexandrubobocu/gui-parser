const switchParser = require('../switch-parser.js');
const { SwitchStructure } = require('../models/switch');

const tab = '    ';
const newLine = '\n';

test('should return parsed data based on imports', () => {
    // expect(switchParser.run('switch(testVariable){}').result).toEqual(
    //     new SwitchStructure('testVariable', [], [])
    // );

    expect(switchParser.run(`switch(testVariable){
        case 0:
            console.log(testVariable);
            break;
        default:
            break;
    }`).result).toEqual(
        new SwitchStructure('testVariable', [
            {
                case: "0",
                behavior: `console.log(testVariable);break;`
            }
        ], [])
    );

});