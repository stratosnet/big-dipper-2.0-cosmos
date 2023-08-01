import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgRemoveResourceNode } from '@models';
import { useProfileRecoil } from '@recoil/profiles';

const RemoveResourceNode = (props: {
  message: MsgRemoveResourceNode;
}) => {
  const { message } = props;

  const ownerAddress = useProfileRecoil(message.ownerAddress);
  const ownerAddressMoniker = ownerAddress ? ownerAddress?.name : message.ownerAddress;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txRemoveResourceNodeContent"
        components={[
          (
            <Name
              address={message.ownerAddress}
              name={ownerAddressMoniker}
            />
          ),
        ]}
        values={{
            resourceNodeAddress: message.resourceNodeAddress,
        }}
      />
    </Typography>
  );
};

export default RemoveResourceNode;
