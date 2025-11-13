import type { Bit } from "./binary.ts";
import { AND, OR, XOR } from "./gates.ts";

type RIP<
    Q extends [Bit, Bit[]],
    S extends Bit[],
> = [Q[0], [...Q[1], ...S]];

function RIP<
    const Q extends [Bit, Bit[]],
    const S extends Bit[],
>(q: Q, s: S): RIP<Q, S> {
    const [c, qs]: [Q[0], Q[1]] = q;
    return [c, [...qs, ...s]];
}

export namespace U1
{
    export type HALF<
        A extends Bit,
        B extends Bit,
    > = [
        C: AND<A, B>,
        [S: XOR<A, B>],
    ];

    export type FULL<
        Cin extends Bit,
        A extends Bit,
        B extends Bit,
    > = [
        C: OR<AND<Cin, XOR<A, B>>, AND<A, B>>,
        [S: XOR<XOR<A, B>, Cin>],
    ];

    export type RCA<
        A extends Bit,
        B extends Bit,
        Q extends [C: Bit, QS: Bit[]],
    > = RIP<FULL<Q[0], A, B>, Q[1]>;

    export function HALF<
        const A extends Bit,
        const B extends Bit,
    >(a: A, b: B): HALF<A, B> {
        return [
            AND(a, b),
            [XOR(a, b)],
        ];
    }

    export function FULL<
        const Cin extends Bit,
        const A extends Bit,
        const B extends Bit,
    >(cin: Cin, a: A, b: B): FULL<Cin, A, B> {
        return [
            OR(AND(cin, XOR(a, b)), AND(a, b)),
            [XOR(XOR(a, b), cin)],
        ];
    }

    export function RCA<
        const A extends Bit,
        const B extends Bit,
        const Q extends [C: Bit, QS: Bit[]],
    >(a: A, b: B, q: Q): RCA<A, B, Q> {
        const [c, qs]: [Q[0], Q[1]] = q;
        return RIP(FULL(c, a, b), qs);
    }
}

export namespace U2
{
    // dprint-ignore
    export type HALF<
        A1 extends Bit, A0 extends Bit,
        B1 extends Bit, B0 extends Bit,
    > = U1.RCA<A1, B1, U1.HALF<A0, B0>>;

    // dprint-ignore
    export type FULL<
        Cin extends Bit,
        A1 extends Bit, A0 extends Bit,
        B1 extends Bit, B0 extends Bit,
    > = U1.RCA<A1, B1, U1.FULL<Cin, A0, B0>>;

    // dprint-ignore
    export type RCA<
        A1 extends Bit, A0 extends Bit,
        B1 extends Bit, B0 extends Bit,
        Q extends [C: Bit, QS: Bit[]],
    > = RIP<FULL<Q[0], A1, A0, B1, B0>, Q[1]>;

    // dprint-ignore
    export function HALF<
        const A1 extends Bit, const A0 extends Bit,
        const B1 extends Bit, const B0 extends Bit,
    >(a1: A1, a0: A0, b1: B1, b0: B0): HALF<A1, A0, B1, B0> {
        return U1.RCA(a1, b1, U1.HALF(a0, b0));
    }

    // dprint-ignore
    export function FULL<
        const Cin extends Bit,
        const A1 extends Bit, const A0 extends Bit,
        const B1 extends Bit, const B0 extends Bit,
    >(cin: Cin, a1: A1, a0: A0, b1: B1, b0: B0): FULL<Cin, A1, A0, B1, B0> {
        return U1.RCA(a1, b1, U1.FULL(cin, a0, b0));
    }

    // dprint-ignore
    export function RCA<
        const A1 extends Bit, const A0 extends Bit,
        const B1 extends Bit, const B0 extends Bit,
        const Q extends [C: Bit, QS: Bit[]],
    >(a1: A1, a0: A0, b1: B1, b0: B0, q: Q): RCA<A1, A0, B1, B0, Q> {
        const [c, qs]: [Q[0], Q[1]] = q;
        return RIP(FULL(c, a1, a0, b1, b0), qs);
    }
}

export namespace U4
{
    // dprint-ignore
    export type HALF<
        A3 extends Bit, A2 extends Bit, A1 extends Bit, A0 extends Bit,
        B3 extends Bit, B2 extends Bit, B1 extends Bit, B0 extends Bit,
    > = U2.RCA<A3, A2, B3, B2, U2.HALF<A1, A0, B1, B0>>;

