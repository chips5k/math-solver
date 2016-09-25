import FunctionToken from '../FunctionToken';

export default class CosineToken extends FunctionToken {
    evaluate(n: number): number { return Math.cos(n); }
    toString(): string { return 'cos'; }
}
