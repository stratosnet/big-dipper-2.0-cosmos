import React from 'react';
import Trans from 'next-translate/Trans';
import {
  formatToken, formatNumber,
} from '@utils/format_token';
import useTranslation from 'next-translate/useTranslation';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgWithdraw } from '@models';
import {
  useProfileRecoil,
} from '@recoil/profiles';

const Withdraw = (props: {
  message: MsgWithdraw;
}) => {
  const { t } = useTranslation('transactions');
  const { message } = props;

  const parsedAmount = message?.amount?.map((x) => {
    const amount = formatToken(x.amount, x.denom);
    return `${formatNumber(amount.value, amount.exponent)} ${amount.displayDenom.toUpperCase()}`;
  }).reduce((text, value, i, array) => text + (i < array.length - 1 ? ', ' : ` ${t('and')} `) + value);

  const walletAddress = useProfileRecoil(message.walletAddress);
  const walletAddressMoniker = walletAddress ? walletAddress?.name : message.walletAddress;

  const targetAddress = useProfileRecoil(message.targetAddress);
  const targetAddressMoniker = targetAddress ? targetAddress?.name : message.targetAddress;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txWithdrawContent"
        components={[
          (
            <Name
              address={message.walletAddress}
              name={walletAddressMoniker}
            />
          ),
          (
            <Name
              address={message.targetAddress}
              name={targetAddressMoniker}
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

export default Withdraw;
