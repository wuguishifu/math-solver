export default function pow(args: number[]) {
    if (args.length !== 2) throw new Error('pow takes exactly 2 arguments');
    return args[0] ** args[1];
}