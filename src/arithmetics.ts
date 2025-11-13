import { AND, OR, XOR } from "./logic_gates.ts";
import type { Voltage } from "./voltage.ts";

export namespace Binary
{
    export type b2 = [n1: Voltage, n0: Voltage];

    export namespace b2
    {
        export const n0 = 1;
        export const n1 = 0;

        export type n0 = typeof n0;
        export type n1 = typeof n1;
    }

    export type b3 = [n2: Voltage, n1: Voltage, n0: Voltage];

    export namespace b3
    {
        export const n0 = 2;
        export const n1 = 1;
        export const n2 = 0;

        export type n0 = typeof n0;
        export type n1 = typeof n1;
        export type n2 = typeof n2;
    }

    export type b4 = [n3: Voltage, n2: Voltage, n1: Voltage, n0: Voltage];

    export namespace b4
    {
        export const n0 = 3;
        export const n1 = 2;
        export const n2 = 1;
        export const n3 = 0;

        export type n0 = typeof n0;
        export type n1 = typeof n1;
        export type n2 = typeof n2;
        export type n3 = typeof n3;
    }
}

export namespace Adder
{
    export type Half<
        A extends Voltage,
        B extends Voltage,
    > = [
        C: AND<A, B>,
        S: XOR<A, B>,
    ];

    export function Half<
        const A extends Voltage,
        const B extends Voltage,
    >(a: A, b: B): Half<A, B> {
        return [
            AND(a, b),
            XOR(a, b),
        ];
    }

    export type Full<
        Cin extends Voltage,
        A extends Voltage,
        B extends Voltage,
    > = [
        Cout: OR<AND<Cin, XOR<A, B>>, AND<A, B>>,
        S: XOR<XOR<A, B>, Cin>,
    ];

    export function Full<
        const Cin extends Voltage,
        const A extends Voltage,
        const B extends Voltage,
    >(cIn: Cin, a: A, b: B): Full<Cin, A, B> {
        return [
            OR(AND(cIn, XOR(a, b)), AND(a, b)),
            XOR(XOR(a, b), cIn),
        ];
    }

    export type Bits2<
        Cin extends Voltage,
        A extends Binary.b2,
        B extends Binary.b2,
    > = Adder.Full<Cin, A[Binary.b2.n0], B[Binary.b2.n0]> extends (infer Y0 extends Binary.b2)
        ? Adder.Full<Y0[0], A[Binary.b2.n1], B[Binary.b2.n1]> extends (infer Y1 extends Binary.b2)
            ? [Cout: Y1[0], n1: Y1[Binary.b2.n0], n0: Y0[Binary.b2.n0]]
        : never
        : never;

    export function Bits2<
        const Cin extends Voltage,
        const A extends Binary.b2,
        const B extends Binary.b2,
    >(cIn: Cin, a: A, b: B): Bits2<Cin, A, B> {
        const y0 = Adder.Full(cIn, a[Binary.b2.n0], b[Binary.b2.n0]);
        const y1 = Adder.Full(y0[Binary.b2.n1], a[Binary.b2.n1], b[Binary.b2.n1]);
        return [y1[0], y1[Binary.b2.n0], y0[Binary.b2.n0]] as Bits2<Cin, A, B>;
    }

    export type Bits4<
        Cin extends Voltage,
        A extends Binary.b4,
        B extends Binary.b4,
    > = Adder.Bits2<
        Cin,
        [A[Binary.b4.n1], A[Binary.b4.n0]],
        [B[Binary.b4.n1], B[Binary.b4.n0]]
    > extends (infer Y0 extends Binary.b3) ? Adder.Bits2<
            Y0[Binary.b3.n2],
            [A[Binary.b4.n3], A[Binary.b4.n2]],
            [B[Binary.b4.n3], B[Binary.b4.n2]]
        > extends (infer Y1 extends Binary.b3) ? [
                Cout: Y1[0],
                n3: Y1[Binary.b3.n1],
                n2: Y1[Binary.b3.n0],
                n1: Y0[Binary.b3.n1],
                n0: Y0[Binary.b3.n0],
            ]
        : never
        : never;

    export function Bits4<
        const Cin extends Voltage,
        const A extends Binary.b4,
        const B extends Binary.b4,
    >(cIn: Cin, a: A, b: B): Bits4<Cin, A, B> {
        const y0 = Adder.Bits2(
            cIn,
            [a[Binary.b4.n1], a[Binary.b4.n0]],
            [b[Binary.b4.n1], b[Binary.b4.n0]],
        );
        const y1 = Adder.Bits2(
            y0[Binary.b3.n2],
            [a[Binary.b4.n3], a[Binary.b4.n2]],
            [b[Binary.b4.n3], b[Binary.b4.n2]],
        );
        return [y1[0], y1[Binary.b3.n1], y1[Binary.b3.n0], y0[Binary.b3.n1], y0[Binary.b3.n0]] as Bits4<Cin, A, B>;
    }
}
