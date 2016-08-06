# Math Solver Prototype (Legacy 2016 ES6/JSPM)

This directory preserves the original August 2016 JavaScript prototype for the expression lexer, Dijkstra Shunting-Yard RPN parser, and AST tree solver.

## Overview

The prototype was developed using Babel 6 and SystemJS/JSPM to experiment with:
- Regular expression-based stream tokenization (`src/lexer.js`)
- Shunting-Yard operator precedence parsing into Reverse Polish Notation (RPN) (`src/parser.js`)
- AST construction from RPN output (`src/parser.js`)
- In-memory node and stack evaluation (`src/solver.js`)
- HTML5 Canvas tree visualization (`index.html`)

This prototype served as the baseline reference for the typed TypeScript implementation now maintained in `src/`.
