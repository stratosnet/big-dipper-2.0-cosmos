import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgSlashingResourceNode } from '@models';
import {
  useProfileRecoil,
} from '@recoil/profiles';

const SlashingResourceNode = (props: {
  message: MsgSlashingResourceNode;
}) => {
  const { message } = props;

  const walletAddress = useProfileRecoil(message.walletAddress);
  const walletAddressMoniker = walletAddress ? walletAddress?.name : message.walletAddress;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txSlashingResourceNodeContent"
        components={[
          (
            <Name
              address={message.walletAddress}
              name={walletAddressMoniker}
            />
          ),
        ]}
        values={{
          networkAddress: message.networkAddress,
          amount: message.slashing,
        }}
      />
    </Typography>
  );
};

export default SlashingResourceNode;
