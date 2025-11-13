import { Constant } from "./gates.ts";

export type Bit = Constant._0 | Constant._1;

export namespace Bit
{
    export type _0 = Constant._0;
    export type _1 = Constant._1;

    export function _0(): _0 {
        return Constant._0();
    }

    export function _1(): _1 {
        return Constant._1();
    }
}

export type Bits1 = [Bit];

export type Bits2 = [Bit, Bit];

export type Bits4 = [Bit, Bit, Bit, Bit];

export namespace Bits4.Constant
{
    export type ZERO = [Bit._0, Bit._0, Bit._0, Bit._0];
    export type ONE = [Bit._0, Bit._0, Bit._0, Bit._1];

    export function ZERO(): ZERO {
        return [Bit._0(), Bit._0(), Bit._0(), Bit._0()];
    }

    export function ONE(): ONE {
        return [Bit._0(), Bit._0(), Bit._0(), Bit._1()];
    }
}

export type Bits8 = [...Bits4, ...Bits4];

export namespace Bits8.Constant
{
    export type ZERO = [...Bits4.Constant.ZERO, ...Bits4.Constant.ZERO];
    export type ONE = [...Bits4.Constant.ZERO, ...Bits4.Constant.ONE];

    export function ZERO(): ZERO {
        return [...Bits4.Constant.ZERO(), ...Bits4.Constant.ZERO()];
    }

    export function ONE(): ONE {
        return [...Bits4.Constant.ZERO(), ...Bits4.Constant.ONE()];
    }
}

export type Bits16 = [...Bits8, ...Bits8];

export namespace Bits16.Constant
{
    export type ZERO = [...Bits8.Constant.ZERO, ...Bits8.Constant.ZERO];
    export type ONE = [...Bits8.Constant.ZERO, ...Bits8.Constant.ONE];

    export function ZERO(): ZERO {
        return [...Bits8.Constant.ZERO(), ...Bits8.Constant.ZERO()];
    }

    export function ONE(): ONE {
        return [...Bits8.Constant.ZERO(), ...Bits8.Constant.ONE()];
    }
}
