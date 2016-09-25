import OperatorToken from '../OperatorToken';

export default class SubtractionToken extends OperatorToken {
    get precedence(): number { return 0; }
    evaluate(a: number, b: number): number { return a - b; }
    toString(): string { return '-'; }
}
