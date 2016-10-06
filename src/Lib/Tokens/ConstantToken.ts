import Token from './Token';
abstract class OperatorToken extends Token {
    type: 'constant';
}
export default OperatorToken;
