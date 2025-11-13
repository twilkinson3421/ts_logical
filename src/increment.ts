import * as Add from "./adder.ts";
import * as Bin from "./binary.ts";

export type Bits16<A extends Bin.Bits16> = Add.Bits16.HALF<A, Bin.Bits16.Constant.ONE>[1];

export function Bits16<const A extends Bin.Bits16>(a: A): Bits16<A> {
    return Add.Bits16.HALF(a, Bin.Bits16.Constant.ONE())[1];
}
