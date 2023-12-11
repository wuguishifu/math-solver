import { AST, Token } from "./types";

export function isToken(entry: Token | AST): entry is Token {
    return (entry as Token).token !== undefined;
}