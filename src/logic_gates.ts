import * as Relay from "./relay.ts";
import { Voltage } from "./voltage.ts";

export type NAND<
    I0 extends Voltage,
    I1 extends Voltage,
> = Relay.NC<Voltage.High, Relay.NO<I0, I1>>;

export function NAND<
    const I0 extends Voltage,
    const I1 extends Voltage,
>(i0: I0, i1: I1): NAND<I0, I1> {
    return Relay.NC(Voltage.High, Relay.NO(i0, i1));
}

export type NOT<
    X extends Voltage,
> = NAND<X, X>;

export function NOT<
    const X extends Voltage,
>(x: X): NOT<X> {
    return NAND(x, x);
}

export type AND<
    I0 extends Voltage,
    I1 extends Voltage,
> = Relay.NO<I0, I1>;

export function AND<
    const I0 extends Voltage,
    const I1 extends Voltage,
>(i0: I0, i1: I1): AND<I0, I1> {
    return Relay.NO(i0, i1);
}

export type OR<
    I0 extends Voltage,
    I1 extends Voltage,
> = NAND<NOT<I0>, NOT<I1>>;

export function OR<
    const I0 extends Voltage,
    const I1 extends Voltage,
>(i0: I0, i1: I1): OR<I0, I1> {
    return NAND(NOT(i0), NOT(i1));
}

export type NOR<
    I0 extends Voltage,
    I1 extends Voltage,
> = NOT<OR<I0, I1>>;

export function NOR<
    const I0 extends Voltage,
    const I1 extends Voltage,
>(i0: I0, i1: I1): NOR<I0, I1> {
    return NOT(OR(i0, i1));
}

export type XOR<
    I0 extends Voltage,
    I1 extends Voltage,
> = NAND<NAND<I0, NAND<I0, I1>>, NAND<I1, NAND<I0, I1>>>;

export function XOR<
    const I0 extends Voltage,
    const I1 extends Voltage,
>(i0: I0, i1: I1): XOR<I0, I1> {
    return NAND(NAND(i0, NAND(i0, i1)), NAND(i1, NAND(i0, i1)));
}

export type XNOR<
    I0 extends Voltage,
    I1 extends Voltage,
> = NOT<XOR<I0, I1>>;

export function XNOR<
    const I0 extends Voltage,
    const I1 extends Voltage,
>(i0: I0, i1: I1): XNOR<I0, I1> {
    return NOT(XOR(i0, i1));
}

export type IMPLY<
    I0 extends Voltage,
    I1 extends Voltage,
> = OR<NOT<I0>, I1>;

export function IMPLY<
    const A extends Voltage,
    const B extends Voltage,
>(i0: A, i1: B): IMPLY<A, B> {
    return OR(NOT(i0), i1);
}

export type NIMPLY<
    I0 extends Voltage,
    I1 extends Voltage,
> = AND<I0, NOT<I1>>;

export function NIMPLY<
    const I0 extends Voltage,
    const I1 extends Voltage,
>(i0: I0, i1: I1): NIMPLY<I0, I1> {
    return AND(i0, NOT(i1));
}

export type MUX<
    S extends Voltage,
    I0 extends Voltage,
    I1 extends Voltage,
> = OR<AND<I0, NOT<S>>, AND<I1, S>>;

export function MUX<
    const S extends Voltage,
    const I0 extends Voltage,
    const I1 extends Voltage,
>(s: S, i0: I0, i1: I1): MUX<S, I0, I1> {
    return OR(AND(i0, NOT(s)), AND(i1, s));
}

export type DEMUX<
    S extends Voltage,
    X extends Voltage,
> = [
    Y0: AND<NOT<S>, X>,
    Y1: AND<S, X>,
];

export function DEMUX<
    const S extends Voltage,
    const X extends Voltage,
>(s: S, x: X): DEMUX<S, X> {
    return [AND(NOT(s), x), AND(s, x)];
}

export type NAND3<
    I0 extends Voltage,
    I1 extends Voltage,
    I2 extends Voltage,
