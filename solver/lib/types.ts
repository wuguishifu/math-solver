export type ASTNode = {
    token: string;
    args?: ASTNode[];
}