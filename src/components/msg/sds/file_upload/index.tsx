import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgFileUpload } from '@models';
import { useProfileRecoil } from '@recoil/profiles';

const FileUpload = (props: {
  message: MsgFileUpload;
}) => {
  const { message } = props;

  const fromAddress = useProfileRecoil(message.fromAddress);
  const fromAddressMoniker = fromAddress ? fromAddress?.name : message.fromAddress;

  const uploaderAddress = useProfileRecoil(message.uploader);
  const uploaderAddressMoniker = uploaderAddress ? uploaderAddress?.name : message.uploader;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txFileUploadContent"
        components={[
          (
            <Name
              address={message.fromAddress}
              name={fromAddressMoniker}
            />
          ),
          (
            <Name
              address={message.uploader}
              name={uploaderAddressMoniker}
            />
          ),
        ]}
        values={{
            fileHash: message.fileHash,
        }}
      />
    </Typography>
  );
};

export default FileUpload;
