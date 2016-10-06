import Token from './Tokens/Token';

export default class TreeNode {
    constructor(private _value?: Token, private _left?: TreeNode, private _right?: TreeNode) {}
    
    get value() : Token {
        return this._value;
    }

    get left() : TreeNode {
        return this._left;
    }

    get right() : TreeNode {
        return this._right;
    }
}