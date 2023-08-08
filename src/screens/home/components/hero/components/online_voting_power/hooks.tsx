import { useState } from 'react';
import numeral from 'numeral';
import Big from 'big.js';
import * as R from 'ramda';
import {
  useOnlineVotingPowerQuery,
  OnlineVotingPowerQuery,
} from '@graphql/types';
import { chainConfig } from '@configs';
import { formatToken } from '@utils/format_token';

const initialState: {
  votingPower: number;
  totalVotingPower: number;
  activeValidators: number;
} = {
  votingPower: 0,
  totalVotingPower: 0,
  activeValidators: 0,
};

export const useOnlineVotingPower = () => {
  const [state, setState] = useState(initialState);

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  useOnlineVotingPowerQuery({
    onCompleted: (data) => {
      handleSetState(formatOnlineVotingPower(data));
    },
  });

  const formatOnlineVotingPower = (data: OnlineVotingPowerQuery) => {
    const votingPowerReducted = data?.validatorVotingPowerAggregate?.aggregate?.sum?.votingPower ?? 0;
    const bonded = data?.stakingPool?.[0]?.bonded ?? 0;
    const activeValidators = data?.activeTotal?.aggregate?.count ?? 0;

    const powerReduction = chainConfig?.powerReduction ?? 1;
    const votingPower = Big(votingPowerReducted).mul(powerReduction).toNumber()

    return {
      activeValidators,
      votingPower:numeral(
        formatToken(votingPower, chainConfig.votingPowerTokenUnit).value,
      ).value(),
      totalVotingPower: numeral(
        formatToken(bonded, chainConfig.votingPowerTokenUnit).value,
      ).value(),
    };
  };

  return {
    state,
  };
};
