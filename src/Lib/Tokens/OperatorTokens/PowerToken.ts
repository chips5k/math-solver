import OperatorToken, { Associativity } from '../OperatorToken';

export default class PowerToken extends OperatorToken {
    get precedence(): number { return 2; }
    get associativity(): Associativity { return 'right'; }
    evaluate(a: number, b: number): number { return Math.pow(a, b); }
    toString(): string { return '^'; }
}
