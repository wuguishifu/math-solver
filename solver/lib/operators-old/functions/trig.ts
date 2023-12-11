import { type Operator } from "../operator";

export const sin: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => Math.sin(a),
};

export const cos: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => Math.cos(a),
};

export const tan: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => Math.tan(a),
};

export const arcsin: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => Math.asin(a),
};

export const arccos: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => Math.acos(a),
};

export const arctan: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => Math.atan(a),
};

export const sec: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => 1 / Math.cos(a),
};

export const csc: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => 1 / Math.sin(a),
};

export const cot: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => 1 / Math.tan(a),
};

export const arcsec: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => Math.acos(1 / a),
};

export const arccsc: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => Math.asin(1 / a),
};

export const arccot: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 1,
    f: (a: number) => Math.atan(1 / a),
};