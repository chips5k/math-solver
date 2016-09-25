import OperatorToken from '../OperatorToken';

export default class SeparatorToken extends OperatorToken {
    get precedence(): number { return -1; }
    toString(): string { return ','; }
}
