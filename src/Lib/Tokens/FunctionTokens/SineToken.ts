import FunctionToken from '../FunctionToken';

export default class SineToken extends FunctionToken {
    evaluate(n: number): number { return Math.sin(n); }
    toString(): string { return 'sin'; }
}
