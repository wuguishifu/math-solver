import { evaluateAst, parseTex } from './lib/ast';

{
    const tex = "\\frac{1}{2} + \\frac34 + \\frac 5 6 + \\frac{7}8 + \\frac9{10} + \\frac {11}{12} + \\frac {13} {14}";
    const ast = parseTex(tex);
    console.log(JSON.stringify(ast, null, 2));
    const solution = evaluateAst(ast);
    console.log(solution);
}