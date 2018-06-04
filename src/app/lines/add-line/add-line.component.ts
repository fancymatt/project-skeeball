import {Component, OnInit} from '@angular/core';
import {LineService} from '../line.service';
import { NgForm } from '@angular/forms';
import {LessonService} from '../../lessons/lesson.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Line} from '../line.model';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-add-line',
  templateUrl: './add-line.component.html',
  styles: []
})
export class AddLineComponent implements OnInit {
  possibleLineTypes: string[];
  selectedLineType: string;

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


}
