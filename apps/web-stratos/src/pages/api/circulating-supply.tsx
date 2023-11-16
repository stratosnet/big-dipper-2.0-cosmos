import { getMetrics } from '@/screens/home/components/tokenomics/queries';
import { bigToNativeDecimals } from '@/screens/home/components/tokenomics/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

type MetricsData = {
  circulation_supply: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  try {
    const result: MetricsData = await getMetrics();
    res.status(200).send(bigToNativeDecimals(result.circulation_supply));
  } catch (err) {
    res.status(400).json({ error: 'failed to load data' });
  }
}
