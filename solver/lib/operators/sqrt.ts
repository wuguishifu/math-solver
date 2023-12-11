export default function sqrt(arg: number) {
    if (arg < 0) throw new Error('Cannot take square root of negative number');
    return Math.sqrt(arg);
}