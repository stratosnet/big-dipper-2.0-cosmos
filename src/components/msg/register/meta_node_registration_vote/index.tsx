import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgMetaNodeRegistrationVote } from '@models';
import { useProfileRecoil } from '@recoil/profiles';

const MetaNodeRegistrationVote = (props: {
  message: MsgMetaNodeRegistrationVote;
}) => {
  const { message } = props;

  const voterOwnerAddress = useProfileRecoil(message.voterOwnerAddress);
  const voterOwnerAddressMoniker = voterOwnerAddress ? voterOwnerAddress?.name : message.voterOwnerAddress;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txMetaNodeRegistrationVoteContent"
        components={[
          (
            <Name
              address={message.voterOwnerAddress}
              name={voterOwnerAddressMoniker}
            />
          ),
        ]}
        values={{
            candidateNetworkAddress: message.candidateNetworkAddress,
        }}
      />
    </Typography>
  );
};

export default MetaNodeRegistrationVote;