> = NAND<AND<I0, I1>, I2>;

export function NAND3<
    const I0 extends Voltage,
    const I1 extends Voltage,
    const I2 extends Voltage,
>(i0: I0, i1: I1, i2: I2): NAND3<I0, I1, I2> {
    return NAND(AND(i0, i1), i2);
}

export type AND3<
    I0 extends Voltage,
    I1 extends Voltage,
    I2 extends Voltage,
> = AND<AND<I0, I1>, I2>;

export function AND3<
    const I0 extends Voltage,
    const I1 extends Voltage,
    const I2 extends Voltage,
>(i0: I0, i1: I1, i3: I2): AND3<I0, I1, I2> {
    return AND(AND(i0, i1), i3);
}

export type OR3<
    I0 extends Voltage,
    I1 extends Voltage,
    I2 extends Voltage,
> = OR<OR<I0, I1>, I2>;

export function OR3<
    const I0 extends Voltage,
    const I1 extends Voltage,
    const I2 extends Voltage,
>(i0: I0, i1: I1, i2: I2): OR3<I0, I1, I2> {
    return OR(OR(i0, i1), i2);
}

export type MAJORITY<
    I0 extends Voltage,
    I1 extends Voltage,
    I2 extends Voltage,
> = OR<AND<I0, I1>, OR<AND<I0, I2>, AND<I1, I2>>>;

export function MAJORITY<
    const I0 extends Voltage,
    const I1 extends Voltage,
    const I2 extends Voltage,
>(i0: I0, i1: I1, i2: I2): MAJORITY<I0, I1, I2> {
    return OR(AND(i0, i1), OR(AND(i0, i2), AND(i1, i2)));
}

export type PARITY3<
    I0 extends Voltage,
    I1 extends Voltage,
    I2 extends Voltage,
> = XOR<I0, XOR<I1, I2>>;

export function PARITY3<
    const I0 extends Voltage,
    const I1 extends Voltage,
    const I2 extends Voltage,
>(i0: I0, i1: I1, i2: I2): PARITY3<I0, I1, I2> {
    return XOR(i0, XOR(i1, i2));
}

export type OR4<
    I0 extends Voltage,
    I1 extends Voltage,
    I2 extends Voltage,
    I3 extends Voltage,
> = OR<OR3<I0, I1, I2>, I3>;

export function OR4<
    const I0 extends Voltage,
    const I1 extends Voltage,
    const I2 extends Voltage,
    const I3 extends Voltage,
>(i0: I0, i1: I1, i2: I2, i3: I3): OR4<I0, I1, I2, I3> {
    return OR(OR3(i0, i1, i2), i3);
}

export type MUX4X1<
    S0 extends Voltage,
    S1 extends Voltage,
    I0 extends Voltage,
    I1 extends Voltage,
    I2 extends Voltage,
    I3 extends Voltage,
> = OR4<
    AND3<NOT<S0>, I0, NOT<S1>>,
    AND3<NOT<S0>, I1, S1>,
    AND3<S0, I2, NOT<S1>>,
    AND3<S0, I3, S1>
>;

export function MUX4X1<
    const S0 extends Voltage,
    const S1 extends Voltage,
    const I0 extends Voltage,
    const I1 extends Voltage,
    const I2 extends Voltage,
    const I3 extends Voltage,
>(s0: S0, s1: S1, i0: I0, i1: I1, i2: I2, i3: I3): MUX4X1<S0, S1, I0, I1, I2, I3> {
    return OR4(
        AND3(NOT(s0), i0, NOT(s1)),
        AND3(NOT(s0), i1, s1),
        AND3(s0, i2, NOT(s1)),
        AND3(s0, i3, s1),
    );
}

export type DEMUX1X4<
    S0 extends Voltage,
    S1 extends Voltage,
    X extends Voltage,
> = [
    Y0: AND3<NOT<S0>, X, NOT<S1>>,
    Y1: AND3<NOT<S0>, X, S1>,
    Y2: AND3<S0, X, NOT<S1>>,
    Y3: AND3<S0, X, S1>,
];
