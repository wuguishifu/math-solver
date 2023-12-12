import { describe, expect, it } from '@jest/globals';
import { parseTex } from '../ast';

describe('ast parser', () => {
    it('should convert equation to an abstract syntax tree', () => {
        const input = '\\frac{1}{2} + \\frac34 + \\frac 5 6 + \\frac{7}8 + \\frac9{10} + \\frac {11}{12} + \\frac {13} {14}';
        expect(parseTex(input)).toEqual([{ "token": "+", "args": [{ "token": "frac", "args": [{ "token": "1" }, { "token": "2" }] }, { "token": "+", "args": [{ "token": "frac", "args": [{ "token": "3" }, { "token": "4" }] }, { "token": "+", "args": [{ "token": "frac", "args": [{ "token": "5" }, { "token": "6" }] }, { "token": "+", "args": [{ "token": "frac", "args": [{ "token": "7" }, { "token": "8" }] }, { "token": "+", "args": [{ "token": "frac", "args": [{ "token": "9" }, { "token": "10" }] }, { "token": "+", "args": [{ "token": "frac", "args": [{ "token": "11" }, { "token": "12" }] }, { "token": "frac", "args": [{ "token": "13" }, { "token": "14" }] }] }] }] }] }] }] }]);
    });

    it('should convert equation into an AST', () => {
        const input = '\\frac{\\frac12}{\\frac{3}{4}}';
        expect(parseTex(input)).toEqual([{ "token": "frac", "args": [{ "token": "frac", "args": [{ "token": "1" }, { "token": "2" }] }, { "token": "frac", "args": [{ "token": "3" }, { "token": "4" }] }] }]);
    });

    it('should convert equation into an AST', () => {
        const input = '\\frac{1}2\\cdot\\frac34';
        expect(parseTex(input)).toEqual([{ "token": "cdot", "args": [{ "token": "frac", "args": [{ "token": "1" }, { "token": "2" }] }, { "token": "frac", "args": [{ "token": "3" }, { "token": "4" }] }] }]);
    });

    it('should convert equation into an AST', () => {
        const input = '\\sqrt{\\frac12}+\\sqrt4';
        expect(parseTex(input)).toEqual([{ "token": "+", "args": [{ "token": "sqrt", "args": [{ "token": "frac", "args": [{ "token": "1" }, { "token": "2" }] }] }, { "token": "sqrt", "args": [{ "token": "4" }] }] }]);
    });

    it('should convert equation into an AST', () => {
        const input = '\\frac{\\sqrt{4}}{2+3}\\cdot\\frac{\\frac{1}{2}}{0.5}\\cdot.5';
        expect(parseTex(input)).toEqual([{ "token": "cdot", "args": [{ "token": "frac", "args": [{ "token": "sqrt", "args": [{ "token": "4" }] }, { "token": "+", "args": [{ "token": "2" }, { "token": "3" }] }] }, { "token": "cdot", "args": [{ "token": "frac", "args": [{ "token": "frac", "args": [{ "token": "1" }, { "token": "2" }] }, { "token": "0.5" }] }, { "token": ".5" }] }] }]);
    });

    it('should convert equation into an AST', () => {
        const input = '\\left(\\frac12+3\\right)\\cdot\\left(4+5\\right)';
        expect(parseTex(input)).toEqual([{ "token": "cdot", "args": [{ "token": "+", "args": [{ "token": "frac", "args": [{ "token": "1" }, { "token": "2" }] }, { "token": "3" }] }, { "token": "+", "args": [{ "token": "4" }, { "token": "5" }] }] }]);
    });

    it('should throw an error', () => {
        const input = '\\left(1+2';
        expect(() => parseTex(input)).toThrowError('Unbalanced parens');
    });

    it('should throw an error', () => {
        const input = '\\frac{1}{2';
        expect(() => parseTex(input)).toThrowError('Unbalanced brackets');
    });
});