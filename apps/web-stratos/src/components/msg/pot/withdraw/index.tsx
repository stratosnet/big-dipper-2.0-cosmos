import { FC } from 'react';
import AppTrans from '@/components/AppTrans';
import { formatToken, formatNumber } from '@/utils/format_token';
import useAppTranslation from '@/hooks/useAppTranslation';
import Typography from '@mui/material/Typography';
import Name from '@/components/name';
import MsgWithdraw from '@/models/msg/pot/msg_withdraw';
import { useProfileRecoil } from '@/recoil/profiles/hooks';

const Withdraw: FC<{ message: MsgWithdraw }> = (props) => {
  const { t } = useAppTranslation('transactions');
  const { message } = props;

  const parsedAmount = message?.amount
    ?.map((x) => {
      const amount = formatToken(x.amount, x.denom);
      return `${formatNumber(amount.value, amount.exponent)} ${amount.displayDenom.toUpperCase()}`;
    })
    .reduce(
      (text, value, i, array) => text + (i < array.length - 1 ? ', ' : ` ${t('and')} `) + value
    );

  const walletAddress = useProfileRecoil(message.walletAddress);
  const walletAddressMoniker = walletAddress ? walletAddress?.name : message.walletAddress;

  const targetAddress = useProfileRecoil(message.targetAddress);
  const targetAddressMoniker = targetAddress ? targetAddress?.name : message.targetAddress;

  return (
    <Typography>
      <AppTrans
        i18nKey="message_contents:txWithdrawContent"
        components={[
          <Name address={message.walletAddress} name={walletAddressMoniker} />,
          <Name address={message.targetAddress} name={targetAddressMoniker} />,
        ]}
        values={{
          amount: parsedAmount,
        }}
      />
    </Typography>
  );
};

export default Withdraw;
