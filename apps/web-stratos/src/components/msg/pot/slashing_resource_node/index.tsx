import { FC } from 'react';
import AppTrans from '@/components/AppTrans';
import Typography from '@mui/material/Typography';
import Name from '@/components/name';
import MsgSlashingResourceNode from '@/models/msg/pot/msg_slashing_resource_node';
import { useProfileRecoil } from '@/recoil/profiles/hooks';

const SlashingResourceNode: FC<{ message: MsgSlashingResourceNode }> = (props) => {
  const { message } = props;

  const walletAddress = useProfileRecoil(message.walletAddress);
  const walletAddressMoniker = walletAddress ? walletAddress?.name : message.walletAddress;

  return (
    <Typography>
      <AppTrans
        i18nKey="message_contents:txSlashingResourceNodeContent"
        components={[<Name address={message.walletAddress} name={walletAddressMoniker} />]}
        values={{
          networkAddress: message.networkAddress,
          amount: message.slashing,
        }}
      />
    </Typography>
  );
};

export default SlashingResourceNode;
