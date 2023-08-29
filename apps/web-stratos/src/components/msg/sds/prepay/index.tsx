import { FC } from 'react';
import AppTrans from '@/components/AppTrans';
import { formatToken, formatNumber } from '@/utils/format_token';
import useAppTranslation from '@/hooks/useAppTranslation';
import Typography from '@mui/material/Typography';
import Name from '@/components/name';
import MsgPrepay from '@/models/msg/sds/msg_prepay';
import { useProfileRecoil } from '@/recoil/profiles/hooks';

const Prepay: FC<{ message: MsgPrepay }> = (props) => {
  const { t } = useAppTranslation('transactions');
  const { message } = props;

  const senderAddress = useProfileRecoil(message.sender);
  const senderAddressMoniker = senderAddress ? senderAddress?.name : message.sender;

  const beneficiaryAddress = useProfileRecoil(message.beneficiary);
  const beneficiaryAddressMoniker = beneficiaryAddress
    ? beneficiaryAddress?.name
    : message.beneficiary;

  const parsedAmount = message?.amount
    ?.map((x) => {
      const amount = formatToken(x.amount, x.denom);
      return `${formatNumber(amount.value, amount.exponent)} ${amount.displayDenom.toUpperCase()}`;
    })
    .reduce(
      (text, value, i, array) => text + (i < array.length - 1 ? ', ' : ` ${t('and')} `) + value
    );

  return (
    <Typography>
      <AppTrans
        i18nKey="message_contents:txPrepayContent"
        components={[
          <Name address={message.sender} name={senderAddressMoniker} />,
          <Name address={message.beneficiary} name={beneficiaryAddressMoniker} />,
        ]}
        values={{
          amount: parsedAmount,
        }}
      />
    </Typography>
  );
};

export default Prepay;
