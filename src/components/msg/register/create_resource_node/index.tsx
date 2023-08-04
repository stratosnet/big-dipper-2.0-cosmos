import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgCreateResourceNode } from '@models';
import { useProfileRecoil } from '@recoil/profiles';

const CreateResourceNode = (props: {
  message: MsgCreateResourceNode;
}) => {
  const { message } = props;

  const ownerAddress = useProfileRecoil(message.ownerAddress);
  const ownerAddressMoniker = ownerAddress ? ownerAddress?.name : message.ownerAddress;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txCreateResourceNodeContent"
        components={[
          (
            <Name
              address={message.ownerAddress}
              name={ownerAddressMoniker}
            />
          ),
        ]}
        values={{
          networkAddress: message.networkAddress,
        }}
      />
    </Typography>
  );
};

export default CreateResourceNode;
