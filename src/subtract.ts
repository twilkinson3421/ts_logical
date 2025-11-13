import * as Add from "./adder.ts";
import type * as Bin from "./binary.ts";
import * as Inc from "./increment.ts";
import * as Inv from "./invert.ts";

export type Bits16<
    A extends Bin.Bits16,
    B extends Bin.Bits16,
> = Inc.Bits16<Add.Bits16.HALF<A, Inv.Bits16<B>>[1]>;

export function Bits16<
    const A extends Bin.Bits16,
    const B extends Bin.Bits16,
>(a: A, b: B): Bits16<A, B> {
    return Inc.Bits16(Add.Bits16.HALF(a, Inv.Bits16(b))[1]);
}
