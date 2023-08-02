import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { MsgUpdateEffectiveDeposit } from '@models';

const UpdateEffectiveDeposit = (props: {
  message: MsgUpdateEffectiveDeposit;
}) => {
  const { message } = props;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txUpdateEffectiveDepositContent"
        values={{
          networkAddress: message.networkAddress,
          effectiveTokens: message.effectiveTokens,
        }}
      />
    </Typography>
  );
};

export default UpdateEffectiveDeposit;
