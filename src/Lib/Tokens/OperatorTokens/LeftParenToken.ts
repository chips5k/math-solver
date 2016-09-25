import OperatorToken from '../OperatorToken';

export default class LeftParenToken extends OperatorToken {
    get precedence(): number { return -1; }
    toString(): string { return '('; }
}
