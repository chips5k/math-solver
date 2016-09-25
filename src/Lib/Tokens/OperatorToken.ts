import Token from './Token';

export type Associativity = 'left' | 'right';

abstract class OperatorToken extends Token {
    abstract get precedence(): number;
    get associativity(): Associativity {
        return 'left';
    }
    evaluate?(...operands: number[]): number;
}

export default OperatorToken;
