
// for ([initialization]; [condition]; [final-expression])
// statement

class ForLoopStructure {
    constructor(initialization, condition, finalExpression, statements) {
        this.initialization = initialization;
        this.condition = condition;
        this.finalExpression = finalExpression;
        this.statements = statements;
    }
}

module.exports.ForLoopStructure = ForLoopStructure;
