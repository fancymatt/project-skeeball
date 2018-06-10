import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {
  region = 'us-west-2';
  bucketName = 'project-skeeball-audio';
  identityPoolId = 'us-west-2:034ba2bf-7d4d-43de-abb4-d4db07137c58';

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

    s3.upload({Key: file.name, Bucket: this.bucketName, Body: file, ACL: 'public-read'}, function (err, data) {
      if (err) {
        console.log(err, 'there was an error uploading your file');
      }
      if (data) {
        console.log('Upload successful!');
        console.log(data);
      }
    });
  }

}
