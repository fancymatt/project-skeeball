import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vocab } from '../vocab.model';
import { IdGenService } from '../../shared/id-gen.service';
import { Router } from '@angular/router';
import {DataService} from '../../shared/data.service';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-add-vocab',
  templateUrl: './add-vocab.component.html',
  styleUrls: ['./add-vocab.component.css']
})
export class AddVocabComponent implements OnInit {
  audioFilePathMp3: string;

  constructor(private uuidService: IdGenService,
              private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const newVocab = new Vocab(
      form.form.value.target,
      form.form.value.targetKana,
      form.form.value.targetRomanization,
      form.form.value.english);
    newVocab.id = this.uuidService.generateUniqueId();
    newVocab.audioFilePathMp3 = this.audioFilePathMp3;
    this.dataService.createVocab(newVocab)
      .subscribe(
        () => {
          this.router.navigate(['/vocabulary']);
        },
        (err: any) => console.error(err),
        () => console.log('Completed creating vocabulary item.')
      );
  }

  fileEvent(fileInput: any) {
    const AWSService = AWS;
    const region = 'us-west-2';
    const bucketName = 'project-skeeball-audio';
    const identityPoolId = 'us-west-2:034ba2bf-7d4d-43de-abb4-d4db07137c58';
    const file = fileInput.target.files[0];

    AWSService.config.update({
      region: region,
      credentials: new AWSService.CognitoIdentityCredentials({
        IdentityPoolId: identityPoolId
      })
    });

    const s3 = new AWSService.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: bucketName }
    });

    this.audioFilePathMp3 = file.name;

    s3.upload({Key: file.name, Bucket: bucketName, Body: file, ACL: 'public-read'}, function (err, data) {
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
