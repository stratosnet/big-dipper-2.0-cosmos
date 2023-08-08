import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgVolumeReport } from '@models';
import {
  useProfileRecoil,
} from '@recoil/profiles';

const VolumeReport = (props: {
  message: MsgVolumeReport;
}) => {
  const { message } = props;
  const reporterOwner = useProfileRecoil(message.reporterOwner);
  const reporterOwnerMoniker = reporterOwner ? reporterOwner?.name : message.reporterOwner;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txVolumeReportContent"
        components={[
          (
            <Name
              address={message.reporterOwner}
              name={reporterOwnerMoniker}
            />
          ),
        ]}
        values={{
          reportReference: message.reportReference,
        }}
      />
    </Typography>
  );
};

export default VolumeReport;
