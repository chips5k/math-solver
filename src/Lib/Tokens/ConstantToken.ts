import Token from './Token';

abstract class ConstantToken extends Token {
    abstract get value(): number;
}

export default ConstantToken;
