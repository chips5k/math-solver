import Token from './Token';
abstract class FunctionToken extends Token { 
    type: 'function';
}
export default FunctionToken;