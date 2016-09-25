import FunctionToken from '../FunctionToken';

export default class TangentToken extends FunctionToken {
    evaluate(n: number): number { return Math.tan(n); }
    toString(): string { return 'tan'; }
}
