"use strict";
class Lexer {
    constructor() {
        this.tokenFactories = [];
    }
    registerFactory(tokenFactory) {
        this.tokenFactories.push(tokenFactory);
    }
    createToken(index, value) {
        var tf = this.tokenFactories[index];
        if (tf) {
            return tf.create(value);
        }
        throw "Token factory not found";
    }
    getPatterns() {
        return this.tokenFactories.map(function (n) {
            return n.compilePattern();
        });
    }
    tokenize(expression) {
        let tokens = [];
        let pattern = new RegExp('(' + this.getPatterns().join(')|(') + ')', 'g');
        let matches;
        while (matches = pattern.exec(expression)) {
            for (var i = 0; i < this.tokenFactories.length; i++) {
                if (matches[i + 1]) {
                    tokens.push(this.createToken(i, matches[i + 1]));
                    break;
                }
            }
        }
        return tokens;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Lexer;
//# sourceMappingURL=Lexer.js.map