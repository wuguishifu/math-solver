import { describe, expect, it } from '@jest/globals';
import { toAST } from '../ast';

describe('ast parser', () => {
    it('should convert equation to an abstract syntax tree', () => {
        const input = '\\frac{1}{2} + \\frac34 + \\frac 5 6 + \\frac{7}8 + \\frac9{10} + \\frac {11}{12} + \\frac {13} {14}';
        expect(toAST(input)).toEqual([
            { token: 'frac', args: [{ token: '1' }, { token: '2' }] },
            { token: '+' },
            { token: 'frac', args: [{ token: '3' }, { token: '4' }] },
            { token: '+' },
            { token: 'frac', args: [{ token: '5' }, { token: '6' }] },
            { token: '+' },
            { token: 'frac', args: [{ token: '7' }, { token: '8' }] },
            { token: '+' },
            { token: 'frac', args: [{ token: '9' }, { token: '10' }] },
            { token: '+' },
            { token: 'frac', args: [{ token: '11' }, { token: '12' }] },
            { token: '+' },
            { token: 'frac', args: [{ token: '13' }, { token: '14' }] },
        ]);
    });

    it('should convert equation into an AST', () => {
        const input = '\\frac{\\frac12}{\\frac{3}{4}}';
        expect(toAST(input)).toEqual([
            {
                token: 'frac',
                args: [
                    { token: 'frac', args: [{ token: '1' }, { token: '2' }] },
                    { token: 'frac', args: [{ token: '3' }, { token: '4' }] }
                ]
            }
        ]);
    });

    it('should convert equation into an AST', () => {
        const input = '\\frac{1}2\\cdot\\frac34';
        expect(toAST(input)).toEqual([
            {
                token: 'frac',
                args: [
                    { token: '1' },
                    { token: '2' }
                ]
            },
            { token: 'cdot' },
            {
                token: 'frac',
                args: [
                    { token: '3' },
                    { token: '4' }
                ]
            }
        ]);
    });

    it('should convert equation into an AST', () => {
        const input = '\\sqrt{\\frac12}+\\sqrt4';
        expect(toAST(input)).toEqual([
            {
                token: 'sqrt',
                args: [
                    { token: 'frac', args: [{ token: '1' }, { token: '2' }] }
                ]
            },
            { 'token': '+' },
            {
                token: 'sqrt',
                args: [
                    { token: '4' }
                ]
            }
        ]);
    });

    it('should convert equation into an AST', () => {
        const input = '\\frac{\\sqrt{4}}{2+3}\\cdot\\frac{\\frac{1}{2}}{0.5}\\cdot.5';
        expect(toAST(input)).toEqual([
            {
                token: 'frac',
                args: [
                    {
                        token: 'sqrt',
                        args: [
                            { token: '4' }
                        ]
                    },
                    [
                        { token: '2' },
                        { token: '+' },
                        { token: '3' }
                    ]
                ]
            },
            { token: 'cdot' },
            {
                token: 'frac',
                args: [
                    {
                        token: 'frac',
                        args: [
                            { token: '1' },
                            { token: '2' }
                        ]
                    },
                    { token: '0.5' }
                ]
            },
            { token: 'cdot' },
            { token: '.5' },
        ]);
    });

    it('should convert equation into an AST', () => {
        const input = '\\left(\\frac12+3\\right)\\cdot\\left(4+5\\right)';
        expect(toAST(input)).toEqual([
            {
                token: 'group',
                args: [
                    {
                        token: 'frac',
                        args: [
                            { token: '1' },
                            { token: '2' }
                        ]
                    },
                    { token: '+' },
                    { token: '3' }
                ]
            },
            { token: 'cdot' },
            {
                token: 'group',
                args: [
                    { token: '4' },
                    { token: '+' },
                    { token: '5' }
                ]
            }
        ]);
    });

    it('should throw an error', () => {
        const input = '\\left(1+2';
        expect(() => toAST(input)).toThrowError('Unbalanced parens');
    });

    it('should throw an error', () => {
        const input = '\\frac{1}{2';
        expect(() => toAST(input)).toThrowError('Unbalanced brackets');
    });
});