import numeral from 'numeral';
import chainConfig from '@/chainConfig';
import { type AtomState } from '@/recoil/market';
import { formatNumber } from '@/utils/format_token';
import { useTokenomics } from '@/screens/home/components/tokenomics/hooks';
import { prettyFormat } from '@/screens/home/components/tokenomics/utils';

const { primaryTokenUnit, tokenUnits } = chainConfig();

export const useFormatMarket = (data: AtomState) => {
  const { data: tokenomics } = useTokenomics();
  const exludedItems = [null, 0];
  const marketCap = exludedItems.includes(data.marketCap)
    ? 'N/A'
    : `$${formatNumber(data.marketCap?.toString() ?? '', 2)}`;

  const miningReward = tokenomics?.miningReward
    ? `${prettyFormat(tokenomics?.miningReward, 18, 0)} ${tokenUnits[
        primaryTokenUnit
      ].display.toUpperCase()}/epoch`
    : 'N/A';

  const apr =
    tokenomics?.miningReward && tokenomics?.bonded
      ? `${prettyFormat(
          tokenomics?.miningReward
            .mul(6 * 24 * 365)
            .mul(1_000_000)
            .div(tokenomics?.bonded),
          4,
          2
        )}%`
      : 'N/A';

  return [
    {
      key: 'marketCap',
      data: marketCap,
    },
    {
      key: 'miningReward',
      data: miningReward,
    },
    {
      key: 'apr',
      data: apr,
    },
    {
      key: 'supply',
      data: `${formatNumber(data.supply.value, 2)} ${data.supply.displayDenom.toUpperCase()}`,
    },
    {
      key: 'communityPool',
      data: `${numeral(data.communityPool.value).format(
        '0,0.00'
      )} ${data.communityPool.displayDenom.toUpperCase()}`,
    },
  ];
};
