export default function plus(args: number[]) {
    if (args.length !== 2) throw new Error('plus takes exactly 2 arguments');
    return args[0] + args[1];
}