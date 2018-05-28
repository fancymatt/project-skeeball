import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatDividerModule,
  MatListModule,
  MatIconModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LessonListComponent } from './lessons/lesson-list/lesson-list.component';
import { AddLessonComponent } from './lessons/add-lesson/add-lesson.component';
import { EditLessonComponent } from './lessons/edit-lesson/edit-lesson.component';
import { LessonsComponent } from './lessons/lessons/lessons.component';
import {LessonService} from './lessons/lesson.service';
import { LinesComponent } from './lessons/lines/lines.component';
import { LineListComponent } from './lessons/lines/line-list/line-list.component';
import { AddLineComponent } from './lessons/lines/add-line/add-line.component';
import {LineService} from './lessons/lines/line.service';

const appRoutes: Routes = [
  {path: '', redirectTo: 'lessons', pathMatch: 'full'},
  {path: 'lessons', component: LessonsComponent, children: [
      {path: '', component: LessonListComponent, pathMatch: 'full'},
      {path: 'add', component: AddLessonComponent},
      {path: ':id', component: EditLessonComponent},
      {path: ':id/add-line', component: AddLineComponent}
    ]},
  ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LessonListComponent,
    AddLessonComponent,
    EditLessonComponent,
    LessonsComponent,
    LinesComponent,
    LineListComponent,
    AddLineComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [LessonService, LineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
