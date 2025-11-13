import { Voltage } from "./voltage.ts";

export type NO<
    TInputVoltage extends Voltage,
    TCoilVoltage extends Voltage,
> = TCoilVoltage extends Voltage.H ? TInputVoltage : Voltage.L;

export function NO<
    const TInputVoltage extends Voltage,
    const TCoilVoltage extends Voltage,
>(
    inputVoltage: TInputVoltage,
    coilVoltage: TCoilVoltage,
): NO<TInputVoltage, TCoilVoltage> {
    return (Voltage.isHigh(coilVoltage) ? inputVoltage : Voltage.L) as NO<TInputVoltage, TCoilVoltage>;
}

export type NC<
    TInputVoltage extends Voltage,
    TCoilVoltage extends Voltage,
> = TCoilVoltage extends Voltage.L ? TInputVoltage : Voltage.L;

export function NC<
    const TInputVoltage extends Voltage,
    const TCoilVoltage extends Voltage,
>(
    inputVoltage: TInputVoltage,
    coilVoltage: TCoilVoltage,
): NC<TInputVoltage, TCoilVoltage> {
    return (Voltage.isLow(coilVoltage) ? inputVoltage : Voltage.L) as NC<TInputVoltage, TCoilVoltage>;
}
