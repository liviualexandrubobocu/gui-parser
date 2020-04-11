const expr = [];

let state = states.EXPECT_ELEMENT;

while(true) {
    if (state === state.EXPECT_ELEMENT) {
        const result = A.choice([
            bracketedExpr,
            variable
        ]);
        expr.push(result);
        state = states.EXPECT_OPERATOR;
        yield A.optionalWhiteSpace;
    } else if (state = state.EXPECT_OPERATOR) {
        const nextChar = yield peek;
        if(nextChar === ']') {
            yield A.char(']');
            yield A.optionalWhiteSpace;
            break;
        }

        const result = yield operator;
        expr.push(result);
        state = states.EXPECT_ELEMENT;
        yield A.optionalWhiteSpace;
    }
}