    // dprint-ignore
    export type FULL<
        Cin extends Bit,
        A3 extends Bit, A2 extends Bit, A1 extends Bit, A0 extends Bit,
        B3 extends Bit, B2 extends Bit, B1 extends Bit, B0 extends Bit,
    > = U2.RCA<A3, A2, B3, B2, U2.FULL<Cin, A1, A0, B1, B0>>;

    // dprint-ignore
    export type RCA<
        A3 extends Bit, A2 extends Bit, A1 extends Bit, A0 extends Bit,
        B3 extends Bit, B2 extends Bit, B1 extends Bit, B0 extends Bit,
        Q extends [C: Bit, QS: Bit[]],
    > = RIP<FULL<Q[0], A3, A2, A1, A0, B3, B2, B1, B0>, Q[1]>;

    // dprint-ignore
    export function HALF<
        const A3 extends Bit, const A2 extends Bit, const A1 extends Bit, const A0 extends Bit,
        const B3 extends Bit, const B2 extends Bit, const B1 extends Bit, const B0 extends Bit,
    >(
        a3: A3, a2: A2, a1: A1, a0: A0,
        b3: B3, b2: B2, b1: B1, b0: B0
    ): HALF<A3, A2, A1, A0, B3, B2, B1, B0> {
        return U2.RCA(a3, a2, b3, b2, U2.HALF(a1, a0, b1, b0));
    }

    // dprint-ignore
    export function FULL<
        const Cin extends Bit,
        const A3 extends Bit, const A2 extends Bit, const A1 extends Bit, const A0 extends Bit,
        const B3 extends Bit, const B2 extends Bit, const B1 extends Bit, const B0 extends Bit,
    >(
        cin: Cin,
        a3: A3, a2: A2, a1: A1, a0: A0,
        b3: B3, b2: B2, b1: B1, b0: B0
    ): FULL<Cin, A3, A2, A1, A0, B3, B2, B1, B0> {
        return U2.RCA(a3, a2, b3, b2, U2.FULL(cin, a1, a0, b1, b0));
    }

    // dprint-ignore
    export function RCA<
        const A3 extends Bit, const A2 extends Bit, const A1 extends Bit, const A0 extends Bit,
        const B3 extends Bit, const B2 extends Bit, const B1 extends Bit, const B0 extends Bit,
        const Q extends [C: Bit, QS: Bit[]],
    >(
        a3: A3, a2: A2, a1: A1, a0: A0,
        b3: B3, b2: B2, b1: B1, b0: B0,
        q: Q
    ): RCA<A3, A2, A1, A0, B3, B2, B1, B0, Q> {
        const [c, qs]: [Q[0], Q[1]] = q;
        return RIP(FULL(c, a3, a2, a1, a0, b3, b2, b1, b0), qs);
    }
}

export namespace U8
{
    // dprint-ignore
    export type HALF<
        A7 extends Bit, A6 extends Bit, A5 extends Bit, A4 extends Bit,
        A3 extends Bit, A2 extends Bit, A1 extends Bit, A0 extends Bit,

        B7 extends Bit, B6 extends Bit, B5 extends Bit, B4 extends Bit,
        B3 extends Bit, B2 extends Bit, B1 extends Bit, B0 extends Bit,
    > = U4.RCA<A7, A6, A5, A4, B7, B6, B5, B4, U4.HALF<A3, A2, A1, A0, B3, B2, B1, B0>>;

    // dprint-ignore
    export type FULL<
        Cin extends Bit,
        A7 extends Bit, A6 extends Bit, A5 extends Bit, A4 extends Bit,
        A3 extends Bit, A2 extends Bit, A1 extends Bit, A0 extends Bit,

        B7 extends Bit, B6 extends Bit, B5 extends Bit, B4 extends Bit,
        B3 extends Bit, B2 extends Bit, B1 extends Bit, B0 extends Bit,
    > = U4.RCA<A7, A6, A5, A4, B7, B6, B5, B4, U4.FULL<Cin, A3, A2, A1, A0, B3, B2, B1, B0>>;

    // dprint-ignore
    export type RCA<
        A7 extends Bit, A6 extends Bit, A5 extends Bit, A4 extends Bit,
        A3 extends Bit, A2 extends Bit, A1 extends Bit, A0 extends Bit,

