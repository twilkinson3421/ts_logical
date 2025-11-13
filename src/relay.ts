import { Voltage } from "./voltage.ts";

export type NO<
    TInputVoltage extends Voltage,
    TCoilVoltage extends Voltage,
> = TCoilVoltage extends Voltage.High ? TInputVoltage : Voltage.Low;

export function NO<
    const TInputVoltage extends Voltage,
    const TCoilVoltage extends Voltage,
>(
    inputVoltage: TInputVoltage,
    coilVoltage: TCoilVoltage,
): NO<TInputVoltage, TCoilVoltage> {
    return (Voltage.isHigh(coilVoltage) ? inputVoltage : Voltage.Low) as NO<TInputVoltage, TCoilVoltage>;
}

export type NC<
    TInputVoltage extends Voltage,
    TCoilVoltage extends Voltage,
> = TCoilVoltage extends Voltage.Low ? TInputVoltage : Voltage.Low;

export function NC<
    const TInputVoltage extends Voltage,
    const TCoilVoltage extends Voltage,
>(
    inputVoltage: TInputVoltage,
    coilVoltage: TCoilVoltage,
): NC<TInputVoltage, TCoilVoltage> {
    return (Voltage.isLow(coilVoltage) ? inputVoltage : Voltage.Low) as NC<TInputVoltage, TCoilVoltage>;
}
