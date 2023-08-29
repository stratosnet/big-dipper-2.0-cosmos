import { FC } from 'react';
import { formatToken, formatNumber } from '@/utils/format_token';
import AppTrans from '@/components/AppTrans';
import useAppTranslation from '@/hooks/useAppTranslation';
import Typography from '@mui/material/Typography';
import Name from '@/components/name';
import MsgFoundationDeposit from '@/models/msg/pot/msg_foundation_deposit';
import { useProfileRecoil } from '@/recoil/profiles/hooks';

const FoundationDeposit: FC<{ message: MsgFoundationDeposit }> = (props) => {
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

  const from = useProfileRecoil(message.fromAddress);
  const fromMoniker = from ? from?.name : message.fromAddress;

  return (
    <Typography>
      <AppTrans
        i18nKey="message_contents:txFoundationDepositContent"
        components={[<Name address={message.fromAddress} name={fromMoniker} />]}
        values={{
          amount: parsedAmount,
        }}
      />
    </Typography>
  );
};

export default FoundationDeposit;
