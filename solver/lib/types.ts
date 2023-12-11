export type Token = {
    token: string;
    args?: AST;
}

export type AST = (Token | AST)[];