import type * as Bin from "./binary.ts";
import { NOT } from "./gates.ts";

export type Bits16<A extends Bin.Bits16> = [NOT<A[0]>, NOT<A[1]>, NOT<A[2]>, NOT<A[3]>, NOT<A[4]>, NOT<A[5]>, NOT<A[6]>,
    NOT<A[7]>, NOT<A[8]>, NOT<A[9]>, NOT<A[10]>, NOT<A[11]>, NOT<A[12]>, NOT<A[13]>, NOT<A[14]>, NOT<A[15]>];

export function Bits16<const A extends Bin.Bits16>(a: A): Bits16<A> {
    const [a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15]: [A[0], A[1], A[2], A[3], A[4], A[5],
        A[6], A[7], A[8], A[9], A[10], A[11], A[12], A[13], A[14], A[15]] = a;
    return [NOT(a0), NOT(a1), NOT(a2), NOT(a3), NOT(a4), NOT(a5), NOT(a6), NOT(a7), NOT(a8), NOT(a9), NOT(a10),
        NOT(a11), NOT(a12), NOT(a13), NOT(a14), NOT(a15)];
}
