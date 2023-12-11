import { type Operator } from "../operator";

export const sinh: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => (Math.exp(a) - Math.exp(-a)) / 2,
};

export const cosh: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => (Math.exp(a) + Math.exp(-a)) / 2,
};

export const tanh: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => (Math.exp(a) - Math.exp(-a)) / (Math.exp(a) + Math.exp(-a)),
};

export const arcsinh: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => Math.log(a + Math.sqrt(a * a + 1)),
};

export const arccosh: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => Math.log(a + Math.sqrt(a * a - 1)),
};

export const arctanh: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => Math.log((1 + a) / (1 - a)) / 2,
};

export const sech: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => 2 / (Math.exp(a) + Math.exp(-a)),
};

export const csch: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => 2 / (Math.exp(a) - Math.exp(-a)),
};

export const coth: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => (Math.exp(a) + Math.exp(-a)) / (Math.exp(a) - Math.exp(-a)),
};

export const arcsech: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => Math.log((1 + Math.sqrt(1 - a * a)) / a),
};

export const arccsch: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => Math.log((1 + Math.sqrt(1 + a * a)) / a),
};

export const arccoth: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => Math.log((a + 1) / (a - 1)) / 2,
};