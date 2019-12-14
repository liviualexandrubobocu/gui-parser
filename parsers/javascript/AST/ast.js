class Node {
    constructor(op, ...children){
        this.op = op;
        this.children = children;
    }
}

class Leaf {
    constructor(op, val){
        this.op = op;
        this.val = val;
    }
}

module.exports = { Leaf, Node };