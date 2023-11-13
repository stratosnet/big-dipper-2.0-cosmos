import React from 'react';
import Typography from '@mui/material/Typography';
import chainConfig from '@/chainConfig';
import AppTrans from '@/components/AppTrans';

import { getContractAddress } from '@ethersproject/address';

import { MsgEthereumTx } from '@/models';
import { formatToken, formatNumber } from '@/utils/format_token';

const { externalExplorers } = chainConfig();

const getExternalExplorerLink = (explName: string, route: string, value: string): string => {
  const url = externalExplorers?.[explName];
  if (!url) return '#';
  return `${url}/${route}/${value}`;
};

const ExtLink: React.FC<{
  address: string;
  name?: string;
  explorer?: string;
}> = ({ address, name, explorer = 'blockscout' }) => {
  const repr = name || address;

  return (
    <Typography
      component="a"
      target="_blank"
      href={getExternalExplorerLink(explorer, 'address', address)}
      rel="noopener noreferrer"
    >
      {repr}
    </Typography>
  );
};

const EthereumTx = (props: { message: MsgEthereumTx }) => {
  const { message } = props;

  const tx = message.asEthereumTx();

  // big dipper staff for pretty
  const amount = formatToken(tx.value?.toString(), 'wei');
  const parsedAmount = `${formatNumber(
    amount.value,
    amount.exponent
  )} ${amount.displayDenom.toUpperCase()}`;

  const senderAddress = message.getSender();

  if (tx.to !== null) {
    // smart contract function execution
    if (tx.data !== null) {
      return (
        <Typography>
          <AppTrans
            i18nKey="message_contents:txEvmExecuteContent"
            components={[
              <ExtLink
                address={senderAddress}
                name={MsgEthereumTx.getBech32Address(senderAddress)}
              />,
              <b />,
              <ExtLink address={tx.to} name={MsgEthereumTx.getBech32Address(tx.to)} />,
            ]}
            values={{
              amount: parsedAmount,
            }}
          />
        </Typography>
      );
    }
    // transfer
    return (
      <Typography>
        <AppTrans
          i18nKey="message_contents:txEvmSendContent"
          components={[
            <ExtLink
              address={senderAddress}
              name={MsgEthereumTx.getBech32Address(senderAddress)}
            />,
            <b />,
            <ExtLink address={tx.to} name={MsgEthereumTx.getBech32Address(tx.to)} />,
          ]}
          values={{
            amount: parsedAmount,
          }}
        />
      </Typography>
    );
  }

  const smartContractAddress = getContractAddress({
    from: senderAddress,
    nonce: tx.nonce,
  });

  return (
    <Typography>
      <AppTrans
        i18nKey="message_contents:txEvmCreateContent"
        components={[
          <ExtLink address={senderAddress} name={MsgEthereumTx.getBech32Address(senderAddress)} />,
          <b />,
          <ExtLink
            address={smartContractAddress}
            name={MsgEthereumTx.getBech32Address(smartContractAddress)}
          />,
        ]}
        values={{
          amount: parsedAmount,
        }}
      />
    </Typography>
  );
};

export default EthereumTx;
