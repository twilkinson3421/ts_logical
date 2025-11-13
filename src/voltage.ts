export type Voltage = Voltage.L | Voltage.H;

export namespace Voltage
{
    export type L = 0;
    export type H = 1;

    export const L: L = 0;
    export const H: H = 1;

    export function isLow(voltage: Voltage): voltage is L {
        return voltage === Voltage.L;
    }

    export function isHigh(voltage: Voltage): voltage is H {
        return voltage === Voltage.H;
    }
}

export type MasterVoltage = Voltage.H;

export function MasterVoltage(): MasterVoltage {
    return Voltage.H;
}
