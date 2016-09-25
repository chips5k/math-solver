"use strict";
//Operator Token Definitions
const AdditionToken_1 = require('../Tokens/OperatorTokens/AdditionToken');
const SubtractionToken_1 = require('../Tokens/OperatorTokens/SubtractionToken');
const DivisionToken_1 = require('../Tokens/OperatorTokens/DivisionToken');
const MultiplicationToken_1 = require('../Tokens/OperatorTokens/MultiplicationToken');
const PowerToken_1 = require('../Tokens/OperatorTokens/PowerToken');
const EqualityToken_1 = require('../Tokens/OperatorTokens/EqualityToken');
const LeftParenToken_1 = require('../Tokens/OperatorTokens/LeftParenToken');
const RightParenToken_1 = require('../Tokens/OperatorTokens/RightParenToken');
const SeparatorToken_1 = require('../Tokens/OperatorTokens/SeparatorToken');
class OperatorTokenFactory {
    constructor(classMap) {
        this.classMap = {
            '+': () => { return new AdditionToken_1.default(); },
            '-': () => { return new SubtractionToken_1.default(); },
            '/': () => { return new DivisionToken_1.default(); },
            '*': () => { return new MultiplicationToken_1.default(); },
            '^': () => { return new PowerToken_1.default(); },
            '=': () => { return new EqualityToken_1.default(); },
            ',': () => { return new SeparatorToken_1.default(); },
            '(': () => { return new LeftParenToken_1.default(); },
            ')': () => { return new RightParenToken_1.default(); }
        };
        if (classMap) {
            Object.assign(this.classMap, classMap);
        }
    }
    ;
    create(value) {
        if (this.classMap.hasOwnProperty(value)) {
            return this.classMap[value]();
        }
        throw 'Type not supported';
    }
    compilePattern() {
        return '[' + Object.keys(this.classMap).join('') + ']';
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OperatorTokenFactory;
//# sourceMappingURL=OperatorTokenFactory.js.map