        B7 extends Bit, B6 extends Bit, B5 extends Bit, B4 extends Bit,
        B3 extends Bit, B2 extends Bit, B1 extends Bit, B0 extends Bit,
        Q extends [C: Bit, QS: Bit[]],
    > = RIP<FULL<Q[0], A7, A6, A5, A4, A3, A2, A1, A0, B7, B6, B5, B4, B3, B2, B1, B0>, Q[1]>;

    // dprint-ignore
    export function HALF<
        const A7 extends Bit, const A6 extends Bit, const A5 extends Bit, const A4 extends Bit,
        const A3 extends Bit, const A2 extends Bit, const A1 extends Bit, const A0 extends Bit,

        const B7 extends Bit, const B6 extends Bit, const B5 extends Bit, const B4 extends Bit,
        const B3 extends Bit, const B2 extends Bit, const B1 extends Bit, const B0 extends Bit,
    >(
        a7: A7, a6: A6, a5: A5, a4: A4,
        a3: A3, a2: A2, a1: A1, a0: A0,

        b7: B7, b6: B6, b5: B5, b4: B4,
        b3: B3, b2: B2, b1: B1, b0: B0
    ): HALF<A7, A6, A5, A4, A3, A2, A1, A0, B7, B6, B5, B4, B3, B2, B1, B0> {
        return U4.RCA(a7, a6, a5, a4, b7, b6, b5, b4, U4.HALF(a3, a2, a1, a0, b3, b2, b1, b0));
    }

    // dprint-ignore
    export function FULL<
        const Cin extends Bit,

        const A7 extends Bit, const A6 extends Bit, const A5 extends Bit, const A4 extends Bit,
        const A3 extends Bit, const A2 extends Bit, const A1 extends Bit, const A0 extends Bit,

        const B7 extends Bit, const B6 extends Bit, const B5 extends Bit, const B4 extends Bit,
        const B3 extends Bit, const B2 extends Bit, const B1 extends Bit, const B0 extends Bit,
    >(
        cin: Cin,

        a7: A7, a6: A6, a5: A5, a4: A4,
        a3: A3, a2: A2, a1: A1, a0: A0,

        b7: B7, b6: B6, b5: B5, b4: B4,
        b3: B3, b2: B2, b1: B1, b0: B0
    ): FULL<Cin, A7, A6, A5, A4, A3, A2, A1, A0, B7, B6, B5, B4, B3, B2, B1, B0> {
        return U4.RCA(a7, a6, a5, a4, b7, b6, b5, b4, U4.FULL(cin, a3, a2, a1, a0, b3, b2, b1, b0));
    }

    // dprint-ignore
    export function RCA<
        const A7 extends Bit, const A6 extends Bit, const A5 extends Bit, const A4 extends Bit,
        const A3 extends Bit, const A2 extends Bit, const A1 extends Bit, const A0 extends Bit,

        const B7 extends Bit, const B6 extends Bit, const B5 extends Bit, const B4 extends Bit,
        const B3 extends Bit, const B2 extends Bit, const B1 extends Bit, const B0 extends Bit,

        const Q extends [C: Bit, QS: Bit[]],
    >(
        a7: A7, a6: A6, a5: A5, a4: A4,
        a3: A3, a2: A2, a1: A1, a0: A0,

        b7: B7, b6: B6, b5: B5, b4: B4,
        b3: B3, b2: B2, b1: B1, b0: B0,

        q: Q
    ): RCA<A7, A6, A5, A4, A3, A2, A1, A0, B7, B6, B5, B4, B3, B2, B1, B0, Q> {
        const [c, qs]: [Q[0], Q[1]] = q;
        return RIP(FULL(c, a7, a6, a5, a4, a3, a2, a1, a0, b7, b6, b5, b4, b3, b2, b1, b0), qs);
    }
}

export namespace U16
{
    // dprint-ignore
    export type HALF<
        A15 extends Bit, A14 extends Bit, A13 extends Bit, A12 extends Bit,
        A11 extends Bit, A10 extends Bit, A9 extends Bit, A8 extends Bit,
        A7 extends Bit, A6 extends Bit, A5 extends Bit, A4 extends Bit,
        A3 extends Bit, A2 extends Bit, A1 extends Bit, A0 extends Bit,

