import TokenFactory from './TokenFactory';
import VariableToken from '../Tokens/CommonTokens/VariableToken';

export default class VariableTokenFactory implements TokenFactory  {

    create(value: string): VariableToken {
        return new VariableToken(value);
    }
    compilePattern(): string {
        return '[a-zA-Z]';
    }
}