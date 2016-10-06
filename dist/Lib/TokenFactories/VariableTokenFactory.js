"use strict";
const VariableToken_1 = require('../Tokens/VariableToken');
class VariableTokenFactory {
    create(value) {
        return new VariableToken_1.default(value);
    }
    compilePattern() {
        return '[a-zA-Z]';
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VariableTokenFactory;
//# sourceMappingURL=VariableTokenFactory.js.map