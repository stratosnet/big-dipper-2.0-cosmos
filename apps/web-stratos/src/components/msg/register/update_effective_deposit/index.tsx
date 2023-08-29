import { FC } from 'react';
import AppTrans from '@/components/AppTrans';
import Typography from '@mui/material/Typography';
import MsgUpdateEffectiveDeposit from '@/models/msg/register/msg_update_effective_deposit';

const UpdateEffectiveDeposit: FC<{ message: MsgUpdateEffectiveDeposit }> = (props) => {
  const { message } = props;

  return (
    <Typography>
      <AppTrans
        i18nKey="message_contents:txUpdateEffectiveDepositContent"
        values={{
          networkAddress: message.networkAddress,
          effectiveTokens: message.effectiveTokens,
        }}
      />
    </Typography>
  );
};

export default UpdateEffectiveDeposit;
