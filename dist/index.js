"use strict";
const Lexer_1 = require('./Lib/Lexer');
//Token factories
const OperatorTokenFactory_1 = require('./Lib/TokenFactories/OperatorTokenFactory');
const FunctionTokenFactory_1 = require('./Lib/TokenFactories/FunctionTokenFactory');
const ConstantTokenFactory_1 = require('./Lib/TokenFactories/ConstantTokenFactory');
const VariableTokenFactory_1 = require('./Lib/TokenFactories/VariableTokenFactory');
const NumberTokenFactory_1 = require('./Lib/TokenFactories/NumberTokenFactory');
//Custom Function Token Definitions
const SineToken_1 = require('./Lib/Tokens/FunctionTokens/SineToken');
const CosineToken_1 = require('./Lib/Tokens/FunctionTokens/CosineToken');
const TangentToken_1 = require('./Lib/Tokens/FunctionTokens/TangentToken');
//Custom Constant Token Definitions
const PiToken_1 = require('./Lib/Tokens/ConstantTokens/PiToken');
var factories = [
    new NumberTokenFactory_1.default(),
    new FunctionTokenFactory_1.default({
        sin: () => { return new SineToken_1.default(); },
        cos: () => { return new CosineToken_1.default(); },
        tan: () => { return new TangentToken_1.default(); }
    }),
    new ConstantTokenFactory_1.default({
        PI: () => { return new PiToken_1.default(); }
    }),
    new OperatorTokenFactory_1.default(),
    new VariableTokenFactory_1.default()
];
var lexer = new Lexer_1.default();
for (let i in factories) {
    lexer.registerFactory(factories[i]);
}
var tokens = lexer.tokenize('1 + 2 / x');
console.log(tokens);
// console.log(tokens);
// var re = new RegExp('((?:[^0-9+\-]?\-)?[0-9]+(?:\.[0-9]+)?)|(sin|cos|tan)|(PI)|([+-\/*^=,()])|([a-zA-Z])', 'g');
// var matches = [];
// while(matches = re.exec('1 + 2 / x')) {
//     console.log(matches);
// }
//# sourceMappingURL=index.js.map