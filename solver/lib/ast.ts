import type { ASTNode } from './types';
import { isToken } from './util';

const nargs = {
    frac: 2,
    sqrt: 1,
    sin: 1,
    cos: 1,
    tan: 1,
    ln: 1,
};

const precedence = {
    '+': 1,
    '-': 1,
    'cdot': 2
};

export function parseTex(input: string): ASTNode {
    if (input.match(/\\left\(/g)?.length !== input.match(/\\right\)/g)?.length) throw new Error('Unbalanced parens');
    return toAST(input);
};

export function toAST(input: string): ASTNode {
    const root: ASTNode[] = [];
    let remaining = input;

    // main parse step
    while (remaining.length) {
        if (remaining.startsWith('\\')) {
            const token = remaining.match(/^\\([a-zA-Z()\[\]]{0,})/)[1];
            remaining = remaining.slice(token.length + 1).trimStart();
            const args: ASTNode[] = [];
            const numArgs = nargs[token] ?? 0;
            for (let i = 0; i < numArgs; i++) {
                if (remaining.match(/^\s*?{/)) {
                    let j = 0;
                    let b = 1;
                    remaining = remaining.trimStart().slice(1);
                    while (b > 0) {
                        if (remaining[j] === undefined) throw new Error('Unbalanced brackets');
                        if (remaining[j] === '{') b++;
                        else if (remaining[j] === '}') b--;
                        j++;
                    }
                    const arg = remaining.slice(0, j - 1);
                    remaining = remaining.slice(j).trimStart();

                    const ast = toAST(arg);
                    args.push(ast);
                } else {
                    let arg = remaining.match(/\s*?./)[0];
                    args.push({ token: arg });
                    remaining = remaining.slice(1).trimStart();
                }
            }
            root.push({
                token,
                args: args.length ? args : undefined
            });
        } else if (remaining.match(/^(\d|\.)+$/)) {
            root.push({ token: remaining });
            break;
        } else {
            const token = remaining.match(/(.*?)(?:\s|\\|\d|$|\{|\+|\-)/)[0];
            root.push({ token: token.trim() });
            remaining = remaining.slice(token.length).trimStart();
        }
    }

    if (root.length > 1) {
        return RPNtoAST(infixToRPN(root));
    }

    return root[0];
};

export function RPNtoAST(rpn: ASTNode[]): ASTNode {
    const refined: ASTNode[] = [];
    for (const token of rpn) {
        if ('token' in token && !(token.token in precedence)) {
            refined.push(token);
        } else if ('token' in token) {
            const right = refined.pop();
            const left = refined.pop();
            if (!left || !right) throw new Error(`Invalid syntax near "${rpn[rpn.indexOf(token) - 1].token ?? ""} ${token.token}"`);
            refined.push({
                token: token.token,
                args: [left, right]
            });
        }
    }

    // can assume the length is 1 because we're only using this function on RPN
    return refined[0];
};

export function infixToRPN(infix: ASTNode[]): ASTNode[] {
    const outputQueue = [];
    const operatorStack = [];

    for (const token of infix) {
        if (!isToken(token)) {
            outputQueue.push(token);
        } else if (!(token.token in precedence || token.token === 'left(' || token.token === 'right)')) {
            outputQueue.push(token);
        } else if (token.token in precedence) {
            while (
                operatorStack.length > 0 &&
                operatorStack[operatorStack.length - 1] !== 'left(' &&
                precedence[operatorStack[operatorStack.length - 1]] >= precedence[token.token]
            ) {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(token);
        } else if (token.token === 'left(') {
            operatorStack.push(token);
        } else if (token.token === 'right)') {
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1].token !== 'left(') {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.pop();
        }
    }

    while (operatorStack.length > 0) {
        outputQueue.push(operatorStack.pop());
    }

    return outputQueue;
};