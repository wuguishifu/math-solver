import type { AST, Token } from './types';
import { isToken } from './util';
import operators from './operators';

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

export function parseTex(input: string): AST {
    if (input.match(/\\left\(/g)?.length !== input.match(/\\right\)/g)?.length) throw new Error('Unbalanced parens');
    return toAST(input);
};

export function toAST(input: string): AST {
    const tokens: AST = [];
    let remaining = input;

    // main parse step
    while (remaining.length) {
        if (remaining.startsWith('\\')) {
            const token = remaining.match(/^\\([a-zA-Z()\[\]]{0,})/)[1];
            remaining = remaining.slice(token.length + 1).trimStart();
            const args: AST = [];
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
                    if (ast.length === 1) {
                        args.push(ast[0] as any);
                    } else {
                        args.push(ast as any);
                    }
                } else {
                    let arg = remaining.match(/\s*?./)[0];
                    args.push({ token: arg });
                    remaining = remaining.slice(1).trimStart();
                }
            }
            tokens.push({
                token,
                args: args.length ? args : undefined
            });
        } else if (remaining.match(/^(\d|\.)+$/)) {
            tokens.push({ token: remaining });
            break;
        } else {
            const token = remaining.match(/(.*?)(?:\s|\\|\d|$|\{|\+|\-)/)[0];
            tokens.push({ token: token.trim() });
            remaining = remaining.slice(token.length).trimStart();
        }
    }

    if (tokens.length > 1) {
        return RPNtoAST(infixToRPN(tokens));
    }

    return tokens;
};

export function RPNtoAST(rpn: AST): AST {
    const refined: AST = [];
    for (const token of rpn) {
        if ('token' in token && !(token.token in precedence)) {
            refined.push(token);
        } else if ('token' in token) {
            const right = refined.pop();
            const left = refined.pop();
            refined.push({
                token: token.token,
                args: [left, right]
            });
        }
    }
    return refined;
};

export function infixToRPNnaive(infix: AST): AST {
    const outputQueue = [];
    const operatorStack = [];

    // check for unbalanced parens
    let parens = 0;
    for (const token of infix) {
        if (!isToken(token)) continue;
        if (token.token === 'left(') parens++;
        else if (token.token === 'right)') parens--;
    }

    if (parens !== 0) throw new Error('Unbalanced parens');

    for (const token of infix) {
        if (!isToken(token)) {
            outputQueue.push(token);
        } else if (!((token as Token).token in precedence)) {
            outputQueue.push(token);
        } else if ((token as Token).token in precedence) {
            while (operatorStack.length && precedence[operatorStack[operatorStack.length - 1]] >= precedence[(token as Token).token]) {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(token);
        }
    }

    while (operatorStack.length) {
        outputQueue.push(operatorStack.pop());
    }

    return outputQueue;
};

export function infixToRPN(infix: AST): AST {
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