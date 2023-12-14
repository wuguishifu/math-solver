import { evaluateAst, parseTex } from './lib/ast';

{
    const tex = "2^3";
    const ast = parseTex(tex);
    console.log(JSON.stringify(ast, null, 2));
    const solution = evaluateAst(ast);
    console.log(solution);
}