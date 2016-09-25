import OperatorToken from '../OperatorToken';

export default class DivisionToken extends OperatorToken {
    get precedence(): number { return 1; }
    evaluate(a: number, b: number): number { return a / b; }
    toString(): string { return '/'; }
}
