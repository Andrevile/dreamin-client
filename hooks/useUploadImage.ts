import React, { SetStateAction, useEffect, useState } from 'react';
import AWS from 'aws-sdk';

export const useUploadImage = (): [
  string,
  React.Dispatch<SetStateAction<string>>,
  (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
] => {
  const [imgUrl, setImgUrl] = useState('');
  const poolID = process.env.NEXT_PUBLIC_TEST_COGNITO;
  const bucket = process.env.NEXT_PUBLIC_BUCKET_NAME;

  useEffect(() => {
    console.log('img', imgUrl);
  }, [imgUrl, setImgUrl]);

  const storeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = (e.target as HTMLInputElement).files[0];
    const currentFileName = currentFile.name.replaceAll(' ', '');

    AWS.config.update({
      region: 'ap-northeast-2',
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: poolID,
      }),
    });

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucket,
        Key: currentFileName,
        Body: currentFile,
      },
    });

    const promise = upload.promise();

    promise.then((data) => {
      console.log('dsafas', data);
      setImgUrl(data.Location);
    });
  };

  return [imgUrl, setImgUrl, storeImage];
};
