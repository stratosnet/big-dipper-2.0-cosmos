import { FC } from 'react';
import AppTrans from '@/components/AppTrans';
import Typography from '@mui/material/Typography';
import Name from '@/components/name';
import MsgMetaNodeRegistrationVote from '@/models/msg/register/msg_meta_node_registration_vote';
import { useProfileRecoil } from '@/recoil/profiles/hooks';

const MetaNodeRegistrationVote: FC<{ message: MsgMetaNodeRegistrationVote }> = (props) => {
  const { message } = props;

  const voterOwnerAddress = useProfileRecoil(message.voterOwnerAddress);
  const voterOwnerAddressMoniker = voterOwnerAddress
    ? voterOwnerAddress?.name
    : message.voterOwnerAddress;

  return (
    <Typography>
      <AppTrans
        i18nKey="message_contents:txMetaNodeRegistrationVoteContent"
        components={[<Name address={message.voterOwnerAddress} name={voterOwnerAddressMoniker} />]}
        values={{
          candidateNetworkAddress: message.candidateNetworkAddress,
        }}
      />
    </Typography>
  );
};

export default MetaNodeRegistrationVote;
