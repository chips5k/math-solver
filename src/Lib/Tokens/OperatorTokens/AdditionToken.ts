import OperatorToken from '../OperatorToken';

export default class AdditionToken extends OperatorToken {
    get precedence(): number { return 0; }
    evaluate(a: number, b: number): number { return a + b; }
    toString(): string { return '+'; }
}
