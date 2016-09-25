import Token from './Token';

abstract class FunctionToken extends Token {
    abstract evaluate(...args: number[]): number;
}

export default FunctionToken;
