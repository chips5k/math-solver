import { test } from 'node:test';
import assert from 'node:assert/strict';
import Lexer from '../src/Lib/Lexer';
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
import VariableToken from '../src/Lib/Tokens/VariableToken';
import OperatorToken from '../src/Lib/Tokens/OperatorToken';

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

test('tokenizes simple expression', () => {
    const lexer = buildLexer();
    const tokens = lexer.tokenize('1 + 2');
    assert.equal(tokens.length, 3);
    assert.ok(tokens[0] instanceof NumberToken);
    assert.ok(tokens[1] instanceof OperatorToken);
    assert.ok(tokens[2] instanceof NumberToken);
});

test('tokenizes expression with variable', () => {
    const lexer = buildLexer();
    const tokens = lexer.tokenize('3 + 2 * x');
    assert.equal(tokens.length, 5);
    assert.ok(tokens[4] instanceof VariableToken);
});

test('tokenizes function call', () => {
    const lexer = buildLexer();
    const tokens = lexer.tokenize('sin(x)');
    assert.equal(tokens.length, 4); // sin, (, x, )
    assert.ok(tokens[0] instanceof SineToken);
});

test('tokenizes PI constant', () => {
    const lexer = buildLexer();
    const tokens = lexer.tokenize('PI');
    assert.equal(tokens.length, 1);
    assert.ok(tokens[0] instanceof PiToken);
});
