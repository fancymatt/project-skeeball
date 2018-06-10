import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Vocab} from '../vocab.model';
import {DataService} from '../../shared/data.service';
import {Router} from '@angular/router';
import * as AWS from 'aws-sdk';
import {AudioService} from '../../shared/audio.service';

@Component({
  selector: 'app-view-vocab',
  templateUrl: './view-vocab.component.html',
  styleUrls: ['./view-vocab.component.css']
})
export class ViewVocabComponent {
  @Input() selectedVocab: Vocab;
  audioFilePathMp3: string;

  constructor(private dataService: DataService,
              private router: Router,
              private audioService: AudioService) { }

  ngOnInit() { }

  onUpdate() {
    this.selectedVocab.audioFilePathMp3 = this.audioFilePathMp3;
    this.dataService.updateVocab(this.selectedVocab)
      .subscribe(
        () => this.router.navigate(['..']),
        (err) => console.log(err),
        () => 'Finished updating vocab'
      );
  }

  onDelete() {
    this.dataService.deleteVocab(this.selectedVocab)
      .subscribe(
        () => {
          this.router.navigate(['..']);
        },
        (err) => console.log(err),
        () => console.log('Completed deleting vocab')
      );
  }

  onPlayAudio() {
    this.audioService.playVocabularyAudio(this.selectedVocab);
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
