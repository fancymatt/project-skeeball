import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../../../services/lesson.service';
import { Lesson } from '../../../../models/lesson.model';

@Component({
  selector: 'app-admin-list-lines',
  templateUrl: './admin-list-lines.component.html',
  styleUrls: ['./admin-list-lines.component.css']
})
export class AdminListLinesComponent {
  get selectedLesson(): Lesson {
    return this.lessonService.selectedLesson;
  }

  get selectedLessonAssets(): any[] {
    return this.lessonService.selectedLessonAssets;
  }

  set selectedLessonAssets(assets: any[]) {
    this.lessonService.selectedLessonAssets = assets;
  }

  constructor(private activatedRoute: ActivatedRoute,
              private lessonService: LessonService) {
  }

  moveLine(index: number, direction: number): void {
    const lines = this.selectedLesson.lines;
    const assets = this.selectedLessonAssets;
    const up = direction === 1;
    const lineToMove = lines[index];
    const assetToMove = assets[index];
    const newIndex = up ? index - 1 : index + 1;
    const displacedLine = lines[newIndex];
    const displacedAsset = assets[newIndex];
    lines.splice(up ? newIndex : index, 2);
    assets.splice(up ? newIndex : index, 2);
    if (up) {
      lines.splice(newIndex, 0, lineToMove, displacedLine);
      assets.splice(newIndex, 0, assetToMove, displacedAsset);
    } else {
      lines.splice(index , 0, displacedLine, lineToMove);
      assets.splice(index, 0, displacedAsset, assetToMove);
    }
    this.selectedLesson.lines = lines;
    this.selectedLessonAssets = assets;
  }

  deleteLine(index: number): void {
    this.selectedLesson.lines.splice(index, 1);
    this.selectedLessonAssets.splice(index, 1);
  }

}