        B15 extends Bit, B14 extends Bit, B13 extends Bit, B12 extends Bit,
        B11 extends Bit, B10 extends Bit, B9 extends Bit, B8 extends Bit,
        B7 extends Bit, B6 extends Bit, B5 extends Bit, B4 extends Bit,
        B3 extends Bit, B2 extends Bit, B1 extends Bit, B0 extends Bit,
    > = U8.RCA<A15, A14, A13, A12, A11, A10, A9, A8, B15, B14, B13, B12, B11, B10, B9, B8, U8.HALF<A7, A6, A5, A4, A3, A2, A1, A0, B7, B6, B5, B4, B3, B2, B1, B0>>;

    // dprint-ignore
    export type FULL<
        Cin extends Bit,

        A15 extends Bit, A14 extends Bit, A13 extends Bit, A12 extends Bit,
        A11 extends Bit, A10 extends Bit, A9 extends Bit, A8 extends Bit,
        A7 extends Bit, A6 extends Bit, A5 extends Bit, A4 extends Bit,
        A3 extends Bit, A2 extends Bit, A1 extends Bit, A0 extends Bit,

        B15 extends Bit, B14 extends Bit, B13 extends Bit, B12 extends Bit,
        B11 extends Bit, B10 extends Bit, B9 extends Bit, B8 extends Bit,
        B7 extends Bit, B6 extends Bit, B5 extends Bit, B4 extends Bit,
        B3 extends Bit, B2 extends Bit, B1 extends Bit, B0 extends Bit,
    > = U8.RCA<A15, A14, A13, A12, A11, A10, A9, A8, B15, B14, B13, B12, B11, B10, B9, B8, U8.FULL<Cin, A7, A6, A5, A4, A3, A2, A1, A0, B7, B6, B5, B4, B3, B2, B1, B0>>;

    // dprint-ignore
    export type RCA<
        A15 extends Bit, A14 extends Bit, A13 extends Bit, A12 extends Bit, A11 extends Bit, A10 extends Bit, A9 extends Bit, A8 extends Bit,
        A7 extends Bit, A6 extends Bit, A5 extends Bit, A4 extends Bit, A3 extends Bit, A2 extends Bit, A1 extends Bit, A0 extends Bit,

        B15 extends Bit, B14 extends Bit, B13 extends Bit, B12 extends Bit, B11 extends Bit, B10 extends Bit, B9 extends Bit, B8 extends Bit,
        B7 extends Bit, B6 extends Bit, B5 extends Bit, B4 extends Bit, B3 extends Bit, B2 extends Bit, B1 extends Bit, B0 extends Bit,

        Q extends [C: Bit, QS: Bit[]],
    > = RIP<FULL<Q[0], A15, A14, A13, A12, A11, A10, A9, A8, A7, A6, A5, A4, A3, A2, A1, A0, B15, B14, B13, B12, B11, B10, B9, B8, B7, B6, B5, B4, B3, B2, B1, B0>, Q[1]>;

    // dprint-ignore
    export function HALF<
        const A15 extends Bit, const A14 extends Bit, const A13 extends Bit, const A12 extends Bit,
        const A11 extends Bit, const A10 extends Bit, const A9 extends Bit, const A8 extends Bit,
        const A7 extends Bit, const A6 extends Bit, const A5 extends Bit, const A4 extends Bit,
        const A3 extends Bit, const A2 extends Bit, const A1 extends Bit, const A0 extends Bit,

        const B15 extends Bit, const B14 extends Bit, const B13 extends Bit, const B12 extends Bit,
        const B11 extends Bit, const B10 extends Bit, const B9 extends Bit, const B8 extends Bit,
        const B7 extends Bit, const B6 extends Bit, const B5 extends Bit, const B4 extends Bit,
        const B3 extends Bit, const B2 extends Bit, const B1 extends Bit, const B0 extends Bit,
    >(
        a15: A15, a14: A14, a13: A13, a12: A12,
        a11: A11, a10: A10, a9: A9, a8: A8,
        a7: A7, a6: A6, a5: A5, a4: A4,
        a3: A3, a2: A2, a1: A1, a0: A0,

        b15: B15, b14: B14, b13: B13, b12: B12,
        b11: B11, b10: B10, b9: B9, b8: B8,
        b7: B7, b6: B6, b5: B5, b4: B4,
        b3: B3, b2: B2, b1: B1, b0: B0
    ): HALF<A15, A14, A13, A12, A11, A10, A9, A8, A7, A6, A5, A4, A3, A2, A1, A0, B15, B14, B13, B12, B11, B10, B9, B8, B7, B6, B5, B4, B3, B2, B1, B0> {
        return U8.RCA(a15, a14, a13, a12, a11, a10, a9, a8, b15, b14, b13, b12, b11, b10, b9, b8, U8.HALF(a7, a6, a5, a4, a3, a2, a1, a0, b7, b6, b5, b4, b3, b2, b1, b0));
    }

