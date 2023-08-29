import { FC } from 'react';
import AppTrans from '@/components/AppTrans';
import Typography from '@mui/material/Typography';
import Name from '@/components/name';
import MsgFileUpload from '@/models/msg/sds/msg_file_upload';
import { useProfileRecoil } from '@/recoil/profiles/hooks';

const FileUpload: FC<{ message: MsgFileUpload }> = (props) => {
  const { message } = props;

  const fromAddress = useProfileRecoil(message.fromAddress);
  const fromAddressMoniker = fromAddress ? fromAddress?.name : message.fromAddress;

  const uploaderAddress = useProfileRecoil(message.uploader);
  const uploaderAddressMoniker = uploaderAddress ? uploaderAddress?.name : message.uploader;

  return (
    <Typography>
      <AppTrans
        i18nKey="message_contents:txFileUploadContent"
        components={[
          <Name address={message.fromAddress} name={fromAddressMoniker} />,
          <Name address={message.uploader} name={uploaderAddressMoniker} />,
        ]}
        values={{
          fileHash: message.fileHash,
        }}
      />
    </Typography>
  );
};

export default FileUpload;
