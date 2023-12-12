export default function cdot(args: number[]) {
    if (args.length !== 2) throw new Error('cdot takes exactly 2 arguments');
    return args[0] * args[1];
}