const { Node, Leaf } = require('../AST/ast');

test('should get an AST for a - 4 + c', () => {

    // Bottom Up Construction
    // Add first Leaf
    // Add second Leaf
    // Add deducted operation from parsing as parent Node
    // Add thirs Leaf
    // Add deducted operation from parsing as parent Node
    const p1 = new Leaf('id', 'a');
    const p2 = new Leaf('num', 4);
    const p3 = new Node('-', p1, p2);
    const p4 = new Leaf('id', 'c');
    const p5 = new Node('+', p3, p4);

    expect(p5).toEqual(
        {
            op: "+",
            children: [
                {
                    op: "-",
                    children: [
                        {
                            op: "id",
                            val: "a"
                        },
                        {
                            op: "num",
                            "val": 4
                        }
                    ]
                },
                {
                    op: "id",
                    val: "c"
                }
            ]
        }
    );
});