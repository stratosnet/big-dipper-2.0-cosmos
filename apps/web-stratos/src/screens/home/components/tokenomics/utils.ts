import { BigNumberish } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';

export function prettyFormat(value: BigNumberish, unitName?: number, points = 8): number {
  return +(+formatUnits(value, unitName)).toFixed(points);
}
