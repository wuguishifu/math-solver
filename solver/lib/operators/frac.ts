export default function frac(args: number[]) {
    if (args.length !== 2) throw new Error('frac takes exactly 2 arguments');
    if (args[1] === 0) throw new Error('Cannot divide by zero');
    return args[0] / args[1];
};