export type Voltage = Voltage.Low | Voltage.High;

export namespace Voltage
{
    export const Low = 0;
    export type Low = typeof Low;

    export const High = 1;
    export type High = typeof High;

    export function isLow(voltage: Voltage): voltage is Low {
        return voltage === Low;
    }

    export function isHigh(voltage: Voltage): voltage is High {
        return voltage === High;
    }
}
