"use strict";
const NumberToken_1 = require('../Tokens/NumberToken');
class NumberTokenFactory {
    create(value) {
        return new NumberToken_1.default(value);
    }
    compilePattern() {
        return '(?:[^0-9+\\-]?\\-)?[0-9]+(?:\\.[0-9]+)?';
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NumberTokenFactory;
//# sourceMappingURL=NumberTokenFactory.js.map