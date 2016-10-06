import Token from './Token';
abstract class OperatorToken extends Token { 
    type: 'Operator';
}
export default OperatorToken;
