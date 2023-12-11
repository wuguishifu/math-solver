import { Operator } from "./operator";
import { add, subtract, multiply, divide, power, unary } from "./functions/base";
import { exp, abs, ln, log, sqrt, nroot } from "./functions/standard";
import { sin, cos, tan, arcsin, arccos, arctan, sec, csc, cot, arcsec, arccsc, arccot } from "./functions/trig";
import { sinh, cosh, tanh, arcsinh, arccosh, arctanh, sech, csch, coth, arcsech, arccsch, arccoth } from "./functions/trigh";
import { pi, e } from "./functions/constants";

const operators: Record<string, Operator> = {
    // base operators
    '+': add, '-': subtract, '*': multiply, '/': divide, '^': power, '_': unary,

    // standard
    exp, abs, ln, log, sqrt, nroot,

    // trig
    sin, cos, tan, arcsin, arccos, arctan, sec, csc, cot, arcsec, arccsc, arccot,

    // hyperbolic trig
    sinh, cosh, tanh, arcsinh, arccosh, arctanh, sech, csch, coth, arcsech, arccsch, arccoth,

    // constants
    pi, e,
};

export default operators;