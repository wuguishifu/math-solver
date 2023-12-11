export type Operator = {
    precedence: number;
    association: 'right' | 'left';
    numInputs: number;
    f: (...args: number[]) => number;
};