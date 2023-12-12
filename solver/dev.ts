import { toAST } from './lib/ast';

{
    const tex = "\\left(1+2";
    const ast = toAST(tex);
    console.log(JSON.stringify(ast, null, 2));
}