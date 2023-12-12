export default function minus(args: number[]) {
    if (args.length !== 2) throw new Error('minus takes exactly 2 arguments');
    return args[0] - args[1];
}