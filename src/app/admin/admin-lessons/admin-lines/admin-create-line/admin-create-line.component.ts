import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { LineService } from '../../../../services/line.service';
import { LessonService } from '../../../../services/lesson.service';
import { Line } from '../../../../models/line.model';
import { Vocab } from '../../../../models/vocab.model';
import { VocabService } from '../../../../services/vocab.service';
import { FileStorageService } from '../../../../services/file-storage.service';

@Component({
  selector: 'app-admin-create-line',
  templateUrl: './admin-create-line.component.html',
  styleUrls: ['./admin-create-line.component.css']
})
export class AdminCreateLineComponent implements OnInit {
  possibleLineTypes: string[];
  selectedLineType: string;
  audioFilePath: string;
  vocabList: Vocab[];
  selectedVocabReference: Vocab;
  freeVocabReference: Vocab;

  constructor(private lineService: LineService,
              private vocabService: VocabService,
              private lessonService: LessonService,
              private fileUploadService: FileStorageService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.possibleLineTypes = this.lineService.lineTypes;
    this.vocabService.getAll()
      .subscribe(
        (data) => this.vocabList = data,
        (err) => console.error(err)
      );
  }

  onSubmit(form: NgForm) {
    const newLine = new Line(form.form.value.type);
    newLine.explanationAudioScript = form.form.value.scriptAudio;
    newLine.explanationVideoScript = form.form.value.scriptVideo;
    newLine.explanationAudioMp3 = this.audioFilePath;
    newLine.exampleVocabReference = form.form.value.selectedVocabReference;
    newLine.mcQuestion = form.form.value.mcQuestion;
    newLine.mcAnswerCorrect = form.form.value.mcAnswerCorrect;
    newLine.mcAnswerIncorrect1 = form.form.value.mcAnswerIncorrect1;
    newLine.mcAnswerIncorrect2 = form.form.value.mcAnswerIncorrect2;
    newLine.mcAnswerIncorrect3 = form.form.value.mcAnswerIncorrect3;
    newLine.freePrompt = form.form.value.freePrompt;
    newLine.freeVocabReference = form.form.value.freeVocabReference;

    this.lessonService.selectedLesson.lines.push(newLine);
    this.lessonService.update(this.lessonService.selectedLesson)
      .subscribe(
        () => this.router.navigate(['/lessons', this.lessonService.selectedLesson.id]),
        (err) => console.error(err)
      );
  }

  onFileUpload(fileInput: any) {
    this.audioFilePath = fileInput.target.files[0].name;
    this.fileUploadService.upload(fileInput);
  }

}
