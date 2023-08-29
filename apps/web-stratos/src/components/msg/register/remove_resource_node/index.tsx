import { FC } from 'react';
import AppTrans from '@/components/AppTrans';
import Typography from '@mui/material/Typography';
import Name from '@/components/name';
import MsgRemoveResourceNode from '@/models/msg/register/msg_remove_resource_node';
import { useProfileRecoil } from '@/recoil/profiles/hooks';

const RemoveResourceNode: FC<{ message: MsgRemoveResourceNode }> = (props) => {
  const { message } = props;

  const ownerAddress = useProfileRecoil(message.ownerAddress);
  const ownerAddressMoniker = ownerAddress ? ownerAddress?.name : message.ownerAddress;

  return (
    <Typography>
      <AppTrans
        i18nKey="message_contents:txRemoveResourceNodeContent"
        components={[<Name address={message.ownerAddress} name={ownerAddressMoniker} />]}
        values={{
          resourceNodeAddress: message.resourceNodeAddress,
        }}
      />
    </Typography>
  );
};

export default RemoveResourceNode;
