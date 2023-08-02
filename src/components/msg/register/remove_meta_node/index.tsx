import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgRemoveMetaNode } from '@models';
import { useProfileRecoil } from '@recoil/profiles';

const RemoveMetaNode = (props: {
  message: MsgRemoveMetaNode;
}) => {
  const { message } = props;

  const ownerAddress = useProfileRecoil(message.ownerAddress);
  const ownerAddressMoniker = ownerAddress ? ownerAddress?.name : message.ownerAddress;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txRemoveMetaNodeContent"
        components={[
          (
            <Name
              address={message.ownerAddress}
              name={ownerAddressMoniker}
            />
          ),
        ]}
        values={{
          metaNodeAddress: message.metaNodeAddress,
        }}
      />
    </Typography>
  );
};

export default RemoveMetaNode;
