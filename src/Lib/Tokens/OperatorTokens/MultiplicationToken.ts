import OperatorToken from '../OperatorToken';

export default class MultiplicationToken extends OperatorToken {
    get precedence(): number { return 1; }
    evaluate(a: number, b: number): number { return a * b; }
    toString(): string { return '*'; }
}
