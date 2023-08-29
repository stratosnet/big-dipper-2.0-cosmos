import { FC } from 'react';
import AppTrans from '@/components/AppTrans';
import Typography from '@mui/material/Typography';
import Name from '@/components/name';
import MsgVolumeReport from '@/models/msg/pot/msg_volume_report';
import { useProfileRecoil } from '@/recoil/profiles/hooks';

const VolumeReport: FC<{ message: MsgVolumeReport }> = (props) => {
  const { message } = props;
  const reporterOwner = useProfileRecoil(message.reporterOwner);
  const reporterOwnerMoniker = reporterOwner ? reporterOwner?.name : message.reporterOwner;

  return (
    <Typography>
      <AppTrans
        i18nKey="message_contents:txVolumeReportContent"
        components={[<Name address={message.reporterOwner} name={reporterOwnerMoniker} />]}
        values={{
          reportReference: message.reportReference,
        }}
      />
    </Typography>
  );
};

export default VolumeReport;
