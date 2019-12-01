const { lookAhead, coroutine, possibly } = require('arcsecond');

const possiblyProperty = (keyName) => possibly(keyValuePair(keyName)).map(keyValuePairType);

const entityParser = (lines, propertyList, decorator) => coroutine( function* () {

    while(lines){
        const line = lines[0];
        if(lookAhead(moduleDecorator).run(line).map(lookAheadFinding)){
            yield decorator;
            lines.pop();
            continue;
        }

        propertyList.forEach((property, index) => {
            if(lookAhead(possiblyProperty(property)).map(lookAheadFinding)){
                yield possiblyProperty(property);
                lines.pop();
                propertyList.splice(index, 1);
                continue;
            }
        });

        if(lookAhead(closingPassingObject).run(line).map(lookAheadFinding)){
            yield closingPassingObject;
            lines.pop();
            continue;
        }
    }
});

module.exports = entityParser;