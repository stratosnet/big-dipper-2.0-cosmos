import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgUpdateResourceNodeDeposit } from '@models';
import { useProfileRecoil } from '@recoil/profiles';
import {
  formatToken, formatNumber,
} from '@utils/format_token';

const UpdateResourceNodeDeposit = (props: {
  message: MsgUpdateResourceNodeDeposit;
}) => {
  const { message } = props;

  const ownerAddress = useProfileRecoil(message.ownerAddress);
  const ownerAddressMoniker = ownerAddress ? ownerAddress?.name : message.ownerAddress;

  const depositDelta = formatToken(message.depositDelta.amount, message.depositDelta.denom);
  const parsedDepositDelta = `${formatNumber(depositDelta.value, depositDelta.exponent)} ${depositDelta.displayDenom.toUpperCase()}`;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txUpdateResourceNodeDepositContent"
        components={[
          (
            <Name
              address={message.ownerAddress}
              name={ownerAddressMoniker}
            />
          ),
        ]}
        values={{
          depositDelta: parsedDepositDelta,
          networkAddress: message.networkAddress,
        }}
      />
    </Typography>
  );
};

export default UpdateResourceNodeDeposit;
