import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {
  MatToolbarModule,
  MatButtonModule,
  MatDividerModule,
  MatListModule,
  MatIconModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressBarModule,
  MatCardModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { DataService } from './shared/data.service';
import { LessonListResolverService } from './shared/lesson-list-resolver.service';

import { HeaderComponent } from './header/header.component';
import { LessonListComponent } from './lessons/lesson-list/lesson-list.component';
import { AddLessonComponent } from './lessons/add-lesson/add-lesson.component';
import { EditLessonComponent } from './lessons/edit-lesson/edit-lesson.component';
import { LessonShellComponent } from './lessons/lesson-shell/lesson-shell.component';
import { LessonService } from './lessons/lesson.service';

import { LinesComponent } from './lines/lines.component';
import { LineListComponent } from './lines/line-list/line-list.component';
import { AddLineComponent } from './lines/add-line/add-line.component';
import { LineService } from './lines/line.service';
import { IdGenService } from './shared/id-gen.service';
import { HttpCacheService } from './shared/http-cache.service';
import { CacheInterceptor } from './shared/cache.interceptor';
import { ViewLessonComponent } from './lessons/view-lesson/view-lesson.component';
import { ViewExplanationComponent } from './lines/view-explanation/view-explanation.component';
import { ViewExampleComponent } from './lines/view-example/view-example.component';
import { ViewQuestionMcComponent } from './lines/view-question-mc/view-question-mc.component';
import { AudioService } from './shared/audio.service';

const appRoutes: Routes = [
  {path: '', redirectTo: 'lessons', pathMatch: 'full'},
  {path: 'lessons', component: LessonShellComponent, children: [
      {path: '', component: LessonListComponent, pathMatch: 'full', resolve: { resolvedLessons: LessonListResolverService }},
      {path: 'add', component: AddLessonComponent},
      {path: ':id', component: EditLessonComponent},
      {path: ':id/add-line', component: AddLineComponent},
      {path: ':id/preview', component: ViewLessonComponent}
    ]},
  ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LessonListComponent,
    AddLessonComponent,
    EditLessonComponent,
    LessonShellComponent,
    LinesComponent,
    LineListComponent,
    AddLineComponent,
    ViewLessonComponent,
    ViewExplanationComponent,
    ViewExampleComponent,
    ViewQuestionMcComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
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
    MatProgressBarModule,
    MatCardModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true},
    IdGenService,
    LessonService,
    LineService,
    AudioService,
    LessonListResolverService,
    HttpCacheService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private _audioService: AudioService) {
    _audioService.initializeAllSounds();
  }
}
