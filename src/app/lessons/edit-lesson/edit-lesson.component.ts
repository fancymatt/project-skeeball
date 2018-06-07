import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lesson } from '../lesson.model';
import { LessonService } from '../lesson.service';
import { DataService } from '../../shared/data.service';
import { AudioService } from '../../shared/audio.service';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styles: ['.button-row { margin: 10px; }']
})
export class EditLessonComponent implements OnInit {
  selectedLesson: Lesson;

  constructor(private activatedRoute: ActivatedRoute,
              private dataService: DataService,
              private audioService: AudioService,
              private lessonService: LessonService,
              private router: Router) { }

  ngOnInit() {
    this.loadLesson(this.activatedRoute.snapshot.params.id);
  }

  loadLesson(id: string) {
    this.dataService.getLesson(id)
      .subscribe(
        (data: Lesson) => {
          this.selectedLesson = this.lessonService.selectedLesson = data;
          this.audioService.initializeNarrationForLesson(this.selectedLesson);
        },
        (err: any) => console.error(err),
        () => console.log('Finished getting lesson.')
      );

  }

  onDelete() {
    this.dataService.deleteLesson(this.selectedLesson)
      .subscribe(
        (data) => {
          this.router.navigate(['../lessons']);
        },
        (err) => console.error(err),
        () => console.log('Finished deleting lesson')
      );
  }

  onSave() {
    this.dataService.updateLesson(this.selectedLesson)
      .subscribe(
        (data) => console.log(data),
        (err) => console.error(err),
        () => console.log('Finished saving lesson')
      );
  }

}
