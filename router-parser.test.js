const importsParser = require('./parsers/router-parser.js/index.js');

class ImportType {
    constructor(type, names, location) {
        this.type = type;
        this.names = names;
        this.location = location;
    }
}

test('should return parsed data based on imports', () => {
    expect(importsParser.run('import { ProductComponent } from "./product.component"').result).toEqual(
        new ImportType('es6', 'ProductComponent', './product.component')
    );

    expect(importsParser.run('import{ProductComponent}from"./product.component"').result).toEqual(
        new ImportType('es6', 'ProductComponent', './product.component')
    );

    expect(importsParser.run('import{ ProductComponent } from "./product.component"').result).toEqual(
        new ImportType('es6', 'ProductComponent', './product.component')
    );

    expect(importsParser.run('import{ProductComponent } from "./product.component"').result).toEqual(
        new ImportType('es6', 'ProductComponent', './product.component')
    );

    expect(importsParser.run('import{ProductComponent} from "./product.component"').result).toEqual(
        new ImportType('es6', 'ProductComponent', './product.component')
    );

    expect(importsParser.run('import{ProductComponent}from "./product.component"').result).toEqual(
        new ImportType('es6', 'ProductComponent', './product.component')
    );

    expect(importsParser.run('import{ ProductComponent}from"./product.component"').result).toEqual(
        new ImportType('es6', 'ProductComponent', './product.component')
    );

    expect(importsParser.run('import{ ProductComponent }from"./product.component"').result).toEqual(
        new ImportType('es6', 'ProductComponent', './product.component')
    );

    expect(importsParser.run('import{ ProductComponent } from"./product.component"').result).toEqual(
        new ImportType('es6', 'ProductComponent', './product.component')
    );

    expect(importsParser.run('import{ ProductComponent} from"./product.component"').result).toEqual(
        new ImportType('es6', 'ProductComponent', './product.component')
    );

    expect(importsParser.run('import{ ProductComponent} from "./product.component"').result).toEqual(
        new ImportType('es6', 'ProductComponent', './product.component')
    );
    
});