import { Operator } from "../operator"

export const add: Operator = {
    precedence: 1,
    association: 'left',
    numInputs: 2,
    f: (a: number, b: number) => a + b,
};

export const subtract: Operator = {
    precedence: 1,
    association: 'left',
    numInputs: 2,
    f: (a: number, b: number) => a - b,
};

export const multiply: Operator = {
    precedence: 2,
    association: 'left',
    numInputs: 2,
    f: (a: number, b: number) => a * b,
};

export const divide: Operator = {
    precedence: 2,
    association: 'left',
    numInputs: 2,
    f: (a: number, b: number) => a / b,
};

export const power: Operator = {
    precedence: 4,
    association: 'right',
    numInputs: 2,
    f: (a: number, b: number) => Math.pow(a, b),
};

export const unary: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => -a,
};