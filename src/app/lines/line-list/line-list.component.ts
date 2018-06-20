import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../lessons/lesson.service';
import { Lesson } from '../../lessons/lesson.model';

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.css']
})
export class LineListComponent {
  get selectedLesson(): Lesson {
    return this.lessonService.selectedLesson;
  }

  constructor(private activatedRoute: ActivatedRoute,
              private lessonService: LessonService) {
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

  deleteLine(index: number): void {
    this.selectedLesson.lines.splice(index, 1);
  }

}
