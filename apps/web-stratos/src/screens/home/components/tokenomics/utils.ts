import { BigNumberish, FixedNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';

export function prettyFormat(value: BigNumberish, unitName?: number, points = 8): number {
  return +(+formatUnits(value, unitName)).toFixed(points);
}

export const bigToNativeDecimals = (bn: string, decimals?: number): string =>
  FixedNumber.fromString(bn)
    .divUnsafe(FixedNumber.from((10 ** (decimals || 18)).toString()))
    .toString();
