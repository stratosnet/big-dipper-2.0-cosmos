import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';

import { getMetrics } from '@/screens/home/components/tokenomics/queries';
import { bigToNativeDecimals } from '@/screens/home/components/tokenomics/utils';

type MetricsData = {
  total_supply: string;
  total_mining_supply: string;
  total_mined_tokens: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  try {
    const result: MetricsData = await getMetrics();
    const total_supply = ethers.utils.parseUnits(result.total_supply, 'wei');
    const to_be_mined = ethers.utils
      .parseUnits(result.total_mining_supply, 'wei')
      .sub(ethers.utils.parseUnits(result.total_mined_tokens, 'wei'));
    res.status(200).send(bigToNativeDecimals(total_supply.sub(to_be_mined).toString()));
  } catch (err) {
    res.status(400).json({ error: 'failed to load data' });
  }
}
