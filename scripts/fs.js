const path = require('path');
const fs = require('fs');
const finalPath = path.resolve('..\\inner\\someText.txt');
console.log(finalPath);
console.log(finalPath.replace(/\\/g, '/'));
fs.appendFile(finalPath.replace(/\\/g, '/'), 'asd', ()=> console.log('asd was put here'));
