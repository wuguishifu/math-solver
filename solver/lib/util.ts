import { ASTNode } from "./types";

export function isToken(entry: ASTNode): entry is ASTNode {
    return (entry as ASTNode).token !== undefined;
}