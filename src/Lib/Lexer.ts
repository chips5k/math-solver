import TokenFactory from './TokenFactories/TokenFactory';
import Token from './Tokens/Token';

export default class Lexer {
    private tokenFactories: TokenFactory[];

    constructor() {
        this.tokenFactories = [];
    }

    registerFactory(tokenFactory: TokenFactory ) {
        this.tokenFactories.push(tokenFactory);
    }

    createToken(index, value) {
        var tf = this.tokenFactories[index];
        if(tf) {
            return tf.create(value);
        }

        throw "Token factory not found";
    }
    getPatterns(): string[] {
        
        return this.tokenFactories.map(function(n) {
            return n.compilePattern();
        }); 
        
    }

    tokenize(expression: string): Token[] {
        let tokens: Token[] = [];
        let pattern: RegExp = new RegExp('(' + this.getPatterns().join(')|(') + ')', 'g');
        
        let matches: any[];

        while(matches = pattern.exec(expression)) {
            for(var i = 0; i < this.tokenFactories.length; i++) {
                if(matches[i + 1]) {
                    tokens.push(this.createToken(i, matches[i + 1]));
                    break;
                }
            }
        }

        return tokens;
    }
}

