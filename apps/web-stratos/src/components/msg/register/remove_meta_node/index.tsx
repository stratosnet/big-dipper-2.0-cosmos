import { FC } from 'react';
import AppTrans from '@/components/AppTrans';
import Typography from '@mui/material/Typography';
import Name from '@/components/name';
import MsgRemoveMetaNode from '@/models/msg/register/msg_remove_meta_node';
import { useProfileRecoil } from '@/recoil/profiles/hooks';

const RemoveMetaNode: FC<{ message: MsgRemoveMetaNode }> = (props) => {
  const { message } = props;

  const ownerAddress = useProfileRecoil(message.ownerAddress);
  const ownerAddressMoniker = ownerAddress ? ownerAddress?.name : message.ownerAddress;

  return (
    <Typography>
      <AppTrans
        i18nKey="message_contents:txRemoveMetaNodeContent"
        components={[<Name address={message.ownerAddress} name={ownerAddressMoniker} />]}
        values={{
          metaNodeAddress: message.metaNodeAddress,
        }}
      />
    </Typography>
  );
};

export default RemoveMetaNode;
