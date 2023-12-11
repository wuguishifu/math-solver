import { RPNtoAST, infixToRPN, toAST } from './lib/ast';
import { AST } from './lib/types';

const inputString = "\\left(\\frac12+3\\right)+\\frac45\\cdot\\left(6+7\\right)"
// const inputString = "\\left(1+2\\cdot3\\right)";

// console.log('input:', inputString);
// console.log('output:\n' + JSON.stringify(toAST(inputString), null, 2));

// {
//     const tex = "\\left(\\frac12+3\\right)+\\frac45\\cdot\\left(6+7\\right)"
//     const parsed = toAST(tex);
//     console.log({ tex, parsed });
// }

// {
//     const infix: AST = [
//         { token: '1' },
//         { token: '+' },
//         { token: '2' },
//         { token: 'cdot' },
//         { token: '3' }
//     ];
//     const rpn = infixToRPN(infix);
//     console.log({ infix, rpn });
// }

// {
//     const infix: AST = [
//         { token: 'left(' },
//         { token: '1' },
//         { token: '+' },
//         { token: '2' },
//         { token: 'right)' },
//         { token: 'cdot' },
//         { token: '3' }
//     ];
//     const rpn = infixToRPN(infix);
//     console.log({ infix, rpn });
// }

// {
//     const tex = "\\left(\\frac12+3\\right)+\\frac45\\cdot\\left(6+7\\right)"
//     const parsed = toAST(tex);
//     const rpn = infixToRPN(parsed);
//     const ast = RPNtoAST(rpn);
//     console.log(JSON.stringify({
//         tex, parsed, rpn, ast
//     }, null, 2))
// }

// {
//     const tex = "\\frac{\\left(1+2\\right)\\cdot3}2+\\left(\\sqrt{2}+2\\right)"
//     const parsed = toAST(tex);
//     const rpn = infixToRPN(parsed);
//     const ast = RPNtoAST(rpn);
//     console.log(JSON.stringify({
//         tex, parsed, rpn, ast
//     }, null, 2))
// }

{
    const tex = "\\frac{\\left(1+2\\right)\\cdot3}2+\\left(\\sqrt{2}+2\\right)"
    const ast = toAST(tex);
    console.log(JSON.stringify(ast, null, 2));
}

{
    const tex = "\\left(\\frac12+3\\right)+\\frac45\\cdot\\left(6+7\\right)"
    const ast = toAST(tex);
    console.log(JSON.stringify(ast, null, 2));
}


// const refined: AST = [];
// for (const token of rpn) {
//     if ('token' in token && token.token.match(/^(?:\d|\.)$/)) {
//         refined.push(token);
//     } else if ('token' in token) {
//         const right = refined.pop();
//         const left = refined.pop();
//         refined.push({
//             token: token.token,
//             args: [left as any, right]
//         });
//     }
// }
// console.log(JSON.stringify(refined, null, 2));