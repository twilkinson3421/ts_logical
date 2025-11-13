import type * as Bin from "./binary.ts";
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

export namespace Bits1
{
    export type HALF<
        A extends Bit,
        B extends Bit,
    > = [
        AND<A, B>,
        [XOR<A, B>],
    ];

    export type FULL<
        Cin extends Bit,
        A extends Bit,
        B extends Bit,
    > = [
        OR<AND<Cin, XOR<A, B>>, AND<A, B>>,
        [XOR<XOR<A, B>, Cin>],
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

export namespace Bits2
{
    export type HALF<
        A extends Bin.Bits2,
        B extends Bin.Bits2,
    > = Bits1.RCA<A[0], B[0], Bits1.HALF<A[1], B[1]>>;

    export type FULL<
        Cin extends Bit,
        A extends Bin.Bits2,
        B extends Bin.Bits2,
    > = Bits1.RCA<A[0], B[0], Bits1.FULL<Cin, A[1], B[1]>>;

    export type RCA<
        A extends Bin.Bits2,
        B extends Bin.Bits2,
        Q extends [C: Bit, QS: Bit[]],
    > = RIP<FULL<Q[0], A, B>, Q[1]>;

    export function HALF<
        const A extends Bin.Bits2,
        const B extends Bin.Bits2,
    >(a: A, b: B): HALF<A, B> {
        const [a0, a1]: [A[0], A[1]] = a;
        const [b0, b1]: [B[0], B[1]] = b;
        return Bits1.RCA(a0, b0, Bits1.HALF(a1, b1));
    }

    export function FULL<
        const Cin extends Bit,
        const A extends Bin.Bits2,
        const B extends Bin.Bits2,
    >(cin: Cin, a: A, b: B): FULL<Cin, A, B> {
        const [a0, a1]: [A[0], A[1]] = a;
        const [b0, b1]: [B[0], B[1]] = b;
        return Bits1.RCA(a0, b0, Bits1.FULL(cin, a1, b1));
    }

    export function RCA<
        const A extends Bin.Bits2,
        const B extends Bin.Bits2,
        const Q extends [C: Bit, QS: Bit[]],
    >(a: A, b: B, q: Q): RCA<A, B, Q> {
        const [c, qs]: [Q[0], Q[1]] = q;
        return RIP(FULL(c, a, b), qs);
    }
}

export namespace Bits4
{
    export type HALF<
        A extends Bin.Bits4,
        B extends Bin.Bits4,
    > = Bits2.RCA<[A[0], A[1]], [B[0], B[1]], Bits2.HALF<[A[2], A[3]], [B[2], B[3]]>>;

    export type FULL<
        Cin extends Bit,
        A extends Bin.Bits4,
        B extends Bin.Bits4,
    > = Bits2.RCA<[A[0], A[1]], [B[0], B[1]], Bits2.FULL<Cin, [A[2], A[3]], [B[2], B[3]]>>;

    export type RCA<
        A extends Bin.Bits4,
        B extends Bin.Bits4,
        Q extends [C: Bit, QS: Bit[]],
    > = RIP<FULL<Q[0], A, B>, Q[1]>;

    export function HALF<
        const A extends Bin.Bits4,
        const B extends Bin.Bits4,
    >(a: A, b: B): HALF<A, B> {
        const [a0, a1, a2, a3]: [A[0], A[1], A[2], A[3]] = a;
        const [b0, b1, b2, b3]: [B[0], B[1], B[2], B[3]] = b;
        return Bits2.RCA([a0, a1], [b0, b1], Bits2.HALF([a2, a3], [b2, b3]));
    }

    export function FULL<
        const Cin extends Bit,
        const A extends Bin.Bits4,
        const B extends Bin.Bits4,
    >(cin: Cin, a: A, b: B): FULL<Cin, A, B> {
        const [a0, a1, a2, a3]: [A[0], A[1], A[2], A[3]] = a;
        const [b0, b1, b2, b3]: [B[0], B[1], B[2], B[3]] = b;
        return Bits2.RCA([a0, a1], [b0, b1], Bits2.FULL(cin, [a2, a3], [b2, b3]));
    }

    export function RCA<
        const A extends Bin.Bits4,
        const B extends Bin.Bits4,
        const Q extends [C: Bit, QS: Bit[]],
    >(a: A, b: B, q: Q): RCA<A, B, Q> {
        const [c, qs]: [Q[0], Q[1]] = q;
        return RIP(FULL(c, a, b), qs);
    }
}

export namespace Bits8
{
    export type HALF<
        A extends Bin.Bits8,
        B extends Bin.Bits8,
    > = Bits4.RCA<
        [A[0], A[1], A[2], A[3]],
        [B[0], B[1], B[2], B[3]],
        Bits4.HALF<
            [A[4], A[5], A[6], A[7]],
            [B[4], B[5], B[6], B[7]]
        >
    >;

    export type FULL<
        Cin extends Bit,
        A extends Bin.Bits8,
        B extends Bin.Bits8,
    > = Bits4.RCA<
        [A[0], A[1], A[2], A[3]],
        [B[0], B[1], B[2], B[3]],
        Bits4.FULL<
            Cin,
            [A[4], A[5], A[6], A[7]],
            [B[4], B[5], B[6], B[7]]
        >
    >;

    export type RCA<
        A extends Bin.Bits8,
        B extends Bin.Bits8,
        Q extends [C: Bit, QS: Bit[]],
    > = RIP<FULL<Q[0], A, B>, Q[1]>;

    export function HALF<
        const A extends Bin.Bits8,
        const B extends Bin.Bits8,
    >(a: A, b: B): HALF<A, B> {
        const [a0, a1, a2, a3, a4, a5, a6, a7]: [A[0], A[1], A[2], A[3], A[4], A[5], A[6], A[7]] = a;
        const [b0, b1, b2, b3, b4, b5, b6, b7]: [B[0], B[1], B[2], B[3], B[4], B[5], B[6], B[7]] = b;
        return Bits4.RCA([a0, a1, a2, a3], [b0, b1, b2, b3], Bits4.HALF([a4, a5, a6, a7], [b4, b5, b6, b7]));
    }

    export function FULL<
        const Cin extends Bit,
        const A extends Bin.Bits8,
        const B extends Bin.Bits8,
    >(cin: Cin, a: A, b: B): FULL<Cin, A, B> {
        const [a0, a1, a2, a3, a4, a5, a6, a7]: [A[0], A[1], A[2], A[3], A[4], A[5], A[6], A[7]] = a;
        const [b0, b1, b2, b3, b4, b5, b6, b7]: [B[0], B[1], B[2], B[3], B[4], B[5], B[6], B[7]] = b;
        return Bits4.RCA([a0, a1, a2, a3], [b0, b1, b2, b3], Bits4.FULL(cin, [a4, a5, a6, a7], [b4, b5, b6, b7]));
    }

    export function RCA<
        const A extends Bin.Bits8,
        const B extends Bin.Bits8,
        const Q extends [C: Bit, QS: Bit[]],
    >(a: A, b: B, q: Q): RCA<A, B, Q> {
        const [c, qs]: [Q[0], Q[1]] = q;
        return RIP(FULL(c, a, b), qs);
    }
}

export namespace Bits16
{
    export type HALF<
        A extends Bin.Bits16,
        B extends Bin.Bits16,
    > = Bits8.RCA<
        [A[0], A[1], A[2], A[3], A[4], A[5], A[6], A[7]],
        [B[0], B[1], B[2], B[3], B[4], B[5], B[6], B[7]],
        Bits8.HALF<
            [A[8], A[9], A[10], A[11], A[12], A[13], A[14], A[15]],
            [B[8], B[9], B[10], B[11], B[12], B[13], B[14], B[15]]
        >
    >;

    export type FULL<
        Cin extends Bit,
        A extends Bin.Bits16,
        B extends Bin.Bits16,
    > = Bits8.RCA<
        [A[0], A[1], A[2], A[3], A[4], A[5], A[6], A[7]],
        [B[0], B[1], B[2], B[3], B[4], B[5], B[6], B[7]],
        Bits8.FULL<
            Cin,
            [A[8], A[9], A[10], A[11], A[12], A[13], A[14], A[15]],
            [B[8], B[9], B[10], B[11], B[12], B[13], B[14], B[15]]
        >
    >;

    export type RCA<
        A extends Bin.Bits16,
        B extends Bin.Bits16,
        Q extends [C: Bit, QS: Bit[]],
    > = RIP<FULL<Q[0], A, B>, Q[1]>;

    export function HALF<
        const A extends Bin.Bits16,
        const B extends Bin.Bits16,
    >(a: A, b: B): HALF<A, B> {
        const [a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15]: [A[0], A[1], A[2], A[3], A[4],
            A[5], A[6], A[7], A[8], A[9], A[10], A[11], A[12], A[13], A[14], A[15]] = a;
        const [b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15]: [B[0], B[1], B[2], B[3], B[4],
            B[5], B[6], B[7], B[8], B[9], B[10], B[11], B[12], B[13], B[14], B[15]] = b;
        return Bits8.RCA([a0, a1, a2, a3, a4, a5, a6, a7], [b0, b1, b2, b3, b4, b5, b6, b7],
            Bits8.HALF([a8, a9, a10, a11, a12, a13, a14, a15], [b8, b9, b10, b11, b12, b13, b14, b15]));
    }

    export function FULL<
        const Cin extends Bit,
        const A extends Bin.Bits16,
        const B extends Bin.Bits16,
    >(cin: Cin, a: A, b: B): FULL<Cin, A, B> {
        const [a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15]: [A[0], A[1], A[2], A[3], A[4],
            A[5], A[6], A[7], A[8], A[9], A[10], A[11], A[12], A[13], A[14], A[15]] = a;
        const [b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15]: [B[0], B[1], B[2], B[3], B[4],
            B[5], B[6], B[7], B[8], B[9], B[10], B[11], B[12], B[13], B[14], B[15]] = b;
        return Bits8.RCA([a0, a1, a2, a3, a4, a5, a6, a7], [b0, b1, b2, b3, b4, b5, b6, b7],
            Bits8.FULL(cin, [a8, a9, a10, a11, a12, a13, a14, a15], [b8, b9, b10, b11, b12, b13, b14, b15]));
    }

    export function RCA<
        const A extends Bin.Bits16,
        const B extends Bin.Bits16,
        const Q extends [C: Bit, QS: Bit[]],
    >(a: A, b: B, q: Q): RCA<A, B, Q> {
        const [c, qs]: [Q[0], Q[1]] = q;
        return RIP(FULL(c, a, b), qs);
    }
}
