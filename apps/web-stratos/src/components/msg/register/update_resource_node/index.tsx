import { FC } from 'react';
import AppTrans from '@/components/AppTrans';
import Typography from '@mui/material/Typography';
import Name from '@/components/name';
import MsgUpdateResourceNode from '@/models/msg/register/msg_update_resource_node';
import { useProfileRecoil } from '@/recoil/profiles/hooks';

const UpdateResourceNode: FC<{ message: MsgUpdateResourceNode }> = (props) => {
  const { message } = props;

  const ownerAddress = useProfileRecoil(message.ownerAddress);
  const ownerAddressMoniker = ownerAddress ? ownerAddress?.name : message.ownerAddress;

  return (
    <Typography>
      <AppTrans
        i18nKey="message_contents:txUpdateResourceNodeContent"
        components={[<Name address={message.ownerAddress} name={ownerAddressMoniker} />]}
        values={{
          networkAddress: message.networkAddress,
        }}
      />
    </Typography>
  );
};

export default UpdateResourceNode;
