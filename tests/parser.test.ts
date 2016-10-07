import { test } from 'node:test';
import assert from 'node:assert/strict';
import Lexer from '../src/Lib/Lexer';
import Parser from '../src/Lib/Parser';
import NumberTokenFactory from '../src/Lib/TokenFactories/NumberTokenFactory';
import OperatorTokenFactory from '../src/Lib/TokenFactories/OperatorTokenFactory';
import FunctionTokenFactory from '../src/Lib/TokenFactories/FunctionTokenFactory';
import ConstantTokenFactory from '../src/Lib/TokenFactories/ConstantTokenFactory';
import VariableTokenFactory from '../src/Lib/TokenFactories/VariableTokenFactory';
import SineToken from '../src/Lib/Tokens/FunctionTokens/SineToken';
import CosineToken from '../src/Lib/Tokens/FunctionTokens/CosineToken';
import TangentToken from '../src/Lib/Tokens/FunctionTokens/TangentToken';
import PiToken from '../src/Lib/Tokens/ConstantTokens/PiToken';

function buildLexer() {
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
    return lexer;
}

test('RPN respects operator precedence (* before +)', () => {
    const lexer = buildLexer();
    const parser = new Parser();
    // 3 + 2 * 4  =>  RPN: 3 2 4 * +
    const rpn = parser.toReversePolishNotation(lexer.tokenize('3 + 2 * 4'));
    const vals = rpn.map(t => t.toString());
    assert.deepEqual(vals, ['3', '2', '4', '*', '+']);
});

test('RPN handles parentheses', () => {
    const lexer = buildLexer();
    const parser = new Parser();
    // (3 + 2) * 4  =>  RPN: 3 2 + 4 *
    const rpn = parser.toReversePolishNotation(lexer.tokenize('(3 + 2) * 4'));
    const vals = rpn.map(t => t.toString());
    assert.deepEqual(vals, ['3', '2', '+', '4', '*']);
});

test('RPN handles right-associative power', () => {
    const lexer = buildLexer();
    const parser = new Parser();
    // 2 ^ 3 ^ 2  =>  RPN: 2 3 2 ^ ^  (right-assoc)
    const rpn = parser.toReversePolishNotation(lexer.tokenize('2 ^ 3 ^ 2'));
    const vals = rpn.map(t => t.toString());
    assert.deepEqual(vals, ['2', '3', '2', '^', '^']);
});

test('buildParseTree produces correct root', () => {
    const lexer = buildLexer();
    const parser = new Parser();
    const tree = parser.buildParseTree(lexer.tokenize('3 + 2'));
    assert.equal(tree.value.toString(), '+');
    assert.equal(tree.left.value.toString(), '3');
    assert.equal(tree.right.value.toString(), '2');
});
