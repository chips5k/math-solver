# Math Solver

A strongly-typed TypeScript mathematical expression parser, Abstract Syntax Tree (AST) generator, and Reverse Polish Notation (RPN) evaluator.

This repository implements a clean mathematical evaluation pipeline based on Dijkstra's Shunting-Yard algorithm, supporting custom token factories, operator precedence, associativity, function evaluation, constants, and variable substitution.

## Features

- **Modular Lexer**: Regular expression stream tokenizer using extensible token factories.
- **Strongly Typed Tokens**: Class-based token hierarchy (`NumberToken`, `VariableToken`, `ConstantToken`, `FunctionToken`, `OperatorToken`).
- **Shunting-Yard Parser**: Converts standard infix mathematical expressions into Reverse Polish Notation (RPN).
- **AST Generation**: Constructs an evaluatable binary tree from parsed tokens.
- **Dual Evaluation Engine**:
  - **RPN Stack Evaluation**: Direct postfix evaluation with partial symbolic resolution.
  - **AST Tree Evaluation**: Recursive tree traversal with variable bindings.
- **Trigonometric Functions & Constants**: Built-in support for `sin`, `cos`, `tan`, and `PI`.
- **Legacy Prototype**: Preserves the original 2016 ES6/JSPM implementation in `legacy-prototype/`.

## Project Structure

```
math-solver/
├── src/
│   ├── Lib/
│   │   ├── Tokens/                # Token class hierarchy
│   │   │   ├── FunctionTokens/    # Sine, Cosine, Tangent
│   │   │   ├── ConstantTokens/    # Pi
│   │   │   └── OperatorTokens/    # +, -, *, /, ^, =, (, ), separator
│   │   ├── TokenFactories/        # Pattern-matching token factories
│   │   ├── Lexer.ts               # Regex stream tokenizer
│   │   ├── Parser.ts              # Shunting-yard RPN & AST parser
│   │   ├── Solver.ts              # RPN & AST expression evaluator
│   │   └── TreeNode.ts            # Binary AST node structure
│   └── index.ts                   # Library entry & demo execution
├── tests/                         # Unit tests (Lexer, Parser, Solver)
├── legacy-prototype/              # Original August 2016 JS prototype
└── tsconfig.json
```

## Quick Start

### Installation & Build

```bash
npm install
npm run build
```

### Running Tests

```bash
npm test
```

### Usage Example

```typescript
import Lexer from './Lib/Lexer';
import Parser from './Lib/Parser';
import Solver from './Lib/Solver';

import NumberTokenFactory from './Lib/TokenFactories/NumberTokenFactory';
import OperatorTokenFactory from './Lib/TokenFactories/OperatorTokenFactory';
import FunctionTokenFactory from './Lib/TokenFactories/FunctionTokenFactory';
import ConstantTokenFactory from './Lib/TokenFactories/ConstantTokenFactory';
import VariableTokenFactory from './Lib/TokenFactories/VariableTokenFactory';

import SineToken from './Lib/Tokens/FunctionTokens/SineToken';
import CosineToken from './Lib/Tokens/FunctionTokens/CosineToken';
import TangentToken from './Lib/Tokens/FunctionTokens/TangentToken';
import PiToken from './Lib/Tokens/ConstantTokens/PiToken';

// 1. Initialize Lexer and register factories
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

// 2. Tokenize expression
const expression = '3 + 2 * x - 53 * 5';
const tokens = lexer.tokenize(expression);

// 3. Parse into RPN and AST
const parser = new Parser();
const rpn = parser.toReversePolishNotation(tokens);
const tree = parser.buildParseTree(tokens);

// 4. Solve with variable binding
const solver = new Solver();
const result = solver.solveTree(tree, { x: 10 });
console.log(`Result: ${result}`); // Output: -242
```
