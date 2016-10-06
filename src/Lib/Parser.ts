import Token from './Tokens/Token';
import NumberToken from './Tokens/NumberToken';
import VariableToken from './Tokens/VariableToken';
import ConstantToken from './Tokens/ConstantToken';
import FunctionToken from './Tokens/FunctionToken';
import OperatorToken from './Tokens/OperatorToken';
import LeftParenToken from './Tokens/OperatorTokens/LeftParenToken';
import RightParenToken from './Tokens/OperatorTokens/RightParenToken';
import TreeNode from './TreeNode';

export default class Parser {

    toReversePolishNotation(tokens: Token[]): Token[] {
        const output: Token[] = [];
        const stack: Token[] = [];

        for (const token of tokens) {
            if (token instanceof NumberToken || token instanceof VariableToken || token instanceof ConstantToken) {
                output.push(token);

            } else if (token instanceof FunctionToken) {
                stack.push(token);

            } else if (token instanceof LeftParenToken) {
                stack.push(token);

            } else if (token instanceof RightParenToken) {
                while (stack.length > 0 && !(stack[stack.length - 1] instanceof LeftParenToken)) {
                    output.push(stack.pop()!);
                }
                if (stack.length === 0) throw new Error('Mismatched parentheses');
                stack.pop(); // discard left paren

                if (stack.length > 0 && stack[stack.length - 1] instanceof FunctionToken) {
                    output.push(stack.pop()!);
                }

            } else if (token instanceof OperatorToken) {
                const op = token;
                while (stack.length > 0) {
                    const top = stack[stack.length - 1];
                    if (top instanceof FunctionToken) {
                        output.push(stack.pop()!);
                        continue;
                    }
                    if (top instanceof OperatorToken && !(top instanceof LeftParenToken)) {
                        const shouldPop =
                            top.precedence > op.precedence ||
                            (top.precedence === op.precedence && op.associativity === 'left');
                        if (shouldPop) {
                            output.push(stack.pop()!);
                            continue;
                        }
                    }
                    break;
                }
                stack.push(op);
            }
        }

        while (stack.length > 0) {
            const top = stack.pop()!;
            if (top instanceof LeftParenToken || top instanceof RightParenToken) {
                throw new Error('Mismatched parentheses');
            }
            output.push(top);
        }

        return output;
    }

    buildParseTree(tokens: Token[]): TreeNode {
        const rpn = this.toReversePolishNotation(tokens);
        return this._buildTree(rpn);
    }

    private _buildTree(rpn: Token[]): TreeNode {
        const stack: TreeNode[] = [];

        for (const token of rpn) {
            if (token instanceof OperatorToken) {
                if (stack.length < 2) throw new Error(`Not enough operands for operator ${token.toString()}`);
                const right = stack.pop()!;
                const left = stack.pop()!;
                stack.push(new TreeNode(token, left, right));

            } else if (token instanceof FunctionToken) {
                if (stack.length < 1) throw new Error(`Not enough operands for function ${token.toString()}`);
                const arg = stack.pop()!;
                stack.push(new TreeNode(token, arg));

            } else {
                stack.push(new TreeNode(token));
            }
        }

        if (stack.length !== 1) throw new Error('Invalid expression: too many operands');
        return stack[0]!;
    }
}
