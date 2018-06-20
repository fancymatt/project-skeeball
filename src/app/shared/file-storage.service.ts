import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {
  private region = 'us-west-2';
  private bucketName = 'project-skeeball-audio';
  private identityPoolId = 'us-west-2:034ba2bf-7d4d-43de-abb4-d4db07137c58';

  constructor() { }

  upload(file) {
    const AWSService = AWS;

    AWSService.config.update({
      region: this.region,
      credentials: new AWSService.CognitoIdentityCredentials({
        IdentityPoolId: this.identityPoolId
      })
    });

    const s3 = new AWSService.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: this.bucketName }
    });

    const uploadParams = {
      Key: file.name,
      Bucket: this.bucketName,
      Body: file,
      ACL: 'public-read'
    };

    s3.upload(uploadParams, (err, data) => {
      if (err) { console.error(err); }
      if (data) { console.log(data); }
    });
  }

}
