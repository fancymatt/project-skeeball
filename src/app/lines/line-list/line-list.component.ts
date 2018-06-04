import {Component, OnInit} from '@angular/core';
import {Line} from '../line.model';
import {ActivatedRoute} from '@angular/router';
import {LessonService} from '../../lessons/lesson.service';
import {Lesson} from '../../lessons/lesson.model';

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.css']
})
export class LineListComponent implements OnInit {
  selectedLesson: Lesson;

  constructor(private activatedRoute: ActivatedRoute, private lessonService: LessonService) { }

  ngOnInit() {
    this.selectedLesson = this.lessonService.selectedLesson;
  }

  moveLineUp(index: number): void {
    const lineToMove = this.selectedLesson.lines[index];
    const displacedLine = this.selectedLesson.lines[index - 1];
    const arrayBefore = this.selectedLesson.lines.slice(0, index - 1);
    const arrayAfter = this.selectedLesson.lines.slice(index + 1, this.selectedLesson.lines.length);
    let newArray;
    newArray = arrayBefore.concat(lineToMove);
    newArray = newArray.concat(displacedLine);
    newArray = newArray.concat(arrayAfter);

    this.selectedLesson.lines = newArray;
  }

  moveLineDown(index: number): void {
    const lineToMove = this.selectedLesson.lines[index];
    const displacedLine = this.selectedLesson.lines[index + 1];
    const arrayBefore = this.selectedLesson.lines.slice(0, index);
    const arrayAfter = this.selectedLesson.lines.slice(index + 2, this.selectedLesson.lines.length);

    let newArray;
    newArray = arrayBefore.concat(displacedLine);
    newArray = newArray.concat(lineToMove);
    newArray = newArray.concat(arrayAfter);

    this.selectedLesson.lines = newArray;
  }

  deleteLine(index:number): void {
    this.selectedLesson.lines.splice(index,1);
  }


}