    // dprint-ignore
    export function FULL<
        const Cin extends Bit,

        const A15 extends Bit, const A14 extends Bit, const A13 extends Bit, const A12 extends Bit,
        const A11 extends Bit, const A10 extends Bit, const A9 extends Bit, const A8 extends Bit,
        const A7 extends Bit, const A6 extends Bit, const A5 extends Bit, const A4 extends Bit,
        const A3 extends Bit, const A2 extends Bit, const A1 extends Bit, const A0 extends Bit,

        const B15 extends Bit, const B14 extends Bit, const B13 extends Bit, const B12 extends Bit,
        const B11 extends Bit, const B10 extends Bit, const B9 extends Bit, const B8 extends Bit,
        const B7 extends Bit, const B6 extends Bit, const B5 extends Bit, const B4 extends Bit,
        const B3 extends Bit, const B2 extends Bit, const B1 extends Bit, const B0 extends Bit,
    >(
        cin: Cin,

        a15: A15, a14: A14, a13: A13, a12: A12,
        a11: A11, a10: A10, a9: A9, a8: A8,
        a7: A7, a6: A6, a5: A5, a4: A4,
        a3: A3, a2: A2, a1: A1, a0: A0,

        b15: B15, b14: B14, b13: B13, b12: B12,
        b11: B11, b10: B10, b9: B9, b8: B8,
        b7: B7, b6: B6, b5: B5, b4: B4,
        b3: B3, b2: B2, b1: B1, b0: B0
    ): FULL<Cin, A15, A14, A13, A12, A11, A10, A9, A8, A7, A6, A5, A4, A3, A2, A1, A0, B15, B14, B13, B12, B11, B10, B9, B8, B7, B6, B5, B4, B3, B2, B1, B0> {
        return U8.RCA(a15, a14, a13, a12, a11, a10, a9, a8, b15, b14, b13, b12, b11, b10, b9, b8, U8.FULL(cin, a7, a6, a5, a4, a3, a2, a1, a0, b7, b6, b5, b4, b3, b2, b1, b0));
    }

    // dprint-ignore
    export function RCA<
        const A15 extends Bit, const A14 extends Bit, const A13 extends Bit, const A12 extends Bit,
        const A11 extends Bit, const A10 extends Bit, const A9 extends Bit, const A8 extends Bit,
        const A7 extends Bit, const A6 extends Bit, const A5 extends Bit, const A4 extends Bit,
        const A3 extends Bit, const A2 extends Bit, const A1 extends Bit, const A0 extends Bit,

        const B15 extends Bit, const B14 extends Bit, const B13 extends Bit, const B12 extends Bit,
        const B11 extends Bit, const B10 extends Bit, const B9 extends Bit, const B8 extends Bit,
        const B7 extends Bit, const B6 extends Bit, const B5 extends Bit, const B4 extends Bit,
        const B3 extends Bit, const B2 extends Bit, const B1 extends Bit, const B0 extends Bit,

        const Q extends [C: Bit, QS: Bit[]],
    >(
        a15: A15, a14: A14, a13: A13, a12: A12,
        a11: A11, a10: A10, a9: A9, a8: A8,
        a7: A7, a6: A6, a5: A5, a4: A4,
        a3: A3, a2: A2, a1: A1, a0: A0,

        b15: B15, b14: B14, b13: B13, b12: B12,
        b11: B11, b10: B10, b9: B9, b8: B8,
        b7: B7, b6: B6, b5: B5, b4: B4,
        b3: B3, b2: B2, b1: B1, b0: B0,

        q: Q
    ): RCA<A15, A14, A13, A12, A11, A10, A9, A8, A7, A6, A5, A4, A3, A2, A1, A0, B15, B14, B13, B12, B11, B10, B9, B8, B7, B6, B5, B4, B3, B2, B1, B0, Q> {
        const [c, qs]: [Q[0], Q[1]] = q;
        return RIP(FULL(c, a15, a14, a13, a12, a11, a10, a9, a8, a7, a6, a5, a4, a3, a2, a1, a0, b15, b14, b13, b12, b11, b10, b9, b8, b7, b6, b5, b4, b3, b2, b1, b0), qs);
    }
}
