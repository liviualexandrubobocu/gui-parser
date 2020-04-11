// A grammar naturally describes the hierarchical structure of most programming languages constructs;
// if else statement can have the form if (expression) statement else statement
// A rule can be expressed as stmt -> if(expr) stmt else stmt

// in which the arrow may be read as "can have the form"
// This rule is called production;

// In a production, lexical elements like the keyword if and parentheses are called terminals

// Variables like expr and stmt represent sequences of terminals and are called nonterminals

// Context Free Grammars

// A CFG has 4 components:

// A set of terminal symbols (tokens). The terminals are elementary symbols of the language defined by the grammar.
// A set of nonterminals, sometimes called "syntactic variables".
// Each non terminal represents a set of strings of terminals.
// A set of productions where each production consists of a terminal, called the head or left side of the production, an arrow
// and a sequence of terminals and/or nonterminals called the body or right side of the production;

const CFG = {
    terminals: [],
    nonterminals: [],
    productions: [],
    startSymbol
}

// We specify grammars by listing their productions, with the productions for the start symbol listed first.

// Digits, <, <=, while are terminals
// An italicized name (variable) is a non terminal
// A nonitalicized name or symbol may be considered a terminal;

// Productions with the same nonterminal as their head can have their bodies grouped with the alternative bodies separated
// by the symbol | read as "or"

const cfg = {
    terminals: ["+", "-", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    nonTerminals: ["list", "digit"],
    productions: [
        "list -> list + digit",
        "list -> list - digit",
        "list -> digit",
        "digit -> 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0"
    ],
    startSymbol: "list"
}
class CFG1 {
    __productionIndexMap = {}
    __state;

    constructor(cfg){
        this.initializeCFG(cfg);
        this.simplifyCFGProductionsMap();
        this.initializeStateMachine();
        this.provideNonTerminalIndexMap();
    }

    initializeCFG(cfg){
        this.cfg = cfg;
    }

    simplifyCFGProductionsMap(){
        this.productions = this.productions.map(production => {
            return {
                head: production.splice('->')[0].trim(),
                body: production.splice('->')[1].trim()
            }
        });
    }

    initializeStateMachine(){

    }

    provideNonTerminalIndexMap() {

    }

    derivation () {
        let generatedString;
        state = states.STARTED_DERIVATION;
        // for any number of productions starting from the start symbol
        // replace a nonterminal with the body of any of its productions until all nonterminal symbols are replaced with terminal symbols;
        while(state !== states.SYMBOLS_REPLACED) {

            let productionHeadLength = productions.filter(production => production.head === this.startSymbol).length;
            // select a production to use
            const randomProductionUse = Math.floor(Math.random());
            generatedString = this.productions[randomProductionUse].body;
            if(this.hasNonTerminalsAvailable(generatedString)){

            }
        }
    }

    hasNonTerminalsAvailable(generatedString) {
        for(let nonTerminal of this.nonTerminals) {
            if(generatedString.indexOf(nonTerminal))
                return true;
        }
        return false;
    }
}



// "list" is the start symbol because its productions are given first;
// We say a pproduction is for a nonterminal if the nonterminal is the head of the production;
// A string of terminals is a sequence of zero or more terminals.
// The string of zero terminals written as e is called the empty string;


// The bodies of three productions with nonterminal list as head equivalently can be grouped
const production = "list -> list + digit | list - digit | digit";

// Derivation

// A grammar derives strings by beginning with the start symbol and repeatedly replacing a nonterminal by the body of a production for that nonterminal.
// The terminal strings that can be derived from he start symbol form the language defined by the grammar;


