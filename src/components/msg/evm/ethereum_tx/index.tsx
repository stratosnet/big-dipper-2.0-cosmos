import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';

import {
  getContractAddress,
} from '@ethersproject/address';

import { ExtLink } from '@components';
import { MsgEthereumTx } from '@models';
import {
  formatToken, formatNumber,
} from '@utils/format_token';

const EthereumTx = (props: {
  message: MsgEthereumTx;
}) => {
  const { message } = props;

  const tx = message.asEthereumTx();

  // big dipper staff for pretty
  const amount = formatToken(tx.value?.toString(), 'wei');
  const parsedAmount = `${formatNumber(amount.value, amount.exponent)} ${amount.displayDenom.toUpperCase()}`;

  const senderAddress = message.getSender();

  if (tx.to !== null) {
    // smart contract function execution
    if (tx.data !== null) {
      return (
        <Typography>
          <Trans
            i18nKey="message_contents:txEvmExecuteContent"
            components={[
              (
                <ExtLink
                  address={senderAddress}
                  name={MsgEthereumTx.getBech32Address(senderAddress)}
                />
              ),
              <b />,
              (
                <ExtLink
                  address={tx.to}
                  name={MsgEthereumTx.getBech32Address(tx.to)}
                />
              ),
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
        <Trans
          i18nKey="message_contents:txEvmSendContent"
          components={[
            (
              <ExtLink
                address={senderAddress}
                name={MsgEthereumTx.getBech32Address(senderAddress)}
              />
            ),
            <b />,
            (
              <ExtLink
                address={tx.to}
                name={MsgEthereumTx.getBech32Address(tx.to)}
              />
            ),
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
      <Trans
        i18nKey="message_contents:txEvmCreateContent"
        components={[
          (
            <ExtLink
              address={senderAddress}
              name={MsgEthereumTx.getBech32Address(senderAddress)}
            />
          ),
          <b />,
          (
            <ExtLink
              address={smartContractAddress}
              name={MsgEthereumTx.getBech32Address(smartContractAddress)}
            />
          ),
        ]}
        values={{
          amount: parsedAmount,
        }}
      />
    </Typography>
  );
};

export default EthereumTx;
