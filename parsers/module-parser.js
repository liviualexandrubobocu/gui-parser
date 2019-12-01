import { decoratorParser } from './decorator-parser';

const moduleDecorator = decoratorParser('NgModule');

const moduleText = `@NgModule({
    declarations: [
    AppComponent
    ],
    imports: [
    BrowserModule,
    AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }`;

const possibleModuleProperties = ['declarations', 'imports', 'providers', 'bootstrap'];
const lines = moduleText.split('\n');


const moduleParser = entityParser(lines, possibleModuleProperties);

moduleParser.run();
