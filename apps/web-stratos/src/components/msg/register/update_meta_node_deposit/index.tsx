import { FC } from 'react';
import AppTrans from '@/components/AppTrans';
import Typography from '@mui/material/Typography';
import Name from '@/components/name';
import MsgUpdateMetaNodeDeposit from '@/models/msg/register/msg_update_meta_node_deposit';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import { formatToken, formatNumber } from '@/utils/format_token';

const UpdateMetaNodeDeposit: FC<{ message: MsgUpdateMetaNodeDeposit }> = (props) => {
  const { message } = props;

  const ownerAddress = useProfileRecoil(message.ownerAddress);
  const ownerAddressMoniker = ownerAddress ? ownerAddress?.name : message.ownerAddress;

  const depositDelta = formatToken(message.depositDelta.amount, message.depositDelta.denom);
  const parsedDepositDelta = `${formatNumber(
    depositDelta.value,
    depositDelta.exponent
  )} ${depositDelta.displayDenom.toUpperCase()}`;

  return (
    <Typography>
      <AppTrans
        i18nKey="message_contents:txUpdateMetaNodeDepositContent"
        components={[<Name address={message.ownerAddress} name={ownerAddressMoniker} />]}
        values={{
          depositDelta: parsedDepositDelta,
          networkAddress: message.networkAddress,
        }}
      />
    </Typography>
  );
};

export default UpdateMetaNodeDeposit;
