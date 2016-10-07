import Token from './Tokens/Token';
import NumberToken from './Tokens/NumberToken';
import VariableToken from './Tokens/VariableToken';
import ConstantToken from './Tokens/ConstantToken';
import FunctionToken from './Tokens/FunctionToken';
import OperatorToken from './Tokens/OperatorToken';
import TreeNode from './TreeNode';

export type Variables = { [name: string]: number };

export default class Solver {

    solveRpn(rpn: Token[], variables: Variables = {}): Token[] {
        const stack: Token[] = [];

        for (const token of rpn) {
            if (token instanceof VariableToken) {
                const val = variables[token.value];
                if (val !== undefined) {
                    stack.push(new NumberToken(val));
                } else {
                    stack.push(token);
                }

            } else if (token instanceof ConstantToken) {
                stack.push(new NumberToken(token.value));

            } else if (token instanceof NumberToken) {
                stack.push(token);

            } else if (token instanceof FunctionToken) {
                if (stack.length < 1) throw new Error('Not enough arguments for function');
                const arg = stack.pop()!;
                if (arg instanceof NumberToken) {
                    stack.push(new NumberToken(token.evaluate(arg.value)));
                } else {
                    stack.push(arg, token);
                }

            } else if (token instanceof OperatorToken) {
                if (stack.length < 2) throw new Error('Not enough operands for operator');
                const b = stack.pop()!;
                const a = stack.pop()!;
                if (a instanceof NumberToken && b instanceof NumberToken) {
                    if (!token.evaluate) throw new Error(`Operator ${token.toString()} has no evaluator`);
                    stack.push(new NumberToken(token.evaluate(a.value, b.value)));
                } else {
                    stack.push(a, b, token);
                }
            }
        }

        return stack;
    }

    solveTree(node: TreeNode, variables: Variables = {}): number {
        const token = node.value;

        if (token instanceof NumberToken) return token.value;
        if (token instanceof ConstantToken) return token.value;

        if (token instanceof VariableToken) {
            const val = variables[token.value];
            if (val === undefined) throw new Error(`Unresolved variable: ${token.value}`);
            return val;
        }

        if (token instanceof FunctionToken) {
            return token.evaluate(this.solveTree(node.left, variables));
        }

        if (token instanceof OperatorToken) {
            if (!token.evaluate) throw new Error(`Operator ${token.toString()} has no evaluator`);
            return token.evaluate(
                this.solveTree(node.left, variables),
                this.solveTree(node.right, variables)
            );
        }

        throw new Error('Unknown token type in tree');
    }
}
