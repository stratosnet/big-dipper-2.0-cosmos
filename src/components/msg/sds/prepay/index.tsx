import React from 'react';
import Trans from 'next-translate/Trans';
import {
    formatToken, formatNumber,
  } from '@utils/format_token';
  import useTranslation from 'next-translate/useTranslation';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgPrepay } from '@models';
import { useProfileRecoil } from '@recoil/profiles';

const Prepay = (props: {
  message: MsgPrepay;
}) => {
  const { t } = useTranslation('transactions');
  const { message } = props;

  const senderAddress = useProfileRecoil(message.sender);
  const senderAddressMoniker = senderAddress ? senderAddress?.name : message.sender;

  const beneficiaryAddress = useProfileRecoil(message.beneficiary);
  const beneficiaryAddressMoniker = beneficiaryAddress ? beneficiaryAddress?.name : message.beneficiary;

  const parsedAmount = message?.amount?.map((x) => {
    const amount = formatToken(x.amount, x.denom);
    return `${formatNumber(amount.value, amount.exponent)} ${amount.displayDenom.toUpperCase()}`;
  }).reduce((text, value, i, array) => text + (i < array.length - 1 ? ', ' : ` ${t('and')} `) + value);

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txPrepayContent"
        components={[
          (
            <Name
              address={message.sender}
              name={senderAddressMoniker}
            />
          ),
          (
            <Name
              address={message.beneficiary}
              name={beneficiaryAddressMoniker}
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

export default Prepay;
