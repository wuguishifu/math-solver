import { type Operator } from "../operator";

export const abs: Operator = {
    precedence: 3,
    association: 'right',
    numInputs: 1,
    f: (a: number) => Math.abs(a),
};

export const exp: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => Math.exp(a),
};

export const ln: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => Math.log(a),
};

export const log: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number, b: number) => Math.log(a) / Math.log(b),
};

export const sqrt: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => Math.sqrt(a),
};

export const nroot: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 2,
    f: (a: number, b: number) => Math.pow(a, 1 / b),
};