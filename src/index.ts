import Lexer from './Lib/Lexer';
import Parser from './Lib/Parser';
import Solver from './Lib/Solver';

import OperatorTokenFactory from './Lib/TokenFactories/OperatorTokenFactory';
import FunctionTokenFactory from './Lib/TokenFactories/FunctionTokenFactory';
import ConstantTokenFactory from './Lib/TokenFactories/ConstantTokenFactory';
import VariableTokenFactory from './Lib/TokenFactories/VariableTokenFactory';
import NumberTokenFactory from './Lib/TokenFactories/NumberTokenFactory';

import SineToken from './Lib/Tokens/FunctionTokens/SineToken';
import CosineToken from './Lib/Tokens/FunctionTokens/CosineToken';
import TangentToken from './Lib/Tokens/FunctionTokens/TangentToken';
import PiToken from './Lib/Tokens/ConstantTokens/PiToken';

const factories = [
    new NumberTokenFactory(),
    new FunctionTokenFactory({
        sin: () => new SineToken(),
        cos: () => new CosineToken(),
        tan: () => new TangentToken(),
    }),
    new ConstantTokenFactory({
        PI: () => new PiToken(),
    }),
    new OperatorTokenFactory(),
    new VariableTokenFactory(),
];

const lexer = new Lexer();
for (const f of factories) {
    lexer.registerFactory(f);
}

const parser = new Parser();
const solver = new Solver();

// Demo: 3 + 2 * x - 53 * 5 (with x = 10)
const expr = '3 + 2 * x - 53 * 5';
const tokens = lexer.tokenize(expr);
const rpn = parser.toReversePolishNotation(tokens);
const tree = parser.buildParseTree(lexer.tokenize(expr));

console.log(`Expression: ${expr}`);
console.log('RPN:', rpn.map(t => t.toString()).join(' '));
console.log('Solved (x=10):', solver.solveTree(tree, { x: 10 }));
console.log('RPN solved (x=10):', solver.solveRpn(rpn, { x: 10 }).map(t => t.toString()));
