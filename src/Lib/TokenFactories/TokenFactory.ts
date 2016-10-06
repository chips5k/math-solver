import Token from '../Tokens/Token';

interface TokenFactory {
    create(...args: any[]): Token;
    compilePattern(): string;
}

export default TokenFactory;
