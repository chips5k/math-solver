import TokenFactory from './TokenFactory';
import NumberToken from '../Tokens/CommonTokens/NumberToken';

export default class NumberTokenFactory implements TokenFactory {
    
    create(value: number): NumberToken {
        return new NumberToken(value);
    }
    compilePattern(): string {
        return '(?:[^0-9+\\-]?\\-)?[0-9]+(?:\\.[0-9]+)?';
    }
}