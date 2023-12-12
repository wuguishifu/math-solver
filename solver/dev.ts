import { parseTex } from './lib/ast';

{
    const tex = "\\sqrt{4} + + 2";
    const ast = parseTex(tex);
    console.log(JSON.stringify(ast, null, 2));
}