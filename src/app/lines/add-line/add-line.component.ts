import {Component, OnInit} from '@angular/core';
import {LineService} from '../line.service';
import { NgForm } from '@angular/forms';
import {LessonService} from '../../lessons/lesson.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Line} from '../line.model';
import { DataService } from '../../shared/data.service';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-add-line',
  templateUrl: './add-line.component.html',
  styleUrls: ['./add-line.component.css']
})
export class AddLineComponent implements OnInit {
  possibleLineTypes: string[];
  selectedLineType: string;
  audioFilePath: string;

  constructor(private lineService: LineService,
              private lessonService: LessonService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private dataService: DataService) { }

  ngOnInit() {
    this.possibleLineTypes = this.lineService.getAllLineTypes();
  }

  onSubmit(form: NgForm) {
    const newLine = new Line(form.form.value.type);
    newLine.explanationAudioScript = form.form.value.scriptAudio;
    newLine.explanationVideoScript = form.form.value.scriptVideo;
    newLine.explanationAudioMp3 = this.audioFilePath;
    newLine.exampleTarget = form.form.value.exampleTarget;
    newLine.exampleKana = form.form.value.exampleKana;
    newLine.exampleRomanization = form.form.value.exampleRomanization;
    newLine.exampleEnglish = form.form.value.exampleEnglish;
    newLine.mcQuestion = form.form.value.mcQuestion;
    newLine.mcAnswerCorrect = form.form.value.mcAnswerCorrect;
    newLine.mcAnswerIncorrect1 = form.form.value.mcAnswerIncorrect1;
    newLine.mcAnswerIncorrect2 = form.form.value.mcAnswerIncorrect2;
    newLine.mcAnswerIncorrect3 = form.form.value.mcAnswerIncorrect3;

    this.lessonService.selectedLesson.lines.push(newLine);
    this.dataService.updateLesson(this.lessonService.selectedLesson)
      .subscribe(
        (data) => {
          this.router.navigate(['/lessons', this.lessonService.selectedLesson.id]);
        },
        (err) => console.error(err),
        () => console.log('completed')
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

    this.audioFilePath = file.name;

    console.log(AWSService);
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
