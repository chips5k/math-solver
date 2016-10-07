import { test } from 'node:test';
import assert from 'node:assert/strict';
import Lexer from '../src/Lib/Lexer';
import Parser from '../src/Lib/Parser';
import Solver from '../src/Lib/Solver';
import NumberTokenFactory from '../src/Lib/TokenFactories/NumberTokenFactory';
import OperatorTokenFactory from '../src/Lib/TokenFactories/OperatorTokenFactory';
import FunctionTokenFactory from '../src/Lib/TokenFactories/FunctionTokenFactory';
import ConstantTokenFactory from '../src/Lib/TokenFactories/ConstantTokenFactory';
import VariableTokenFactory from '../src/Lib/TokenFactories/VariableTokenFactory';
import SineToken from '../src/Lib/Tokens/FunctionTokens/SineToken';
import CosineToken from '../src/Lib/Tokens/FunctionTokens/CosineToken';
import TangentToken from '../src/Lib/Tokens/FunctionTokens/TangentToken';
import PiToken from '../src/Lib/Tokens/ConstantTokens/PiToken';
import NumberToken from '../src/Lib/Tokens/NumberToken';

function setup(expr: string) {
    const lexer = new Lexer();
    lexer.registerFactory(new NumberTokenFactory());
    lexer.registerFactory(new FunctionTokenFactory({
        sin: () => new SineToken(),
        cos: () => new CosineToken(),
        tan: () => new TangentToken(),
    }));
    lexer.registerFactory(new ConstantTokenFactory({ PI: () => new PiToken() }));
    lexer.registerFactory(new OperatorTokenFactory());
    lexer.registerFactory(new VariableTokenFactory());
    const parser = new Parser();
    const solver = new Solver();
    const tokens = lexer.tokenize(expr);
    return { parser, solver, tokens };
}

test('solves simple addition', () => {
    const { parser, solver, tokens } = setup('3 + 2');
    assert.equal(solver.solveTree(parser.buildParseTree(tokens)), 5);
});

test('solves operator precedence: 3 + 2 * 4 = 11', () => {
    const { parser, solver, tokens } = setup('3 + 2 * 4');
    assert.equal(solver.solveTree(parser.buildParseTree(tokens)), 11);
});

test('solves parentheses: (3 + 2) * 4 = 20', () => {
    const { parser, solver, tokens } = setup('(3 + 2) * 4');
    assert.equal(solver.solveTree(parser.buildParseTree(tokens)), 20);
});

test('solves power: 2 ^ 3 = 8', () => {
    const { parser, solver, tokens } = setup('2 ^ 3');
    assert.equal(solver.solveTree(parser.buildParseTree(tokens)), 8);
});

test('solves with variable substitution: 3 + 2 * x - 53 * 5, x=10', () => {
    const { parser, solver, tokens } = setup('3 + 2 * x - 53 * 5');
    // 3 + 20 - 265 = -242
    assert.equal(solver.solveTree(parser.buildParseTree(tokens), { x: 10 }), -242);
});

test('solves PI constant', () => {
    const { parser, solver, tokens } = setup('PI');
    assert.ok(Math.abs(solver.solveTree(parser.buildParseTree(tokens)) - Math.PI) < 1e-10);
});

test('solves sin(PI) ≈ 0', () => {
    const { parser, solver, tokens } = setup('sin(PI)');
    assert.ok(Math.abs(solver.solveTree(parser.buildParseTree(tokens))) < 1e-10);
});

test('solves cos(0) = 1', () => {
    const { parser, solver, tokens } = setup('cos(0)');
    assert.equal(solver.solveTree(parser.buildParseTree(tokens)), 1);
});

test('RPN solver: 3 + 2 * 4 = 11', () => {
    const { parser, solver, tokens } = setup('3 + 2 * 4');
    const rpn = parser.toReversePolishNotation(tokens);
    const result = solver.solveRpn(rpn);
    assert.equal(result.length, 1);
    assert.ok(result[0] instanceof NumberToken);
    assert.equal((result[0] as NumberToken).value, 11);
});

test('RPN solver leaves variables if no binding', () => {
    const { parser, solver, tokens } = setup('x + 1');
    const rpn = parser.toReversePolishNotation(tokens);
    // Without variables, should not fully reduce
    const result = solver.solveRpn(rpn);
    assert.ok(result.length > 1);
});
