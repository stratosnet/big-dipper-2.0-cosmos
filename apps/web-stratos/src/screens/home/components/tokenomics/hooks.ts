import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { getMetrics } from './queries';

type TokenomicsState = {
  total: ethers.BigNumber;
  bonded: ethers.BigNumber;
  unbonded: ethers.BigNumber;
  unbonding: ethers.BigNumber;
  totalMiningSupply: ethers.BigNumber;
  totalMinedTokens: ethers.BigNumber;
  toBeMined: ethers.BigNumber;
  circulationSupply: ethers.BigNumber;
  miningReward: ethers.BigNumber;
  resourceNodesDeposit: ethers.BigNumber;
};

export const useTokenomics = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['metrics'],
    queryFn: getMetrics,
  });

  const tokenomics = useMemo((): TokenomicsState | undefined => {
    if (!data) return undefined;

    const metrics = {
      total: ethers.utils.parseUnits(data.total_supply, 'wei'),
      bonded: ethers.utils.parseUnits(data.total_bonded_delegation, 'wei'),
      unbonded: ethers.utils.parseUnits(data.total_unbonded_delegation, 'wei'),
      unbonding: ethers.utils.parseUnits(data.total_unbonding_delegation, 'wei'),
      totalMiningSupply: ethers.utils.parseUnits(data.total_mining_supply, 'wei'),
      totalMinedTokens: ethers.utils.parseUnits(data.total_mined_tokens, 'wei'),
      toBeMined: ethers.utils.parseUnits('0', 'wei'),
      circulationSupply: ethers.utils.parseUnits(data.circulation_supply, 'wei'),
      miningReward: ethers.utils.parseUnits(data.chain_mining_reward, 'wei'),
      resourceNodesDeposit: ethers.utils.parseUnits(data.total_resource_nodes_deposit, 'wei'),
    } as TokenomicsState;
    metrics.toBeMined = metrics.totalMiningSupply.sub(metrics.totalMinedTokens);
    return metrics;
  }, [data]);

  return {
    data: tokenomics,
    isLoading,
    error,
  };
};
