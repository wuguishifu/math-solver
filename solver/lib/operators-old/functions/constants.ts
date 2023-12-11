import { type Operator } from "../operator";

export const pi: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 0,
    f: () => Math.PI,
};

export const e: Operator = {
    precedence: 5,
    association: 'right',
    numInputs: 0,
    f: () => Math.E,
};